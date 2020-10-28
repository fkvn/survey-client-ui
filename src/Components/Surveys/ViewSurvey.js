import React from "react";
import * as funcs from "../../shared/utility";
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Nav,
  NavDropdown,
  Tabs,
  Tab,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import IconButton from "../CustomButton/IconButton";

import MultipleChoiceDisplay from "../QuestionTypes/DisplayQuestions/MultipleChoiceDisplay";
import TextDisplay from "../QuestionTypes/DisplayQuestions/TextDisplay";
import RatingDisplay from "../QuestionTypes/DisplayQuestions/RatingDisplay";
import RankingChoiceDisplay from "../QuestionTypes/DisplayQuestions/RankingChoiceDisplay";

function ViewSurvey(props) {
  const { survey = {} } = props;
  const history = useHistory();

  const SurveyOptions = ({ survey }) => {
    const editSurveyOption = {
      type: "Edit",
      title: "Edit name and description",
      onClick: () =>
        history.push(`/dashboard/mysurveys/editSurvey?sId=${survey.id}`),
    };

    const cloneSurveyOption = {
      type: "Clone",
      title: "Clone survey",
      onClick: () => alert("Clone survey"),
    };

    const summaryResultOption = {
      type: "Summary Result",
      title: "Summary survey result",
      onClick: () =>
        history.push(`/dashboard/mysurveys/survey/${survey.id}/responses`),
    };

    let allowedOptions = [];

    allowedOptions = [
      { ...editSurveyOption },
      { ...cloneSurveyOption },
      { ...summaryResultOption },
    ];

    return (
      <>
        {allowedOptions.map(
          (op, i) =>
            !funcs.isEmpty(op) && (
              <IconButton
                type={op.type}
                title={op.title}
                onClickHandler={op.onClick}
                key={i}
                index={i}
              />
            )
        )}
      </>
    );
  };

  const surveyTitleNavBar = (
    <>
      <Form.Group controlId="titleNavBar">
        <Card.Header className="p-0">
          <Row>
            <Col xs={8} lg={4}>
              <Button
                variant="link"
                className="text-primary text-decoration-none"
                onClick={() => history.push(`/dashboard/mysurveys`)}
              >
                <strong>
                  My Surveys
                  <FontAwesomeIcon
                    icon={["fas", "chevron-right"]}
                    size="sm"
                    className="text-secondary mx-2"
                  />
                </strong>
              </Button>
              <Button
                variant="link"
                className="text-info px-0 text-decoration-none"
              >
                <strong>{survey.name}</strong>
              </Button>
            </Col>
            <Col xs={4} lg={8}>
              <div className="float-right mr-2 mt-1 d-none d-lg-inline-block">
                <SurveyOptions survey={survey} />
              </div>
              <div className="float-right mr-2 d-inline-block d-lg-none">
                <Nav variant="pills">
                  <NavDropdown title="" id="nav-dropdown">
                    <NavDropdown.Item>
                      <SurveyOptions survey={survey} />
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </div>
            </Col>
          </Row>
        </Card.Header>
      </Form.Group>
    </>
  );

  // ========================= Questions =============================

  const QuestionDisplayTypes = ({ question }) => {
    let typeDisplay = null;
    switch (question.questionType) {
      case "MULTIPLE_CHOICE":
        typeDisplay = <MultipleChoiceDisplay question={question} />;
        break;
      case "TEXT":
        typeDisplay = <TextDisplay textLength={question.textLength} />;
        break;
      case "RATING":
        typeDisplay = <RatingDisplay ratingScale={question.ratingScale} />;
        break;
      case "RANKING":
        typeDisplay = (
          <RankingChoiceDisplay rankingChoices={question.rankingChoices} />
        );
        break;
      default:
        break;
    }
    return typeDisplay;
  };

  const QuestionsDisplay = ({ section }) => {
    return (
      <>
        <Row className=" bg-white rounded m-2">
          <Col>
            {section.questions.map((question, index) => (
              <Card key={index} className="mb-3">
                <Card.Header
                  className="py-2"
                  style={{ overflow: "scroll", maxHeight: "320px" }}
                >
                  <div>
                    <strong>Question {index + 1}. </strong>
                  </div>
                </Card.Header>
                <Card.Body className="pb-0">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: funcs.updateQDescImgs(
                        question.description,
                        question.attachments
                      ),
                    }}
                  />
                  <hr className="border" />
                  <QuestionDisplayTypes question={question} />
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </>
    );
  };

  // ========================= Sections ==============================

  const SurveySections = ({ sections }) => {
    return (
      <>
        <Tabs
          defaultActiveKey={0}
          transition={false}
          id="noanim-tab-example"
          className="my-4 mx-4 border-bottom "
        >
          {sections.map((sec, index) => (
            <Tab
              eventKey={index}
              title={
                <strong className="text-primary">
                  Section {sec.sectionIndex + 1}{" "}
                </strong>
              }
              key={index}
              className="p-0 m-0 bg-white"
            >
              <DisplayDescription
                description={sec.description}
                label="Description"
              ></DisplayDescription>
              {sec.questions && sec.questions.length > 0 && (
                <QuestionsDisplay section={sec} />
              )}
            </Tab>
          ))}
        </Tabs>
      </>
    );
  };

  // ===============================================
  const DisplayDescription = ({ description, mutedOption, label }) => {
    return (
      <Card.Text className="ml-4 mb-2">
        {label && description && <strong>Description: </strong>}
        <em>
          {description
            ? description
            : mutedOption && (
                <span className="text-muted">
                  There is no description for this survey
                </span>
              )}
        </em>
      </Card.Text>
    );
  };

  const viewSurveyDisplay = (
    <>
      <Card className="border">
        {surveyTitleNavBar}
        <Card.Body className="p-0">
          <DisplayDescription
            description={survey.description}
            mutedOption={true}
          ></DisplayDescription>
          {survey.questionSections && survey.questionSections.length > 0 && (
            <SurveySections sections={survey.questionSections} />
          )}
        </Card.Body>
      </Card>
    </>
  );

  return <>{!funcs.isEmpty(survey) && <>{viewSurveyDisplay} </>} </>;
}

export default ViewSurvey;
