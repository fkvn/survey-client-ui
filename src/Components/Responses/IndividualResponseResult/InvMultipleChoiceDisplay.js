import React from "react";
import { Form } from "react-bootstrap";

import * as funcs from "../../../shared/utility";

import * as exprt from "../../../shared/export";

function InvMultipleChoiceDisplay(props) {
  const { question = {}, answer = {} } = props;

  const isValidAnswer =
    !funcs.isEmpty(question) &&
    !funcs.isEmpty(answer) &&
    question[`${exprt.props.QUESTION_TYPE}`] ===
      answer[`${exprt.props.ANSWER_TYPE}`] &&
    answer[`${exprt.props.ANSWER_TYPE}`] === exprt.props.MC_TYPE;

  const MainDisplay = ({ question = {}, answer = {} }) => {
    const type =
      Number(question[`${exprt.props.MC_MIN_SEL}`]) === 1 &&
      Number(question[`${exprt.props.MC_MAX_SEL}`]) === 1
        ? "radio"
        : "checkbox";

    return (
      <>
        {question[`${exprt.props.MC_ANSWERS}`].map((choice, index) => (
          <Form.Group key={index}>
            <Form.Check
              key={index}
              type={type}
              id={`default-${type}-${
                question[`${exprt.props.QUESTION_ID}`]
              }-${index}`}
              name={`multiple choice ${question[`${exprt.props.QUESTION_ID}`]}`}
              label={choice}
              className="text-primary"
              onClick={(event) => event.preventDefault()}
              defaultChecked={
                type === "radio"
                  ? answer[`${exprt.props.ANSWER_MC_ANSWERS}`][0] === index
                    ? true
                    : false
                  : answer[`${exprt.props.ANSWER_MC_ANSWERS}`].indexOf(index) >
                    -1
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
