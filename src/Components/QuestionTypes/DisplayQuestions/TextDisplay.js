import React from "react";
import { Form } from "react-bootstrap";

function TextDisplay(props) {
  const { textLength = 20, readOnly } = props;

  const textAnswer = (
    <Form.Group controlId={`textanswer`}>
      <Form.Control
        as="textarea"
        maxLength={textLength > -1 ? textLength : ""}
        placeholder="Please answer here"
        wrap="hard"
        cols="20"
        className={"mt-2"}
        readOnly={readOnly}
      />
      {textLength > -1 && (
        <Form.Label className="text-info">
          <small>Maximum characters for answer: {Number(textLength)}</small>
        </Form.Label>
      )}
    </Form.Group>
  );

  return <>{textAnswer} </>;
}

export default TextDisplay;
