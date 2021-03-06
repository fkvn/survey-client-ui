import React from "react";
import { Card, Nav, Tab } from "react-bootstrap";

import * as funcs from "../../../shared/utility";
import InvQuestionDisplay from "./InvQuestionDisplay";

function IndividualResponse(props) {
  const { survey = {}, response = {} } = props;

  const DisplayDescription = ({ description }) => {
    return (
      <Card.Text className="mb-4 mt-0 pt-0">
        {description && <strong>Description: </strong>}
        <em>{description}</em>
      </Card.Text>
    );
  };

  const MainDisplay = ({ survey = {}, response = {} }) => {
    return (
      <>
        <Card
          as={Tab.Container}
          className="border-0"
          defaultActiveKey={0}
          transition={false}
        >
          <Card.Header
            as={Nav}
            variant="tabs"
            className="m-0 p-0 border-bottom"
          >
            {response.answerSections.map((_, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={index}>Section {index + 1}</Nav.Link>
              </Nav.Item>
            ))}
          </Card.Header>
          <Card.Body as={Tab.Content} className="border border-top-0">
            {response.answerSections.map((section, index) => (
              <Tab.Pane
                key={index}
                eventKey={index}
                className="m-2 d-none d-xl-block"
              >
                <DisplayDescription description={section.description} />
                <InvQuestionDisplay
                  questions={survey.questionSections[index].questions}
                  answers={section.answers}
                />
              </Tab.Pane>
            ))}
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <>
      {!funcs.isEmpty(survey) && !funcs.isEmpty(response) && (
        <MainDisplay survey={survey} response={response} />
      )}{" "}
    </>
  );
}

export default IndividualResponse;
