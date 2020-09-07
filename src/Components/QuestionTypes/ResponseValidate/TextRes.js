import React from "react";
import { Form } from "react-bootstrap";

function TextRes(props) {
  // console.log(" ============== TextRes render  ============== ");
  const {
    sectionIndex,
    question,
    currentTextAnswer,
    currentSecIndex,
    currentQIndex,
    updatedResponse,
  } = props;

  // console.log(sectionIndex);
  // console.log(question);
  // console.log(currentSecIndex);
  // console.log(currentQIndex);

  // console.log("==============  initilized  ============== ");

  const handlerOnChange = (newTextAnswer) => {
    const answer = {
      answerType: "TEXT",
      text: newTextAnswer,
    };
    updatedResponse(sectionIndex, question.questionIndex, answer);
  };

  const textRes = (
    <Form.Group
      controlId={`textanswer${sectionIndex}-${question.questionIndex}`}
    >
      <Form.Control
        as="textarea"
        maxLength={question.textLength > 0 ? question.textLength : ""}
        placeholder="Your answer"
        wrap="hard"
        cols="20"
        value={currentTextAnswer}
        onChange={(event) => handlerOnChange(event.target.value)}
        onFocus={(e) =>
          (e.target.selectionStart = e.target.selectionEnd = currentTextAnswer
            ? currentTextAnswer.length
            : 0)
        }
        autoFocus={
          currentSecIndex === sectionIndex &&
          currentQIndex === question.questionIndex
            ? true
            : false
        }
      />
      {question.textLength > 0 && (
        <Form.Label className="text-danger">
          <small>Maximum characters for answer: {question.textLength}</small>
        </Form.Label>
      )}
    </Form.Group>
  );

  return <>{textRes} </>;
}

export default TextRes;
