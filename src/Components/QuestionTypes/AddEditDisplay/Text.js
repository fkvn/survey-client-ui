import React from "react";
import { Form } from "react-bootstrap";
import TextDisplay from "../DisplayQuestions/TextDisplay";

function Text(props) {
  const { questionFields, updateQuestion, showAdvancedOption } = props;

  const { textLength = -1 } = questionFields;

  const advanedOptionsCheck = (
    <Form.Check
      custom
      type="checkbox"
      id={`custom-checkbox-text-question`}
      label={<strong>Advanced Options</strong>}
      checked={showAdvancedOption}
      className="py-3"
      onChange={() =>
        updateQuestion({
          type: "updateAdvancedOption",
        })
      }
    />
  );

  const textDisplay = <TextDisplay textLength={textLength} readOnly={true} />;

  const textLengthOption = (
    <Form.Group controlId="SurveyName.ControlText">
      <Form.Label className="text-info">
        <strong>Text Length</strong>
      </Form.Label>
      <Form.Control
        type="number"
        max={255}
        value={textLength > -1 ? Number(textLength) : 20}
        onChange={(event) => {
          updateQuestion({
            type: "textLength",
            newTextLength: event.target.value >= 0 ? event.target.value : 0,
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
      {showAdvancedOption && textLengthOption}
      {textDisplay}
      {advanedOptionsCheck}
    </>
  );
}

export default Text;
