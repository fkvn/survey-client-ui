import React, { useState } from "react";
import { InputGroup, Form, FormControl } from "react-bootstrap";

function RankingChoiceDisplay(props) {
  const { rankingChoices } = props;

  const [request, setRequest] = useState({
    rankingLists: rankingChoices.reduce(
      (nRL, rc) => [...nRL, { rank: "", choice: rc }],
      []
    ),
  });

  const updateRanking = (index, newRank) => {
    const updatedRankingLists = request.rankingLists.reduce(
      (nRL, rl, i) => [
        ...nRL,
        i === index
          ? { ...rl, rank: newRank }
          : rl.rank === newRank
          ? { ...rl, rank: "" }
          : rl,
      ],
      []
    );

    setRequest({ ...request, rankingLists: updatedRankingLists });
  };

  const ChoiceDisplay = ({ rItem, index }) => {
    return (
      <>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Form.Control
              as="select"
              value={rItem.rank}
              onChange={(event) => updateRanking(index, event.target.value)}
            >
              <option></option>
              {rankingChoices.map((_, index) => (
                <option key={index}>{index + 1}</option>
              ))}
            </Form.Control>
          </InputGroup.Prepend>
          <FormControl defaultValue={rItem.choice} readOnly />
        </InputGroup>
      </>
    );
  };

  return (
    <>
      {request.rankingLists &&
        request.rankingLists.map((rl, index) => (
          <ChoiceDisplay rItem={rl} index={index} key={index} />
        ))}
    </>
  );
}

export default RankingChoiceDisplay;
