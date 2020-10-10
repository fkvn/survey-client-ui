import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

import * as funcs from "../../../shared/utility";

function InvRankingDisplay(props) {
  const { question = {}, answer = {} } = props;

  const isValidAnswer =
    !funcs.isEmpty(question) &&
    !funcs.isEmpty(answer) &&
    question.questionType === answer.answerType &&
    answer.answerType === "RANKING" &&
    question.rankingChoices.length ===
      Object.keys(answer.selectionRanks).length;

  // if (answer.id === 82) {
  //   console.log(!funcs.isEmpty(question) && !funcs.isEmpty(answer));
  //   console.log(
  //     question.questionType === answer.answerType &&
  //       answer.answerType === "RANKINg"
  //   );
  // }

  const MainDisplay = ({ _, answer = {} }) => {
    const selectionRanks = answer.selectionRanks;
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
              defaultValue={selectionRanks[rank]}
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
