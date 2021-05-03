import React, { useContext } from "react";
import {
  Accordion,
  AccordionContext,
  Card,
  ListGroup,
  Table,
  useAccordionToggle,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomOverlayTrigger from "../../../../CustomOverlayTrigger/CustomOverlayTrigger";

import * as exprt from "../../../../../shared/export";

function MultiChoiceQRS(props) {
  const { question = {}, questionQRS = {} } = props;

  const isValidatedComponent =
    question[`${exprt.props.QUESTION_TYPE}`] === exprt.props.MC_TYPE &&
    question[`${exprt.props.QUESTION_ID}`] ===
      questionQRS[`${exprt.props.QUESTION_QRS_ID}`] &&
    question[`${exprt.props.MC_ANSWERS}`].length ===
      Object.keys(questionQRS[`${exprt.props.QUESTION_QRS_MC_RESPONSES}`])
        .length;

  function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
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
    );
  }

  const showResponsesList = (responses) => (
    <Accordion>
      <div>
        <ContextAwareToggle eventKey="0">Show</ContextAwareToggle>
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

  const MainDisplay = ({ question = {}, questionQRS = {} }) => {
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
                    <th className="border-right">Selections</th>
                    <th className="text-center">Number of Responses</th>
                    <th className="text-center">List of Responses</th>
                  </tr>
                </thead>
                <tbody>
                  {question[`${exprt.props.MC_ANSWERS}`].map(
                    (choice, index) => (
                      <tr key={index}>
                        <td className="border-right">{choice}</td>
                        <td className="text-center">
                          {
                            questionQRS[
                              `${exprt.props.QUESTION_QRS_MC_RESPONSES}`
                            ][index][`${exprt.props.RESPONSE_LIST}`].length
                          }
                        </td>
                        <td className="text-center">
                          {showResponsesList(
                            questionQRS[
                              `${exprt.props.QUESTION_QRS_MC_RESPONSES}`
                            ][index][`${exprt.props.RESPONSE_LIST}`]
                          )}
                        </td>
                      </tr>
                    )
                  )}
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

export default MultiChoiceQRS;
