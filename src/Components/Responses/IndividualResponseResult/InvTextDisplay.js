import React from "react";
import { Alert, InputGroup } from "react-bootstrap";

import * as funcs from "../../../shared/utility";

function InvTextDisplay(props) {
  const { question = {}, answer = {} } = props;

  const isValidAnswer =
    !funcs.isEmpty(question) &&
    !funcs.isEmpty(answer) &&
    question.questionType === answer.answerType &&
    answer.answerType === "TEXT";

  const MainDisplay = ({ answer = {} }) => {
    return (
      <>
        {answer.text ? (
          <InputGroup.Text>{answer.text} </InputGroup.Text>
        ) : (
          <Alert variant="danger">
            There is no answer for this respondant !!!
          </Alert>
        )}
      </>
    );
  };

  return <>{isValidAnswer && <MainDisplay answer={answer} />} </>;
}

export default InvTextDisplay;
