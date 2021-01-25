import React, { useContext } from "react";
import {
  Accordion,
  AccordionContext,
  Card,
  Table,
  useAccordionToggle,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import * as funcs from "../../../../../shared/utility";
import CustomOverlayTrigger from "../../../../CustomOverlayTrigger/CustomOverlayTrigger";

function RankingQRS(props) {
  const { question = {}, questionQRS = {} } = props;

  const isValidatedComponent =
    question.questionType === "RANKING" &&
    question.id === questionQRS.question &&
    questionQRS.rankingnResponses &&
    question.rankingChoices.length ** 2 ===
      Object.keys(questionQRS.rankingnResponses).length;

  function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <CustomOverlayTrigger unitKey="" title={`Number of responses`}>
        <button
          type="button"
          className={`btn btn-link shadow-none m-0 p-0 ${
            isCurrentEventKey ? " text-secondary " : "text-primary"
          }`}
          size="sm"
          variant="link"
          onClick={decoratedOnClick}
        >
          {isCurrentEventKey ? "Hide" : children}
        </button>
      </CustomOverlayTrigger>
    );
  }

  const showResponsesList = (responses) => (
    <Accordion>
      <div>
        <ContextAwareToggle eventKey="0">{responses.length}</ContextAwareToggle>

        <Accordion.Collapse eventKey="0">
          <ListGroup className="m-0 p-0 ">
            {responses.map(
              (res, index) =>
                !res.isDeleted && (
                  <CustomOverlayTrigger
                    unitKey={res.id}
                    title={res.date}
                    key={index}
                  >
                    <ListGroup.Item
                      className="m-0 p-0 border-0"
                      as={Link}
                      to={`/dashboard/mysurveys/survey/${res.survey}/responses/${res.id}`}
                    >
                      {res.type}
                    </ListGroup.Item>
                  </CustomOverlayTrigger>
                )
            )}
          </ListGroup>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );

  const getFinalRanks = (question, questionQRS) => {
    const finalRanks = question.rankingChoices.reduce(
      (finalRanks, _, choiceIndex) => {
        const finalRank = question.rankingChoices.reduce(
          (fnRank, _, rankIndex) =>
            fnRank +
            questionQRS.rankingnResponses[`${rankIndex + 1}:${choiceIndex}`]
              .responses.length *
              (rankIndex + 1),
          0
        );

        return {
          ...finalRanks,
          [choiceIndex]: finalRank,
        };
      },
      {}
    );

    return funcs.sortableObjectByValue(finalRanks);
  };

  const MainDisplay = ({ question = {}, questionQRS = {} }) => {
    const finalRanks = getFinalRanks(question, questionQRS);
    return (
      <>
        {question && questionQRS && (
          <Card className="mx-2 m-lg-0 ">
            <Card.Header className="text-center m-0 p-0 bg-success text-white">
              <strong>Summary</strong>
            </Card.Header>
            <Card.Body>
              <Table responsive hover size="sm" className="m-2">
                <thead>
                  <tr>
                    <th className="border-right align-middle" rowSpan={2}>
                      Choices
                    </th>
                    <th
                      className="text-center"
                      colSpan={question.rankingChoices.length}
                    >
                      Rank
                    </th>
                    <th
                      className="text-center border-left align-middle"
                      rowSpan={2}
                    >
                      Final rank
                    </th>
                  </tr>
                  <tr>
                    {question.rankingChoices.map((_, index) => (
                      <th key={index} className="text-center">
                        {index + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {question.rankingChoices.map((choice, choiceIndex) => (
                    <tr key={choiceIndex}>
                      <td className="border-right">{choice}</td>
                      {question.rankingChoices.map((_, rankIndex) => (
                        <td key={rankIndex} className="text-center">
                          {showResponsesList(
                            questionQRS.rankingnResponses[
                              `${rankIndex + 1}:${choiceIndex}`
                            ].responses
                          )}
                        </td>
                      ))}
                      <td className="text-center border-left">
                        {finalRanks[choiceIndex]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </>
    );
  };

  return (
    <>
      {isValidatedComponent && (
        <MainDisplay question={question} questionQRS={questionQRS} />
      )}
    </>
  );
}

export default RankingQRS;
