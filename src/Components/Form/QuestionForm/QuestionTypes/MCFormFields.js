import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../../shared/fontawesome";

import * as exprt from "../../../../shared/export";

const MCFormFields = ({ props, innerref }) => {
  // ============================ init =======================

  const { editQuestion = exprt.db.initDb.QUESTION_INIT } = props;

  if (!innerref.current) {
    if (
      editQuestion[`${exprt.props.QUESTION_ID}`] > -1 &&
      editQuestion[`${exprt.props.QUESTION_INDEX}`] > -1
    ) {
      innerref.current = {
        ...editQuestion,
        [`${exprt.props.SHOW_ADVANCE_OPTIONS}`]:
          editQuestion[`${exprt.props.MC_MIN_SEL}`] > 1 ||
          editQuestion[`${exprt.props.MC_MAX_SEL}`] > 1
            ? true
            : false,
      };
    } else {
      innerref.current = { ...exprt.db.initDb.MC_PROPS_INIT };
    }
  }

  let defaultAnswers = [];
  try {
    defaultAnswers = innerref.current[`${exprt.props.MC_ANSWERS}`].reduce(
      (answers, ansRef) => [...answers, ansRef.current.value],
      []
    );
  } catch (error) {
    try {
      // updating question
      defaultAnswers = editQuestion[`${exprt.props.MC_ANSWERS}`].reduce(
        (answers, answer) => [...answers, answer],
        []
      );
    } catch (error) {}
  }

  const [request, setRequest] = useState({
    addEmptyAnswer: false,

    [`${exprt.props.MC_ANSWERS}`]: defaultAnswers,

    [`${exprt.props.SHOW_ADVANCE_OPTIONS}`]: innerref.current[
      `${exprt.props.SHOW_ADVANCE_OPTIONS}`
    ],
    [`${exprt.props.MC_MIN_SEL}`]: innerref.current[
      `${exprt.props.MC_MIN_SEL}`
    ],
    [`${exprt.props.MC_MAX_SEL}`]: innerref.current[
      `${exprt.props.MC_MAX_SEL}`
    ],
  });

  // ref
  const refs = {
    addAnswerCtrlRef: React.createRef(),
    answerRefs: request[`${exprt.props.MC_ANSWERS}`].map((ans) =>
      React.createRef(ans)
    ),
  };

  // ============================ fucntions =======================

  const removeAnswer = (ansIndex) => {
    try {
      if (refs.answerRefs.length > 0) {
        // update answers
        const answers = refs.answerRefs.reduce(
          (answers, answerRef, index) =>
            index === ansIndex
              ? answers
              : [...answers, answerRef.current.value],
          []
        );

        // update min & max
        const [minSelections, maxSelections] = minMaxSelectionsHandler(
          answers.length,
          request[`${exprt.props.MC_MIN_SEL}`],
          request[`${exprt.props.MC_MAX_SEL}`],
          request[`${exprt.props.SHOW_ADVANCE_OPTIONS}`]
        );

        // update request
        setRequest({
          ...request,
          [`${exprt.props.MC_ANSWERS}`]: answers,
          [`${exprt.props.MC_MIN_SEL}`]: minSelections,
          [`${exprt.props.MC_MAX_SEL}`]: maxSelections,
        });
      }
    } catch (error) {}
  };

  const addAnswer = () => {
    try {
      if (refs.addAnswerCtrlRef.current) {
        // get new answer
        const newAnswer = refs.addAnswerCtrlRef.current.value;

        // reset default value addAnswerCtrl
        refs.addAnswerCtrlRef.current.value = "";

        // update min & max
        const [minSelections, maxSelections] = minMaxSelectionsHandler(
          refs.answerRefs.length + 1,
          request[`${exprt.props.MC_MIN_SEL}`],
          request[`${exprt.props.MC_MAX_SEL}`],
          request[`${exprt.props.SHOW_ADVANCE_OPTIONS}`]
        );

        // update request
        setRequest({
          ...request,
          [`${exprt.props.MC_ANSWERS}`]: [
            ...request[`${exprt.props.MC_ANSWERS}`],
            newAnswer,
          ],
          [`${exprt.props.MC_MIN_SEL}`]: minSelections,
          [`${exprt.props.MC_MAX_SEL}`]: maxSelections,
        });
      }
    } catch (error) {}
  };

  const minMaxSelectionsHandler = (
    answersCount = [],
    min = 0,
    max = 0,
    show = false
  ) => {
    let minSelections = min;
    let maxSelections = max;

    // no advance option is allowed pr no answers so far
    if (answersCount < 1 || answersCount === 0) {
      return [0, 0];
    }

    if (!show) {
      if (answersCount > 0) return [1, 1];
      return [0, 0];
    }

    if (show && answersCount > 0) {
      // min handling
      if (min === 0) minSelections = 1;
      if (min > answersCount) minSelections = maxSelections = 1;

      // max handling
      if (max === 0) maxSelections = 1;
      if (max < min) maxSelections = minSelections;

      if (min > max && min === answersCount) maxSelections = minSelections;
      if (max > answersCount) maxSelections = minSelections;
    }

    return [minSelections, maxSelections];
  };

  const updateInnerRef = () => {
    try {
      if (innerref) {
        const showAdvancedOptions =
          request[`${exprt.props.SHOW_ADVANCE_OPTIONS}`];

        // update min & max
        const [minSelections, maxSelections] = minMaxSelectionsHandler(
          refs.answerRefs.length,
          request[`${exprt.props.MC_MIN_SEL}`],
          request[`${exprt.props.MC_MAX_SEL}`],
          showAdvancedOptions
        );

        // final object sent to parent component via ref
        innerref.current = {
          // to get current value of answer from parent side, it has to be ref, can't be an array
          [`${exprt.props.MC_ANSWERS}`]: refs.answerRefs,

          // the below is just values
          // [`${exprt.props.SHOW_ADVANCE_OPTIONS}`]: showAdvancedOptions,
          [`${exprt.props.MC_MIN_SEL}`]: minSelections,
          [`${exprt.props.MC_MAX_SEL}`]: maxSelections,
        };
      }
    } catch (error) {}
  };

  // ============================ hooks =======================

  useEffect(() => {
    updateInnerRef();
  });

  // ============================ sub-components =======================

  const Options = ({ type = "", index = -1 }) => {
    if (type === "Add" || type === "Remove") {
      const removeOption = {
        name: "Remove Answer",
        icons: ["fas", "minus-circle"],
        color: "text-danger",
        handleClick: (index) => removeAnswer(index),
      };

      const addOption = {
        name: "Add Answer",
        icons: ["fas", "plus-circle"],
        color: "text-success",
        handleClick: () => addAnswer(),
      };

      const allowedOption = type === "Add" ? addOption : removeOption;

      return (
        <OverlayTrigger
          key={index}
          overlay={<Tooltip id={index}>{allowedOption.name}</Tooltip>}
        >
          <Button
            variant="link"
            onClick={() => allowedOption.handleClick(index)}
            className={`${allowedOption.color} ml-2 mr-2`}
          >
            <FontAwesomeIcon icon={allowedOption.icons} size="lg" />
          </Button>
        </OverlayTrigger>
      );
    }
    return <> </>;
  };

  const addAnswerCtrl = (
    <Form.Group as={Row} className="my-0 py-0">
      <Col xs="12">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              {/* <FontAwesomeIcon icon={["fas", "map-pin"]} /> */}
              New Answer
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            ref={refs.addAnswerCtrlRef}
            placeholder="Enter new answer"
            className="border-warning"
          />
          <Options type="Add" />
        </InputGroup>
      </Col>
    </Form.Group>
  );

  const answersListCtrl = request[`${exprt.props.MC_ANSWERS}`].map(
    (ans, index) => (
      <Form.Group as={Row} className="my-0 py-0" key={index}>
        <Col xs="12">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <strong className="text-primary"> {index + 1}</strong>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              ref={refs.answerRefs[index]}
              defaultValue={ans}
              key={index + ans}
              required
            />
            <Options type={"Remove"} index={index} />
            <Form.Control.Feedback type="invalid">
              Please enter an answer.
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Form.Group>
    )
  );

  const minSelectOption = (
    <Col sm={6}>
      <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <strong>Minimum Selection</strong>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as="select"
          value={request[`${exprt.props.MC_MIN_SEL}`]}
          onChange={(event) =>
            setRequest({
              ...request,
              [`${exprt.props.MC_MIN_SEL}`]: event.target.value,
            })
          }
        >
          {request[`${exprt.props.MC_ANSWERS}`].length > 0 ? (
            request[`${exprt.props.MC_ANSWERS}`].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))
          ) : (
            <option key={0} value={0}>
              0
            </option>
          )}
        </Form.Control>
      </InputGroup>
    </Col>
  );

  const maxSelectOption = (
    <Col sm={6}>
      <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <strong>Maximum Selection</strong>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as="select"
          value={request[`${exprt.props.MC_MAX_SEL}`]}
          onChange={(event) =>
            setRequest({
              ...request,
              [`${exprt.props.MC_MAX_SEL}`]: event.target.value,
            })
          }
        >
          {request[`${exprt.props.MC_ANSWERS}`].length > 0 ? (
            request[`${exprt.props.MC_ANSWERS}`].map(
              (_, i) =>
                i + 1 >= request[`${exprt.props.MC_MIN_SEL}`] && (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                )
            )
          ) : (
            <option key={0}>0</option>
          )}
        </Form.Control>
      </InputGroup>
    </Col>
  );

  const advancedOptions = (
    <Form.Check
      custom
      type="checkbox"
      id={`custom-checkbox`}
      label={<strong>Advanced Options</strong>}
      onChange={() =>
        setRequest({
          ...request,
          [`${exprt.props.SHOW_ADVANCE_OPTIONS}`]: !request[
            `${exprt.props.SHOW_ADVANCE_OPTIONS}`
          ],
        })
      }
      checked={request[`${exprt.props.SHOW_ADVANCE_OPTIONS}`]}
    />
  );

  const returnRender = (
    <div className="my-3">
      {addAnswerCtrl}
      {answersListCtrl}
      {advancedOptions}

      {request[`${exprt.props.SHOW_ADVANCE_OPTIONS}`] && (
        <Form.Group as={Row} className="my-2">
          {minSelectOption}
          {maxSelectOption}
        </Form.Group>
      )}
    </div>
  );

  return returnRender;
};

export default React.forwardRef((props, ref) => (
  <MCFormFields props={props} innerref={ref} />
));
