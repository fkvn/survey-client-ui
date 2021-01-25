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

function TextQRS(props) {
  const { question = {}, questionQRS = {} } = props;

  const qrsTypes = ["answered", "skipped"];

  const isValidatedComponent =
    question.questionType === "TEXT" &&
    question.id === questionQRS.question &&
    questionQRS.textResponses &&
    Object.keys(questionQRS.textResponses).length === qrsTypes.length;

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

  const showTextAnswers = (responses) => (
    <Accordion>
      <div>
        <ContextAwareToggle eventKey="0">Show</ContextAwareToggle>
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
                    <th className="border-right">Type</th>
                    <th className="text-center">Number of Responses</th>
                    <th className="text-center">List of Responses</th>
                  </tr>
                </thead>
                <tbody>
                  {qrsTypes.map((type, index) => (
                    <tr key={index}>
                      <td className="border-right">{type}</td>
                      <td className="text-center">
                        {questionQRS.textResponses[type].responses.length}
                      </td>
                      <td className="text-center">
                        {showResponsesList(
                          questionQRS.textResponses[type].responses
                        )}
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

export default TextQRS;
