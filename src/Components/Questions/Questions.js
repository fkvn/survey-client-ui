import React, { useEffect, useState } from "react";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import * as funcs from "../../shared/utility";
import { Droppable, Draggable } from "react-beautiful-dnd";

import MultipleChoiceDisplay from "../QuestionTypes/DisplayQuestions/MultipleChoiceDisplay";
import RankingChoiceDisplay from "../QuestionTypes/DisplayQuestions/RankingChoiceDisplay";
import RatingDisplay from "../QuestionTypes/DisplayQuestions/RatingDisplay";
import TextDisplay from "../QuestionTypes/DisplayQuestions/TextDisplay";
import IconButton from "../CustomButton/IconButton";
import DeleteQuestionBuilder from "../../Containers/DashboardBuilder/UpdateQuestionBuilder/DeleteQuestionBuilder";
import UpdateQuestionBuilder from "../../Containers/DashboardBuilder/UpdateQuestionBuilder/UpdateQuestionBuilder";

function Questions(props) {
  const {
    surveyId,
    section = {},
    questions = [],
    defaultActiveQuestion = 0,
    updateQuestionAfterDeleted,
    updateQuestionAfterUpdated,
  } = props;

  const [request, setRequest] = useState({
    defaultActiveQuestion: defaultActiveQuestion,
    activeQuestion: defaultActiveQuestion,

    showUpdateQuestionModal: false,
    showDeleteQuestionModal: false,
  });

  const updateRequest = (updateAttributes) => {
    setRequest({ ...request, ...updateAttributes });
  };

  useEffect(() => {
    if (request.defaultActiveQuestion !== defaultActiveQuestion) {
      updateRequest({
        defaulActiveSection: defaultActiveQuestion,
        activeQuestion: defaultActiveQuestion,
      });
    }
  });

  // modals

  const updateQuestionModal = request.showUpdateQuestionModal && (
    <UpdateQuestionBuilder
      show={true}
      onHide={() => updateRequest({ showUpdateQuestionModal: false })}
      surveyId={surveyId}
      section={section}
      question={questions[request.activeQuestion]}
      updateQuestion={updateQuestionAfterUpdated}
    ></UpdateQuestionBuilder>
  );

  const deleteQuestionModal = request.showDeleteQuestionModal && (
    <DeleteQuestionBuilder
      show={true}
      onHide={() => updateRequest({ showDeleteQuestionModal: false })}
      surveyId={surveyId}
      sectionId={section.id}
      question={questions[request.activeQuestion]}
      updateQuestion={updateQuestionAfterDeleted}
    ></DeleteQuestionBuilder>
  );

  //

  const QuestionOptions = ({ question }) => {
    const editQuestionOption = {
      type: "Edit",
      title: "Edit Question",
      onClick: () =>
        updateRequest({
          activeQuestion: question.questionIndex,
          showUpdateQuestionModal: true,
        }),
    };
    const deleteQuestionOptions = {
      type: "Delete",
      title: "Delete Question",
      onClick: () =>
        updateRequest({
          activeQuestion: question.questionIndex,
          showDeleteQuestionModal: true,
        }),
    };

    const moveQuestion = (
      <UpdateQuestionBuilder
        surveyId={surveyId}
        moveQuestion={true}
        question={question}
        section={section}
        updateQuestion={updateQuestionAfterUpdated}
      ></UpdateQuestionBuilder>
    );

    let allowedOptions = [];

    allowedOptions = [{ ...editQuestionOption }, { ...deleteQuestionOptions }];

    return (
      <>
        {allowedOptions.map((op, i) => (
          <IconButton
            btnClassName="p-0 m-0 mb-2"
            type={op.type}
            title={op.title}
            onClickHandler={op.onClick}
            key={i}
            index={i}
            disabled={op.disabled}
          />
        ))}
        {moveQuestion}
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

  const MainDisplay = ({ questions }) => (
    <>
      <Tab.Container
        id="all-questions-tab"
        activeKey={
          request.activeQuestion && request.activeQuestion < questions.length
            ? request.activeQuestion
            : 0
        }
      >
        <Droppable droppableId={`${section.id}`} type="question">
          {(provided) => (
            <Row
              className=" bg-light rounded p-2 m-2 mb-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Col xs={12} xl={3}>
                <Nav variant="pills" className="flex-column">
                  {questions.map(
                    (question, index) =>
                      question && (
                        <Draggable
                          draggableId={`${question.id}`}
                          index={index}
                          key={question.id}
                        >
                          {(provided) => (
                            <Nav.Item
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              key={index}
                            >
                              <Nav.Link
                                eventKey={index}
                                {...provided.dragHandleProps}
                                className="p-0 m-0"
                              >
                                <div
                                  className="d-inline-block h-100 p-2 m-0"
                                  onClick={() =>
                                    updateRequest({
                                      activeQuestion: index,
                                      aaaa: true,
                                    })
                                  }
                                >
                                  Question {index + 1}
                                </div>
                                <span className="float-right p-2">
                                  <QuestionOptions question={question} />
                                </span>
                              </Nav.Link>
                            </Nav.Item>
                          )}
                        </Draggable>
                      )
                  )}
                </Nav>
              </Col>
              <Col xs={12} xl={9}>
                <Tab.Content>
                  {questions.map(
                    (question, index) =>
                      question && (
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
                      )
                  )}
                </Tab.Content>
              </Col>
              {provided.placeholder}
            </Row>
          )}
        </Droppable>
      </Tab.Container>{" "}
    </>
  );

  return (
    <>
      {updateQuestionModal}
      {deleteQuestionModal}
      {surveyId && section.id && !funcs.isEmpty(questions) && (
        <MainDisplay questions={questions} />
      )}
    </>
  );
}

export default Questions;
