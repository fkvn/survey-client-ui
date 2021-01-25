import React from "react";
import { InputGroup } from "react-bootstrap";

import * as funcs from "../../../shared/utility";

function InvRatingDisplay(props) {
  const { question = {}, answer = {} } = props;

  const isValidAnswer =
    !funcs.isEmpty(question) &&
    !funcs.isEmpty(answer) &&
    question.questionType === answer.answerType &&
    answer.answerType === "RATING" &&
    answer.rating > 0 &&
    answer.rating <= question.ratingScale &&
    answer.rating <= 10;

  const MainDisplay = ({ question = {}, answer = {} }) => {
    let ratingDisplayItems = [];
    const ratingScale = question.ratingScale ? question.ratingScale : 0;
    const rating = answer.rating ? answer.rating : 1;

    for (let i = 0; i < (ratingScale > 10 ? 10 : ratingScale); i++) {
      ratingDisplayItems = [
        ...ratingDisplayItems,
        <div className="input-group-prepend rounded-0" key={i}>
          <div className="input-group-text">
            <input
              type="radio"
              aria-label="Radio button for following text input"
              name="ratingScale"
              value={i + 1}
              defaultChecked={i + 1 === rating}
              onClick={(event) => event.preventDefault()}
            />
          </div>
        </div>,
      ];
    }

    return (
      <>
        <InputGroup className="mb-2 pb-2 mt-3">
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
