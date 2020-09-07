import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

function MultipleChoiceRes(props) {
  // console.log(" ============== MultipleChoiceRes render  ============== ");

  const {
    sectionIndex,
    question,
    currentSelections = [],
    updatedResponse,
    validated,
  } = props;

  const choiceType = question.maxSelections === 1 ? "radio" : "checkbox";

  // console.log(sectionIndex);
  // console.log(question);
  // console.log(currentSelections);
  // console.log(choiceType);
  // console.log(validated);
  // console.log("==============  initilized  ============== ");

  const [request, setRequest] = useState({
    valStatus: {
      show: false,
      msg: "",
      type: "",
    },
  });

  const handlerOnChange = (choiceType, selectionValue) => {
    let selections = [];
    let update = true;

    if (choiceType === "radio") {
      selections = [selectionValue];
    } else if (choiceType === "checkbox") {
      const updatedCurrentSelection =
        currentSelections.indexOf(selectionValue.toString()) > -1
          ? currentSelections.filter(
              (selection) => selection !== selectionValue.toString()
            )
          : [...currentSelections, selectionValue];

      if (
        updatedCurrentSelection.length <= question.maxSelections ||
        (question.maxSelections === 0 && question.minSelections === 0)
      ) {
        selections = updatedCurrentSelection;
        selections = selections.sort();
      } else {
        update = false;
        setRequest({
          ...request,
          valStatus: {
            show: true,
            msg: "Reached maximum of choices!!!",
            type: "text-danger",
          },
        });
      }
    }

    const answer = {
      answerType: "MULTIPLE_CHOICE",
      selections: selections,
    };

    // console.log(answer);

    if (update) {
      updatedResponse(sectionIndex, question.questionIndex, answer);
    }
  };

  if (
    request.valStatus.show &&
    request.valStatus.msg === "Reached maximum of choices!!!"
  ) {
    setTimeout(
      () => setRequest({ ...request, valStatus: { show: false } }),
      500
    );
  }
  const valStatus = request.valStatus.show && (
    <Form.Label className={request.valStatus.type}>
      <small>{request.valStatus.msg}</small>
    </Form.Label>
  );

  useEffect(() => {
    if (validated && !request.valStatus.show) {
      if (choiceType === "radio" && currentSelections.length !== 1) {
        setRequest({
          ...request,
          valStatus: {
            show: true,
            msg: "Please select at least 1 choice!",
            type: "text-danger",
          },
        });
      } else if (
        choiceType === "checkbox" &&
        currentSelections.length < question.minSelections
      ) {
        setRequest({
          ...request,
          valStatus: {
            show: true,
            msg: `Please select at least ${question.minSelections}  choices!`,
            type: "text-danger",
          },
        });
      }
    }
  }, [
    validated,
    request,
    choiceType,
    currentSelections.length,
    question.minSelections,
  ]);

  const multipleChoiceRes = (
    <>
      {question.choices.map((choice, index) => {
        return (
          <Form.Group key={index}>
            <Form.Check
              key={index}
              type={choiceType}
              id={`default-${choiceType}-${question.id}-${index}`}
              name={`multiple choice ${question.id}`}
              label={choice}
              className={`mb-2`}
              value={index}
              onChange={(event) =>
                handlerOnChange(choiceType, event.target.value)
              }
              checked={
                currentSelections.indexOf(index.toString()) > -1 ? true : false
              }
              required={
                choiceType === "radio" || (validated && request.valStatus.show)
                  ? true
                  : false
              }
            />
          </Form.Group>
        );
      })}
      {valStatus}
    </>
  );

  return <>{multipleChoiceRes} </>;
}

export default MultipleChoiceRes;
