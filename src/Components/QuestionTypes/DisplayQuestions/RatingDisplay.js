import React from "react";
import { InputGroup } from "react-bootstrap";

function RatingDisplay(props) {
  const { ratingScale } = props;

  let ratingDisplayItems = [];

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
          {ratingScale > 10 ? 10 : Number(ratingScale)}
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );

  return <>{ratingDisplay}</>;
}

export default RatingDisplay;
