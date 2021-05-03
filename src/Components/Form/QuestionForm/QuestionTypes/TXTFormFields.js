import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import * as exprt from "../../../../shared/export";
import TextDisplay from "../../../QuestionTypes/DisplayQuestions/TextDisplay";

const TXTFormFields = ({ props, innerref }) => {
  const { editQuestion = exprt.db.initDb.QUESTION_INIT } = props;

  if (!innerref.current) {
    if (
      editQuestion[`${exprt.props.QUESTION_ID}`] > -1 &&
      editQuestion[`${exprt.props.QUESTION_INDEX}`] > -1
    ) {
      innerref.current = {
        ...editQuestion,
        [`${exprt.props.SHOW_ADVANCE_OPTIONS}`]:
          Number(editQuestion[`${exprt.props.TXT_LENGTH}`]) > -1,
      };
    } else {
      innerref.current = { ...exprt.db.initDb.TXT_PROPS_INIT };
    }
  }

  const [request, setRequest] = useState({
    [`${exprt.props.TXT_LENGTH}`]: innerref.current[
      `${exprt.props.TXT_LENGTH}`
    ],

    [`${exprt.props.SHOW_ADVANCE_OPTIONS}`]: innerref.current[
      `${exprt.props.SHOW_ADVANCE_OPTIONS}`
    ],
  });

  const updateInnerRef = () => {
    try {
      if (innerref) {
        // final object sent to parent component via ref

        const showAdvancedOption =
          request[`${exprt.props.SHOW_ADVANCE_OPTIONS}`];

        let textLength = request[`${exprt.props.TXT_LENGTH}`];
        if (!showAdvancedOption) {
          textLength = -1;
        }

        innerref.current = {
          // to get current value of answer from parent side, it has to be ref, can't be an array
          [`${exprt.props.TXT_LENGTH}`]: textLength,
          [`${exprt.props.SHOW_ADVANCE_OPTIONS}`]: showAdvancedOption,
        };
      }
    } catch (error) {}
  };

  // ============================ hooks =======================

  useEffect(() => {
    updateInnerRef();
  });

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
          [`${exprt.props.TXT_LENGTH}`]:
            request[`${exprt.props.TXT_LENGTH}`] > -1
              ? request[`${exprt.props.TXT_LENGTH}`]
              : 20,
        })
      }
      defaultChecked={request[`${exprt.props.SHOW_ADVANCE_OPTIONS}`]}
    />
  );

  const textDisplay = (
    <TextDisplay
      textLength={request[`${exprt.props.TXT_LENGTH}`]}
      readOnly={true}
    />
  );

  const textLengthOption = (
    <Form.Group controlId="textLength.ControlText">
      <Form.Label className="text-info">
        <strong>Text Length</strong>
      </Form.Label>
      <Form.Control
        type="number"
        max={255}
        value={
          request[`${exprt.props.TXT_LENGTH}`] > -1
            ? request[`${exprt.props.TXT_LENGTH}`]
            : 20
        }
        onChange={(event) => {
          setRequest({
            ...request,
            [`${exprt.props.TXT_LENGTH}`]:
              event.target.value >= 0 ? event.target.value : 0,
          });
        }}
      />
      <Form.Control.Feedback type="invalid">
        Text length is limited to 255 only!
      </Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <>
      {request[`${exprt.props.SHOW_ADVANCE_OPTIONS}`] && textLengthOption}
      {textDisplay}
      {advancedOptions}
    </>
  );
};

export default React.forwardRef((props, ref) => (
  <TXTFormFields props={props} innerref={ref} />
));
