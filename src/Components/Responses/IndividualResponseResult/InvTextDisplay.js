import React from "react";
import { Alert, InputGroup } from "react-bootstrap";

import * as funcs from "../../../shared/utility";
import * as exprt from "../../../shared/export";

function InvTextDisplay(props) {
  const { question = {}, answer = {} } = props;

  const isValidAnswer =
    !funcs.isEmpty(question) &&
    !funcs.isEmpty(answer) &&
    question[`${exprt.props.QUESTION_TYPE}`] ===
      answer[`${exprt.props.ANSWER_TYPE}`] &&
    answer[`${exprt.props.ANSWER_TYPE}`] === exprt.props.TXT_TYPE;

  const MainDisplay = ({ answer = {} }) => {
    return (
      <>
        {answer.text ? (
          <InputGroup.Text>
            {answer[`${exprt.props.ANSWER_TXT_ANSWER}`]}{" "}
          </InputGroup.Text>
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
