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

const RKFormFields = ({ props, innerref }) => {
  // ============================ init =======================

  const { editQuestion = exprt.db.initDb.QUESTION_INIT } = props;

  if (!innerref.current) {
    if (
      editQuestion[`${exprt.props.QUESTION_ID}`] > -1 &&
      editQuestion[`${exprt.props.QUESTION_INDEX}`] > -1
    ) {
      innerref.current = {
        ...editQuestion,
      };
    } else {
      innerref.current = { ...exprt.db.initDb.RK_PROPS_INIT };
    }
  }

  let defaultAnswers = [];
  try {
    defaultAnswers = innerref.current[`${exprt.props.RK_ANSWERS}`].reduce(
      (answers, ansRef) => [...answers, ansRef.current.value],
      []
    );
  } catch (error) {
    try {
      // updating question
      defaultAnswers = editQuestion[`${exprt.props.RK_ANSWERS}`].reduce(
        (answers, answer) => [...answers, answer],
        []
      );
    } catch (error) {}
  }

  const [request, setRequest] = useState({
    addEmptyAnswer: false,

    [`${exprt.props.RK_ANSWERS}`]: defaultAnswers,
  });

  // ref
  const refs = {
    addAnswerCtrlRef: React.createRef(),
    answerRefs: request[`${exprt.props.RK_ANSWERS}`].map((ans) =>
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

        // update request
        setRequest({
          ...request,
          [`${exprt.props.RK_ANSWERS}`]: answers,
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

        // update request
        setRequest({
          ...request,
          [`${exprt.props.RK_ANSWERS}`]: [
            ...request[`${exprt.props.RK_ANSWERS}`],
            newAnswer,
          ],
        });
      }
    } catch (error) {}
  };

  const updateInnerRef = () => {
    try {
      if (innerref) {
        // final object sent to parent component via ref
        innerref.current = {
          // to get current value of answer from parent side, it has to be ref, can't be an array
          [`${exprt.props.RK_ANSWERS}`]: refs.answerRefs,
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

  const answersListCtrl = request[`${exprt.props.RK_ANSWERS}`].map(
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

  const returnRender = (
    <div className="my-3">
      {addAnswerCtrl}
      {answersListCtrl}
    </div>
  );

  return returnRender;
};

export default React.forwardRef((props, ref) => (
  <RKFormFields props={props} innerref={ref} />
));
