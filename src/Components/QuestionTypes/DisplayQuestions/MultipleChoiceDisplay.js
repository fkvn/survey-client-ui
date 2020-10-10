import React, { useState } from "react";
import { Form } from "react-bootstrap";

function MultipleChoiceDisplay(props) {
  const { question } = props;

  const type = question.maxSelections > 1 ? "checkbox" : "radio";

  const [request, setRequest] = useState({
    selectedChoices: [],
  });

  const anwsers = (
    <>
      {question.choices.map((choice, index) => {
        return (
          <Form.Group key={index}>
            <Form.Check
              key={index}
              type={type}
              id={`default-${type}-${question.id}-${index}`}
              name={`multiple choice ${question.id}`}
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
                  : request.selectedChoices.length < question.maxSelections &&
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
        question.minSelections > 0 &&
        question.minSelections <= question.choices.length && (
          <Form.Group className="mt-0 pt-0">
            <small className="text-danger">
              <strong>Min Selections: {question.minSelections}</strong>
            </small>
          </Form.Group>
        )}

      {type === "checkbox" &&
        question.maxSelections > 0 &&
        question.maxSelections <= question.choices.length && (
          <Form.Group className="mb-2 mt-0 pt-0">
            <small className="text-danger">
              <strong>Max Selections: {question.maxSelections}</strong>
            </small>
          </Form.Group>
        )}
    </>
  );

  return <>{anwsers}</>;
}

export default MultipleChoiceDisplay;
