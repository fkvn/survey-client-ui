import React, { useState } from "react";
import {
  Form,
  Card,
  Button,
  Tab,
  Row,
  Col,
  Nav,
  Tabs,
  Dropdown,
  ButtonGroup,
  NavDropdown,
} from "react-bootstrap";

import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../shared/fontawesome";
import * as funcs from "../../shared/utility";

// // survey
import UpdateSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/UpdateSurveyBuilder";

import DeleteSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/DeleteSurveyBuilder";

// // section
import CreateSectionBuilder from "../../Containers/DashboardBuilder/UpdateSectionBuilders/CreateSectionBuilder";
import UpdateSectionBuilder from "../../Containers/DashboardBuilder/UpdateSectionBuilders/UpdateSectionBuilder";
import DeleteSectionBuilder from "../../Containers/DashboardBuilder/UpdateSectionBuilders/DeleteSectionBuilder";

// // question
import CreateQuestionBuilder from "../../Containers/DashboardBuilder/UpdateQuestionBuilder/CreateQuestionBuilder";
import UpdateQuestionBuilder from "../../Containers/DashboardBuilder/UpdateQuestionBuilder/UpdateQuestionBuilder";
import DeleteQuestionBuilder from "../../Containers/DashboardBuilder/UpdateQuestionBuilder/DeleteQuestionBuilder";

// // question MULTIPLE_CHOICE
import MultipleChoiceDisplay from "../QuestionTypes/DisplayQuestions/MultipleChoiceDisplay";
import RankingChoiceDisplay from "../QuestionTypes/DisplayQuestions/RankingChoiceDisplay";
import RatingDisplay from "../QuestionTypes/DisplayQuestions/RatingDisplay";
import TextDisplay from "../QuestionTypes/DisplayQuestions/TextDisplay";

// Buttons
import IconButton from "../CustomButton/IconButton";
import CustomOverlayTrigger from "../CustomOverlayTrigger/CustomOverlayTrigger";
import PublishSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/PublishSurveyBuilder";

function FullSurvey(props) {
  const { survey = {} } = props;
  const history = useHistory();

  const [request, setRequest] = useState({
    showESurNameDescModal: false,
    showDeleteSurveyModal: false,

    // section
    showAddSectionModal: false,
    showESectionDescModal: false,
    showDeleteSectionModal: false,
    updatingSection:
      survey &&
      survey.questionSections &&
      survey.questionSections.length > 0 &&
      survey.questionSections[0],

    // question
    showAddQuestionModal: false,
    showUpdateQuestionModal: false,
    showDeleteQuestionModal: false,
    updatingQuestion:
      survey &&
      survey.questionSections &&
      survey.questionSections.length > 0 &&
      survey.questionSections[0].questions &&
      survey.questionSections[0].questions.length > 0 &&
      survey.questionSections[0].questions[0],
  });

  // ============================ Survey Modals ==============================

  const updateSurveyModal = request.showESurNameDescModal && (
    <UpdateSurveyBuilder
      show={true}
      onHide={() => setRequest({ ...request, showESurNameDescModal: false })}
      survey={survey}
    ></UpdateSurveyBuilder>
  );

  const deleteSurveyModal = request.showDeleteSurveyModal && (
    <DeleteSurveyBuilder
      show={true}
      onHide={() => setRequest({ ...request, showDeleteSurveyModal: false })}
      survey={survey}
    ></DeleteSurveyBuilder>
  );

  // ============================ Survey Title Bar ===========================

  const SurveyOptions = ({ survey }) => {
    const editSurveyOption = {
      type: "Edit",
      title: "Edit name and description",
      onClick: () => setRequest({ ...request, showESurNameDescModal: true }),
    };
    const addSectionOption = {
      type: "Add",
      title: "Add section",
      onClick: () => setRequest({ ...request, showAddSectionModal: true }),
    };
    const publishOptions = {
      type: "Publish",
      title: "Publish survey",
    };

    const cloneSurveyOption = {
      type: "Clone",
      title: "Clone survey",
      onClick: () => alert("Clone survey"),
    };
    const deleteSurveyOption = {
      type: "Delete",
      title: "Delete survey",
      onClick: () => setRequest({ ...request, showDeleteSurveyModal: true }),
    };

    let allowedOptions = [];

    allowedOptions = [
      { ...editSurveyOption },
      { ...addSectionOption },
      { ...publishOptions },
      { ...cloneSurveyOption },
      { ...deleteSurveyOption },
    ];

    return (
      <>
        {allowedOptions.map((op, i) =>
          op.type === "Publish" ? (
            <PublishSurveyBuilder key={i} survey={survey}>
              <Button variant="link" size="lg" className="px-1">
                <FontAwesomeIcon
                  icon={["fas", "cloud-upload-alt"]}
                  size="sm"
                  color="text-primary"
                />
              </Button>
            </PublishSurveyBuilder>
          ) : (
            !funcs.isEmpty(op) && (
              <IconButton
                type={op.type}
                title={op.title}
                onClickHandler={op.onClick}
                key={i}
                index={i}
              />
            )
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
                onClick={() =>
                  history.push(`/dashboard/mysurveys?sId=${survey.id}`)
                }
              >
                <strong>{survey.name}</strong>
              </Button>
            </Col>
            <Col xs={4} lg={8}>
              <div className="float-right mr-2 d-none d-lg-inline-block">
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

  // ============================ Questions ===========================

  const addQuestionModal = request.showAddQuestionModal && (
    <CreateQuestionBuilder
      show={true}
      onHide={() => setRequest({ ...request, showAddQuestionModal: false })}
      surveyId={survey && survey.id}
      section={request.updatingSection}
      updateQuestion={(newQuestion) =>
        setRequest({
          ...request,
          updatingQuestion: newQuestion,
          showAddQuestionModal: false,
        })
      }
    ></CreateQuestionBuilder>
  );

  const updateQuestionModal = request.showUpdateQuestionModal && (
    <UpdateQuestionBuilder
      show={true}
      onHide={() => setRequest({ ...request, showUpdateQuestionModal: false })}
      surveyId={survey && survey.id}
      section={request.updatingSection}
      question={request.updatingQuestion}
      updateQuestion={(updatedQuetion) =>
        setRequest({
          ...request,
          updatingQuestion: updatedQuetion,
          showUpdateQuestionModal: false,
        })
      }
    ></UpdateQuestionBuilder>
  );

  const deleteQuestionModal = request.showDeleteQuestionModal && (
    <DeleteQuestionBuilder
      show={true}
      onHide={() => setRequest({ ...request, showDeleteQuestionModal: false })}
      surveyId={survey.id}
      sectionId={request.updatingSection.id}
      question={request.updatingQuestion}
      updateQuestion={(deleted) =>
        deleted &&
        setRequest({
          ...request,
          updatingQuestion:
            request.updatingQuestion.questionIndex !== 0 &&
            request.updatingSection.questions.length > 0
              ? request.updatingSection.questions[0]
              : null,
          showDeleteQuestionModal: false,
        })
      }
    ></DeleteQuestionBuilder>
  );

  const QuestionOptions = ({ section, question }) => {
    const editQuestionOption = {
      type: "Edit",
      title: "Edit Question",
      onClick: () =>
        setRequest({
          ...request,
          showUpdateQuestionModal: true,
          updatingSection: section,
          updatingQuestion: question,
        }),
    };
    const deleteQuestionOptions = {
      type: "Delete",
      title: "Delete Question",
      onClick: () => {
        setRequest({
          ...request,
          showDeleteQuestionModal: true,
          updatingSection: section,
          updatingQuestion: question,
        });
      },
    };
    let allowedOptions = [];

    allowedOptions = [{ ...editQuestionOption }, { ...deleteQuestionOptions }];

    return (
      <>
        {allowedOptions.map((op, i) => (
          <IconButton
            type={op.type}
            title={op.title}
            onClickHandler={op.onClick}
            key={i}
            index={i}
          />
        ))}
      </>
    );
  };

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
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={
            !section ||
            !request.updatingQuestion ||
            section.sectionIndex !== request.updatingSection.sectionIndex ||
            request.updatingQuestion.questionIndex >= section.questions.length
              ? 0
              : request.updatingQuestion.questionIndex
          }
        >
          <Row className=" bg-light rounded p-2 m-2">
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                {section.questions.map((question, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={index}>
                      <span
                        onClick={() =>
                          setRequest({
                            ...request,
                            updatingSection: section,
                            updatingQuestion: question,
                          })
                        }
                      >
                        Question {index + 1}
                      </span>
                      <span className="float-right">
                        <QuestionOptions
                          section={section}
                          question={question}
                        />
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                {section.questions.map((question, index) => (
                  <Tab.Pane key={index} eventKey={index}>
                    <Card>
                      <Card.Header
                        className="py-2"
                        style={{ overflow: "scroll", maxHeight: "320px" }}
                      >
                        <div>
                          <strong>
                            {index + 1}.{" "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: funcs.updateQDescImgs(
                                  question.description,
                                  question.attachments
                                ),
                              }}
                            />
                          </strong>
                        </div>
                      </Card.Header>
                      <Card.Body className="mb-0 pb-0">
                        <QuestionDisplayTypes question={question} />
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </>
    );
  };

  // ============================ Sections ===========================

  const addSectionModal = request.showAddSectionModal && (
    <CreateSectionBuilder
      show={true}
      onHide={() => setRequest({ ...request, showAddSectionModal: false })}
      survey={survey}
      updateSection={(newSec) =>
        setRequest({
          ...request,
          updatingSection: newSec,
          showAddSectionModal: false,
        })
      }
    ></CreateSectionBuilder>
  );

  const updateSectionModal = request.showESectionDescModal && (
    <UpdateSectionBuilder
      show={true}
      onHide={() => setRequest({ ...request, showESectionDescModal: false })}
      surveyId={survey && survey.id}
      section={request.updatingSection}
    ></UpdateSectionBuilder>
  );

  const deleteSectionModal = request.showDeleteSectionModal && (
    <DeleteSectionBuilder
      show={true}
      onHide={() => setRequest({ ...request, showDeleteSectionModal: false })}
      surveyId={survey && survey.id}
      section={request.updatingSection}
      updateSection={() =>
        setRequest({
          ...request,
          updatingSection:
            survey.questionSections && survey.questionSections.length > 0
              ? survey.questionSections[0]
              : null,
          showDeleteSectionModal: false,
        })
      }
    ></DeleteSectionBuilder>
  );

  const SectionOption = ({ sec }) => {
    const editSectionOption = {
      type: "Edit",
      title: "Edit description",
      onClick: () =>
        setRequest({
          ...request,
          showESectionDescModal: true,
          updatingSection: sec,
          updatingQuestion:
            sec.questions && sec.questions.length > 0
              ? sec.questions[0]
              : request.updatingQuestion,
        }),
    };
    const deleteSectionOption = {
      type: "Delete",
      title: "Delete section",
      onClick: () =>
        setRequest({
          ...request,
          showDeleteSectionModal: true,
          updatingSection: sec,
          updatingQuestion:
            sec.questions && sec.questions.length > 0
              ? sec.questions[0]
              : request.updatingQuestion,
        }),
    };

    const addQuestionOption = {
      type: "Add",
      title: "Add question",
      onClick: () =>
        setRequest({
          ...request,
          showAddQuestionModal: true,
          updatingSection: sec,
          updatingQuestion:
            sec.questions && sec.questions.length > 0
              ? sec.questions[0]
              : request.updatingQuestion,
        }),
    };
    let allowedOptions = [];

    allowedOptions = [
      { ...editSectionOption },
      { ...addQuestionOption },
      { ...deleteSectionOption },
    ];

    return (
      <>
        {allowedOptions.map((op, i) => (
          <IconButton
            type={op.type}
            title={op.title}
            onClickHandler={op.onClick}
            key={i}
            index={i}
          />
        ))}
      </>
    );
  };

  const SectionTitleBar = ({ sec }) => {
    return (
      <>
        <Dropdown as={ButtonGroup} className="p-0 m-0" size="sm">
          <Button variant="link" className="text-decoration-none shadow-none">
            <strong>Section {sec.sectionIndex + 1} </strong>
          </Button>
          <CustomOverlayTrigger unitKey={sec.id} title="Options">
            <Dropdown.Toggle
              split
              variant="link"
              className="text-decoration-none text-info"
              id="dropdown-split-basic"
            ></Dropdown.Toggle>
          </CustomOverlayTrigger>
          <Dropdown.Menu className="p-0 m-0">
            <Dropdown.Item as="span">
              <div className="m-0 p-0">
                <SectionOption sec={sec} />
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  const SurveySections = ({ sections }) => {
    return (
      <>
        <Tabs
          defaultActiveKey={request.updatingSection.sectionIndex}
          transition={false}
          id="noanim-tab-example"
          className="my-4 mx-4 border-bottom "
        >
          {sections.map((sec, index) => (
            <Tab
              eventKey={index}
              title={<SectionTitleBar sec={sec} />}
              key={index}
              className="p-0 m-0"
            >
              <DisplayDescription
                description={sec.description}
                label="Description"
              ></DisplayDescription>
              {sec.questions.length > 0 && <QuestionsDisplay section={sec} />}
              <Form.Group className="m-4">
                <Button
                  variant="success"
                  onClick={() =>
                    setRequest({
                      ...request,
                      showAddQuestionModal: true,
                      updatingSection: sec,
                      updatingQuestion:
                        sec.questions && sec.questions.length > 0
                          ? sec.questions[0]
                          : request.updatingQuestion,
                    })
                  }
                >
                  Add Question
                </Button>
              </Form.Group>
            </Tab>
          ))}
        </Tabs>
      </>
    );
  };

  // ============================ Main Display ===========================
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

  const fullSurveyDisplay = (
    <>
      <Card className="border-0 bg-light">
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

  return (
    <>
      {!funcs.isEmpty(survey) && survey.closed && !survey.publishDate ? (
        <>
          {/* survey option modals */}
          {updateSurveyModal}
          {deleteSurveyModal}

          {/* section option modals */}
          {addSectionModal}
          {updateSectionModal}
          {deleteSectionModal}

          {/* question option modals */}
          {addQuestionModal}
          {updateQuestionModal}
          {deleteQuestionModal}

          {/* main display */}
          {fullSurveyDisplay}
        </>
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );
}

export default FullSurvey;
