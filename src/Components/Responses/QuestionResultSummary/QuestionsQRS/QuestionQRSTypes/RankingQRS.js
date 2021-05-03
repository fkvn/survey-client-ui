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
import * as exprt from "../../../../../shared/export";

import CustomOverlayTrigger from "../../../../CustomOverlayTrigger/CustomOverlayTrigger";

function RankingQRS(props) {
  const { question = {}, questionQRS = {} } = props;

  const isValidatedComponent =
    question[`${exprt.props.QUESTION_TYPE}`] === exprt.props.RK_TYPE &&
    question[`${exprt.props.QUESTION_ID}`] ===
      questionQRS[`${exprt.props.QUESTION_QRS_ID}`] &&
    questionQRS[`${exprt.props.QUESTION_QRS_RK_RESPONSES}`] &&
    question[`${exprt.props.RK_ANSWERS}`].length ** 2 ===
      Object.keys(questionQRS[`${exprt.props.QUESTION_QRS_RK_RESPONSES}`])
        .length;

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
                !res[`${exprt.props.IS_ARCHIVED}`] && (
                  <CustomOverlayTrigger
                    unitKey={res[`${exprt.props.RESPONSE_ID}`]}
                    title={res[`${exprt.props.RESPONSE_DATE}`]}
                    key={index}
                  >
                    <ListGroup.Item
                      className="m-0 p-0 border-0"
                      as={Link}
                      to={`/dashboard/mysurveys/survey/${
                        res[`${exprt.props.RESPONSE_SURVEY_ID}`]
                      }/responses/${res[`${exprt.props.RESPONSE_ID}`]}`}
                    >
                      {res[`${exprt.props.RESPONSE_TYPE}`]}
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
    const finalRanks = question[`${exprt.props.RK_ANSWERS}`].reduce(
      (finalRanks, _, choiceIndex) => {
        const finalRank = question[`${exprt.props.RK_ANSWERS}`].reduce(
          (fnRank, _, rankIndex) =>
            fnRank +
            questionQRS[`${exprt.props.QUESTION_QRS_RK_RESPONSES}`][
              `${rankIndex + 1}:${choiceIndex}`
            ][`${exprt.props.RESPONSE_LIST}`].length *
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

  // const sortedByFinalRanks = question[
  //   `${exprt.props.RK_ANSWERS}`
  // ].sort((a, b) => (finalRanks(a) < finalRanks(b) ? 1 : -1));

  const MainDisplay = ({ question = {}, questionQRS = {} }) => {
    const finalRanks = getFinalRanks(question, questionQRS);
    let tableRowColumnValues = question[`${exprt.props.RK_ANSWERS}`].reduce(
      (newRowCol, choice, choiceIndex) => [
        ...newRowCol,
        [
          choice,
          [
            ...question[`${exprt.props.RK_ANSWERS}`].reduce(
              (cols, _, rankIndex) => [
                ...cols,
                showResponsesList(
                  questionQRS[`${exprt.props.QUESTION_QRS_RK_RESPONSES}`][
                    `${rankIndex + 1}:${choiceIndex}`
                  ][`${exprt.props.RESPONSE_LIST}`]
                ),
              ],
              []
            ),
          ],
          finalRanks[choiceIndex],
        ],
      ],
      []
    );

    // sort by final Rank
    tableRowColumnValues = tableRowColumnValues.sort((a, b) =>
      a[2] > b[2] ? 1 : -1
    );

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
                      colSpan={question[`${exprt.props.RK_ANSWERS}`].length}
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
                    {question[`${exprt.props.RK_ANSWERS}`].map((_, index) => (
                      <th key={index} className="text-center">
                        {index + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRowColumnValues.map((row, index) => (
                    <tr key={index}>
                      <td className="border-right">{row[0]}</td>
                      {row[1].map((col, index) => (
                        <td key={index} className="text-center">
                          {col}
                        </td>
                      ))}
                      <td className="text-center border-left">{row[2]}</td>
                    </tr>
                  ))}
                  {/* {question[`${exprt.props.RK_ANSWERS}`].map(
                    (choice, choiceIndex) => (
                      <tr key={choiceIndex}>
                        <td className="border-right">{choice}</td>
                        {question[`${exprt.props.RK_ANSWERS}`].map(
                          (_, rankIndex) => (
                            <td key={rankIndex} className="text-center">
                              {showResponsesList(
                                questionQRS[
                                  `${exprt.props.QUESTION_QRS_RK_RESPONSES}`
                                ][`${rankIndex + 1}:${choiceIndex}`][
                                  `${exprt.props.RESPONSE_LIST}`
                                ]
                              )}
                            </td>
                          )
                        )}
                        <td className="text-center border-left">
                          {finalRanks[choiceIndex]}
                        </td>
                      </tr>
                    )
                  )} */}
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
