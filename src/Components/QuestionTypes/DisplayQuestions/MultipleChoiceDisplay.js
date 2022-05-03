import React, { useState } from "react";
import { Form } from "react-bootstrap";

import * as exprt from "../../../shared/export";

function MultipleChoiceDisplay(props) {
  const { question } = props;

  const type = question[`${exprt.props.MC_MAX_SEL}`] > 1 ? "checkbox" : "radio";

  const [request, setRequest] = useState({
    selectedChoices: [],
  });

  const anwsers = (
    <>
      {question[`${exprt.props.MC_ANSWERS}`].map((choice, index) => {
        return (
          <Form.Group key={index}>
            <Form.Check
              key={index}
              type={type}
              id={`default-${type}-${
                question[`${exprt.props.QUESTION_ID}`]
              }-${index}`}
              name={`multiple choice ${question[`${exprt.props.QUESTION_ID}`]}`}
              label={choice}
              onChange={() =>
                type === "radio"
                  ? setRequest({ ...request, selectedChoices: index })
                  : request.selectedChoices.indexOf(index) > -1
                  ? setRequest({
                      ...request,
                      selectedChoices: request.selectedChoices.filter(
                        (e) => e !== index
                      ),
                    })
                  : request.selectedChoices.length <
                      question[`${exprt.props.MC_MAX_SEL}`] &&
                    setRequest({
                      ...request,
                      selectedChoices: [...request.selectedChoices, index],
                    })
              }
              checked={
                type === "radio"
                  ? request.selectedChoices === index
                    ? true
                    : false
                  : request.selectedChoices.indexOf(index) > -1
                  ? true
                  : false
              }
            />
          </Form.Group>
        );
      })}
      {type === "checkbox" &&
        question[`${exprt.props.MC_MIN_SEL}`] > 0 &&
        question[`${exprt.props.MC_MIN_SEL}`] <=
          question[`${exprt.props.MC_ANSWERS}`].length && (
          <Form.Group className="mt-0 pt-0">
            <small className="text-danger">
              <strong>
                Min Selections: {question[`${exprt.props.MC_MIN_SEL}`]}
              </strong>
            </small>
          </Form.Group>
        )}

      {type === "checkbox" &&
        question[`${exprt.props.MC_MAX_SEL}`] > 0 &&
        question[`${exprt.props.MC_MAX_SEL}`] <=
          question[`${exprt.props.MC_ANSWERS}`].length && (
          <Form.Group className="mb-2 mt-0 pt-0">
            <small className="text-danger">
              <strong>
                Max Selections: {question[`${exprt.props.MC_MAX_SEL}`]}
              </strong>
            </small>
          </Form.Group>
        )}
    </>
  );

  return <>{anwsers}</>;
}

export default MultipleChoiceDisplay;
