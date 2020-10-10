import React from "react";
import { Form } from "react-bootstrap";

import * as funcs from "../../../shared/utility";

function InvMultipleChoiceDisplay(props) {
  const { question = {}, answer = {} } = props;

  const isValidAnswer =
    !funcs.isEmpty(question) &&
    !funcs.isEmpty(answer) &&
    question.questionType === answer.answerType &&
    answer.answerType === "MULTIPLE_CHOICE";

  const MainDisplay = ({ question = {}, answer = {} }) => {
    const type =
      Number(question.minSelections) === 1 &&
      Number(question.maxSelections) === 1
        ? "radio"
        : "checkbox";

    return (
      <>
        {question.choices.map((choice, index) => (
          <Form.Group key={index}>
            <Form.Check
              key={index}
              type={type}
              id={`default-${type}-${question.id}-${index}`}
              name={`multiple choice ${question.id}`}
              label={choice}
              className="text-primary"
              onClick={(event) => event.preventDefault()}
              defaultChecked={
                type === "radio"
                  ? answer.selections[0] === index
                    ? true
                    : false
                  : answer.selections.indexOf(index) > -1
                  ? true
                  : false
              }
            />
          </Form.Group>
        ))}
      </>
    );
  };

  return (
    <>{isValidAnswer && <MainDisplay question={question} answer={answer} />} </>
  );
}

export default InvMultipleChoiceDisplay;
