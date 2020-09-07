import React from "react";
import { Form, Row, Col } from "react-bootstrap";

import RatingDisplay from "../DisplayQuestions/RatingDisplay";

function Rating(props) {
  const { questionFields, updateQuestion } = props;

  const { ratingScale = 5 } = questionFields;

  const rating = (
    <Form.Group controlId="rating.ControlText">
      <Form.Label className="text-info">
        <strong>Rating scale</strong>
      </Form.Label>
      <Row>
        <Col xs={4}>
          <Form.Control
            type="number"
            min={1}
            max={10}
            defaultValue={ratingScale}
            onChange={(event) => updateQuestion(event.target.value)}
            required
          />
          {ratingScale > 10 && (
            <small className="text-danger">
              The maximum for rating scale is 10
            </small>
          )}

          {(ratingScale < 1 || !ratingScale) && (
            <small className="text-danger">Invalid rating</small>
          )}
        </Col>

        <Col xs={8}>
          {ratingScale && ratingScale > 0 && ratingScale < 11 && (
            <RatingDisplay ratingScale={ratingScale} />
          )}
        </Col>
      </Row>
    </Form.Group>
  );

  return <>{rating} </>;
}

export default Rating;
