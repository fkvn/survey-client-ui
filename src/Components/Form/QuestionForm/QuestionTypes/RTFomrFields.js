import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import * as exprt from "../../../../shared/export";
import RatingDisplay from "../../../QuestionTypes/DisplayQuestions/RatingDisplay";

const RTFomrFields = ({ props, innerref }) => {
  const { editQuestion = exprt.db.initDb.QUESTION_INIT } = props;

  if (!innerref.current) {
    if (
      editQuestion[`${exprt.props.QUESTION_ID}`] > -1 &&
      editQuestion[`${exprt.props.QUESTION_INDEX}`] > -1
    ) {
      innerref.current = {
        ...editQuestion,
      };
    } else {
      innerref.current = { ...exprt.db.initDb.RT_PROPS_INIT };
    }
  }

  // const { ratingScale = 5 } = questionFields;

  const [ratingScale, setRatingScale] = useState(
    innerref.current[`${exprt.props.RT_SCALE}`]
  );

  const updateInnerRef = () => {
    try {
      if (innerref) {
        // final object sent to parent component via ref
        innerref.current = {
          // to get current value of answer from parent side, it has to be ref, can't be an array
          [`${exprt.props.RT_SCALE}`]: ratingScale,
        };
      }
    } catch (error) {}
  };

  // ============================ hooks =======================

  useEffect(() => {
    updateInnerRef();
  });

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
            onChange={(event) => setRatingScale(event.target.value)}
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

  return rating;
};

export default React.forwardRef((props, ref) => (
  <RTFomrFields props={props} innerref={ref} />
));
