import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

import * as funcs from "../../../shared/utility";

import * as exprt from "../../../shared/export";

function InvRankingDisplay(props) {
  const { question = {}, answer = {} } = props;

  const isValidAnswer =
    !funcs.isEmpty(question) &&
    !funcs.isEmpty(answer) &&
    question[`${exprt.props.QUESTION_TYPE}`] ===
      answer[`${exprt.props.ANSWER_TYPE}`] &&
    answer[`${exprt.props.ANSWER_TYPE}`] === exprt.props.RK_TYPE &&
    question[`${exprt.props.RK_ANSWERS}`].length ===
      Object.keys(answer[`${exprt.props.ANSWER_RK_ANSWERS}`]).length;

  const MainDisplay = ({ _, answer = {} }) => {
    const selectionRanks = answer[`${exprt.props.ANSWER_RK_ANSWERS}`];
    const ranks = Object.keys(selectionRanks);

    return (
      <>
        {ranks.map((rank, index) => (
          <InputGroup className="mb-3" key={index}>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1" key={index}>
                {rank}
              </InputGroup.Text>
            </InputGroup.Prepend>

            <FormControl
              key={index}
              defaultValue={
                question[`${exprt.props.RK_ANSWERS}`][selectionRanks[rank]]
              }
              readOnly
            />
          </InputGroup>
        ))}
      </>
    );
  };

  return (
    <>{isValidAnswer && <MainDisplay question={question} answer={answer} />} </>
  );
}

export default InvRankingDisplay;
