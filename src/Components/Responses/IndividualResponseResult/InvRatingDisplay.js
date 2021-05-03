import React from "react";
import { InputGroup } from "react-bootstrap";

import * as funcs from "../../../shared/utility";
import * as exprt from "../../../shared/export";

function InvRatingDisplay(props) {
  const { question = {}, answer = {} } = props;

  const isValidAnswer =
    !funcs.isEmpty(question) &&
    !funcs.isEmpty(answer) &&
    question[`${exprt.props.QUESTION_TYPE}`] ===
      answer[`${exprt.props.ANSWER_TYPE}`] &&
    answer[`${exprt.props.ANSWER_TYPE}`] === exprt.props.RT_TYPE &&
    answer[`${exprt.props.ANSWER_RT_ANSWERS}`] > 0 &&
    answer[`${exprt.props.ANSWER_RT_ANSWERS}`] <=
      question[`${exprt.props.RT_SCALE}`] &&
    answer[`${exprt.props.ANSWER_RT_ANSWERS}`] <= 10;

  const MainDisplay = ({ question = {}, answer = {} }) => {
    let ratingDisplayItems = [];
    const ratingScale = question[`${exprt.props.RT_SCALE}`]
      ? question[`${exprt.props.RT_SCALE}`]
      : 0;
    const rating = answer[`${exprt.props.ANSWER_RT_ANSWERS}`]
      ? answer[`${exprt.props.ANSWER_RT_ANSWERS}`]
      : 1;

    for (let i = 0; i < (ratingScale > 10 ? 10 : ratingScale); i++) {
      ratingDisplayItems = [
        ...ratingDisplayItems,
        <div className="input-group-prepend rounded-0" key={i}>
          <div className="input-group-text">
            <input
              type="radio"
              aria-label="Radio button for following text input"
              name={`ratingScale ${answer.id}`}
              value={i + 1}
              checked={i + 1 === rating ? true : false}
              onClick={(event) => event.preventDefault()}
              readOnly
            />
          </div>
        </div>,
      ];
    }

    return (
      <>
        <InputGroup className="mb-2 pb-2 mt-5">
          <InputGroup.Prepend>
            <InputGroup.Text className="text-danger">1</InputGroup.Text>
          </InputGroup.Prepend>
          {ratingDisplayItems}
          <InputGroup.Append>
            <InputGroup.Text className="text-danger">
              {ratingScale}
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>{" "}
      </>
    );
  };

  return (
    <>{isValidAnswer && <MainDisplay question={question} answer={answer} />} </>
  );
}

export default InvRatingDisplay;
