import React, { useEffect, useState } from "react";
import { InputGroup, Form, FormControl } from "react-bootstrap";

import * as funcs from "../../../shared/utility";

function RankingChoiceRes(props) {
  // console.log(" ============== RankingChoiceRes render  ============== ");

  const {
    sectionIndex,
    question,
    currentSelectionRanks = {},
    updatedResponse,
    validated,
    updatedRankingLists,
  } = props;

  const [request, setRequest] = useState({
    validAnswer: !funcs.isEmpty(updatedRankingLists)
      ? updatedRankingLists.reduce(
          (isValid, selRank) => isValid && selRank.rank !== "",
          true
        )
      : false,
    answer: {
      answerType: "RANKING",
      selectionRanks: !funcs.isEmpty(updatedRankingLists)
        ? updatedRankingLists
        : question.rankingChoices.reduce(
            (newSelRanks, choice) => [
              ...newSelRanks,
              {
                rank: "",
                choice: choice,
              },
            ],
            []
          ),
    },
  });

  // console.log(sectionIndex);
  // console.log(question);
  // console.log(currentSelectionRanks);
  // console.log(updatedRankingLists);
  // console.log(request.validAnswer);
  // console.log(request.answer.selectionRanks);
  // console.log(validated);
  // console.log("==============  initilized  ============== ");

  useEffect(() => {
    let answer = {
      answerType: "RANKING",
      selectionRanks: {},
    };

    if (request.validAnswer && funcs.isEmpty(currentSelectionRanks)) {
      answer = {
        ...answer,
        selectionRanks: request.answer.selectionRanks.reduce(
          (newSelRanks, selRank) => {
            return { ...newSelRanks, [selRank.rank]: selRank.choice };
          },
          {}
        ),
      };
      updatedResponse(
        sectionIndex,
        question.questionIndex,
        answer,
        request.answer.selectionRanks
      );
    } else if (!request.validAnswer && !funcs.isEmpty(currentSelectionRanks)) {
      updatedResponse(
        sectionIndex,
        question.questionIndex,
        answer,
        request.answer.selectionRanks
      );
    }
  });

  const handlerOnChange = (index, rankingChoice, newRank) => {
    const updatedSelRanks = request.answer.selectionRanks.reduce(
      (newSelRanks, selRank, selRankIndex) => [
        ...newSelRanks,
        selRankIndex === index
          ? {
              rank: newRank,
              choice: rankingChoice.choice,
            }
          : {
              ...selRank,
              rank: selRank.rank === newRank.toString() ? "" : selRank.rank,
            },
      ],
      []
    );

    const isValidAnswer = updatedSelRanks.reduce(
      (isValid, selRank) => isValid && selRank.rank !== "",
      true
    );

    setRequest({
      ...request,
      validAnswer: isValidAnswer,
      answer: {
        ...request.answer,
        selectionRanks: updatedSelRanks,
      },
    });
  };

  const ChoiceDisplay = ({ rankingChoice, index }) => {
    return (
      <>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Form.Control
              as="select"
              value={rankingChoice.rank}
              id={`default-${question.id}-${index}`}
              name={`ranking choice ${question.id}`}
              onChange={(event) =>
                handlerOnChange(index, rankingChoice, event.target.value)
              }
              required
            >
              <option></option>
              {question.rankingChoices.map((_, index) => (
                <option key={index}>{index + 1}</option>
              ))}
            </Form.Control>
          </InputGroup.Prepend>
          <FormControl defaultValue={rankingChoice.choice} readOnly />
        </InputGroup>
      </>
    );
  };

  const rankingChoiceRes =
    request.answer &&
    request.answer.selectionRanks &&
    request.answer.selectionRanks.map((rankingChoice, index) => (
      <ChoiceDisplay rankingChoice={rankingChoice} index={index} key={index} />
    ));

  const valStatus = validated && !request.validAnswer && (
    <Form.Label className={`text-danger`}>
      <small>All choices must be ranked!!!</small>
    </Form.Label>
  );

  return (
    <>
      {rankingChoiceRes}
      {valStatus}
    </>
  );
}

export default RankingChoiceRes;
