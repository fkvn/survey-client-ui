import React from "react";
import { InputGroup, Form } from "react-bootstrap";

function RatingRes(props) {
  // console.log(" ============== RatingRes render  ============== ");

  const {
    sectionIndex,
    question,
    currentRatingScale,
    updatedResponse,
    validated,
  } = props;

  // console.log(sectionIndex);
  // console.log(question);
  // console.log(currentRatingScale);
  // console.log(updatedRankingLists);
  // console.log(request.validAnswer);
  // console.log(request.answer.selectionRanks);
  // console.log(validated);

  // console.log("==============  initilized  ============== ");

  let ratingDisplayItems = [];

  const handlerOnChange = (newRatingScale) => {
    const answer = {
      answerType: "RATING",
      rating: Number(newRatingScale),
    };

    updatedResponse(sectionIndex, question.questionIndex, answer);
  };

  for (let i = 0; i < question.ratingScale; i++) {
    ratingDisplayItems = [
      ...ratingDisplayItems,
      <div className="input-group-prepend rounded-0" key={i}>
        <div className="input-group-text">
          <input
            type="radio"
            aria-label="Radio button for following text input"
            name={`ratingScale ${question.id}`}
            id={`ratingScale ${question.id}`}
            value={i + 1}
            onChange={(event) => handlerOnChange(event.target.value)}
            checked={i + 1 === currentRatingScale ? true : false}
          />
        </div>
      </div>,
    ];
  }

  const ratingDisplay = (
    <InputGroup className="mb-2 pb-2">
      <InputGroup.Prepend>
        <InputGroup.Text className="text-danger">1</InputGroup.Text>
      </InputGroup.Prepend>
      {ratingDisplayItems}
      <InputGroup.Append>
        <InputGroup.Text className="text-danger">
          {question.ratingScale}
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );

  return (
    <>
      {ratingDisplay}
      {validated && !currentRatingScale && (
        <Form.Label className="text-danger">
          <small>Please select one choice</small>
        </Form.Label>
      )}
    </>
  );
}

export default RatingRes;
