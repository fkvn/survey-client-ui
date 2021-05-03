import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Nav, Row } from "react-bootstrap";
import * as funcs from "../../shared/utility";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import MultipleChoiceDisplay from "../QuestionTypes/DisplayQuestions/MultipleChoiceDisplay";
import RankingChoiceDisplay from "../QuestionTypes/DisplayQuestions/RankingChoiceDisplay";
import RatingDisplay from "../QuestionTypes/DisplayQuestions/RatingDisplay";
import TextDisplay from "../QuestionTypes/DisplayQuestions/TextDisplay";
import IconButton from "../CustomButton/IconButton";
import DeleteQuestionBuilder from "../../Containers/DashboardBuilder/QuestionBuilders/DeleteQuestionBuilder";
import UpdateQuestionBuilder from "../../Containers/DashboardBuilder/QuestionBuilders/UpdateQuestionBuilder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch } from "react-redux";
import * as actionCreators from "../../store/actionCreators/Surveys/index";
import CustomOverlayTrigger from "../CustomOverlayTrigger/CustomOverlayTrigger";

import * as exprt from "../../shared/export";

function Questions(props) {
  // ================================= init =========================
  const {
    surveyId = -1,
    section = exprt.db.initDb.SECTION_INIT,
    questions = [],
    activeQuestion = exprt.db.initDb.QUESTION_INIT,
    setActiveQuestion = () => {},
    readOnly = true,
  } = props;

  let refs = [];
  let isRender = true;
  const dispatch = useDispatch();

  const [request, setRequest] = useState({
    showUpdateQuestionModal: false,
    showDeleteQuestionModal: false,

    reqUpdateQuestionIndex: activeQuestion[`${exprt.props.QUESTION_INDEX}`],
  });

  // ================================= functions =========================

  const onDragStart = () => {
    // toggleAllRefsContent(refs, false);
  };

  const onDragEnd = (result) => {
    const { type, source, destination, draggableId } = result;

    if (!destination || !type) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === "question") {
      const sectionId = destination.droppableId;
      const questionId = draggableId;
      const oldIndex = source.index;
      const newIndex = destination.index;

      dispatch(
        actionCreators.updateQuestionIndex(
          surveyId,
          sectionId,
          questionId,
          oldIndex,
          newIndex
        )
      );

      // // updateRequest({ activeQuestion: newIndex });
      // updateQuestionAfterUpdated({ questionIndex: newIndex });

      // setActiveQuestion(questions[newIndex]);
    }
  };

  const initRefs = () => {
    for (let i = 0; i < questions.length; i++) {
      refs = [...refs, React.createRef()];
    }
  };

  const setRefBorderShadowGreen = (refs = [], refIndex = -1) => {
    try {
      const borderColor = "border-color: #28a745";
      const boxShadow = "box-shadow: 0 0 0 0.3rem rgba(40, 167, 69, 0.25)";

      const attrValue = `${borderColor};${boxShadow};`;

      refs.map((ref, i) => {
        if (ref.current) {
          if (i === refIndex) {
            ref.current.setAttribute("style", attrValue);

            ref.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });
          } else {
            ref.current.setAttribute("style", "");
          }
        }
        return null;
      });
    } catch (error) {}
  };

  const toggleAllRefsContent = (refs = [], bool = false) => {
    refs.map((ref, i) => {
      if (ref.current) {
        const content = ref.current.firstChild.childNodes[1];

        content.classList.toggle("show", bool);
      }
      return null;
    });
  };

  const toggelRefContent = (refs = [], refIndex = -1) => {
    if (refs[refIndex].current) {
      const content = refs[refIndex].current.firstChild.childNodes[1];

      content.classList.toggle("show");
    }
  };

  // ================================= logic flow =========================

  // focus Active Question
  useEffect(() => {
    if (
      activeQuestion[`${exprt.props.QUESTION_ID}`] > -1 &&
      activeQuestion[`${exprt.props.QUESTION_INDEX}`] > -1
    ) {
      setRefBorderShadowGreen(
        refs,
        activeQuestion[`${exprt.props.QUESTION_INDEX}`]
      );
    }
  });

  initRefs();

  toggleAllRefsContent(refs, true);

  if (
    surveyId > -1 &&
    section[`${exprt.props.SECTION_ID}`] > -1 &&
    section[`${exprt.props.SECTION_INDEX}`] > -1 &&
    questions.length > 0
  ) {
    isRender = true;
  }

  // ================================= hooks =========================

  // const [request, setRequest] = useState({
  //   defaultActiveQuestion: defaultActiveQuestion,
  //   activeQuestion: defaultActiveQuestion,

  //   showUpdateQuestionModal: false,
  //   showDeleteQuestionModal: false,
  // });

  // const dispatch = useDispatch();

  // let refs = [];

  // for (let i = 0; i < questions.length; i++) {
  //   refs = [...refs, React.createRef()];
  // }

  // const updateRequest = (updateAttributes) => {
  //   setRequest({ ...request, ...updateAttributes });
  // };

  // useEffect(() => {
  //   if (request.defaultActiveQuestion !== defaultActiveQuestion) {
  //     updateRequest({
  //       defaulActiveSection: defaultActiveQuestion,
  //       activeQuestion: defaultActiveQuestion,
  //     });
  //   }
  //   if (
  //     refs &&
  //     refs[request.activeQuestion] &&
  //     refs[request.activeQuestion].current
  //   ) {
  //     let ref = refs[request.activeQuestion];
  //     ref.current.setAttribute(
  //       "style",
  //       `  border-color: #28a745;
  //           box-shadow: 0 0 0 0.3rem rgba(40, 167, 69, 0.25);
  //       `
  //     );

  //     ref.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //       inline: "center",
  //     });
  //   }
  // });

  // // modals

  // const updateQuestionModal = request.showUpdateQuestionModal && (
  //   <UpdateQuestionBuilder
  //     show={true}
  //     onHide={() => updateRequest({ showUpdateQuestionModal: false })}
  //     surveyId={surveyId}
  //     section={section}
  //     question={questions[request.activeQuestion]}
  //     updateQuestion={updateQuestionAfterUpdated}
  //   ></UpdateQuestionBuilder>
  // );

  // const deleteQuestionModal = request.showDeleteQuestionModal && (
  //   <DeleteQuestionBuilder
  //     show={true}
  //     onHide={() => updateRequest({ showDeleteQuestionModal: false })}
  //     surveyId={surveyId}
  //     sectionId={section.id}
  //     question={questions[request.activeQuestion]}
  //     updateQuestion={updateQuestionAfterDeleted}
  //   ></DeleteQuestionBuilder>
  // );

  // //

  // const QuestionOptions = ({ question }) => {
  //   const editQuestionOption = {
  //     type: "Edit",
  //     title: "Edit Question",
  //     onClick: () =>
  //       updateRequest({
  //         activeQuestion: question.questionIndex,
  //         showUpdateQuestionModal: true,
  //       }),
  //   };
  //   const deleteQuestionOptions = {
  //     type: "Delete",
  //     title: "Delete Question",
  //     onClick: () =>
  //       updateRequest({
  //         activeQuestion: question.questionIndex,
  //         showDeleteQuestionModal: true,
  //       }),
  //   };

  //   // const moveQuestion = (
  //   //   <UpdateQuestionBuilder
  //   //     surveyId={surveyId}
  //   //     moveQuestion={true}
  //   //     question={question}
  //   //     section={section}
  //   //     updateQuestion={updateQuestionAfterUpdated}
  //   //   ></UpdateQuestionBuilder>
  //   // );

  //   let allowedOptions = [];

  //   allowedOptions = [{ ...editQuestionOption }, { ...deleteQuestionOptions }];

  //   return (
  //     <>
  //       {allowedOptions.map((op, i) => (
  //         <IconButton
  //           btnClassName="p-0 m-0 mb-2"
  //           type={op.type}
  //           title={op.title}
  //           onClickHandler={op.onClick}
  //           key={i}
  //           index={i}
  //           disabled={op.disabled}
  //         />
  //       ))}
  //       {/* {moveQuestion} */}
  //     </>
  //   );
  // };

  // const QuestionDisplayTypes = ({ question }) => {
  //   let typeDisplay = null;
  //   switch (question.questionType) {
  //     case "MULTIPLE_CHOICE":
  //       typeDisplay = <MultipleChoiceDisplay question={question} />;
  //       break;
  //     case "TEXT":
  //       typeDisplay = <TextDisplay textLength={question.textLength} />;
  //       break;
  //     case "RATING":
  //       typeDisplay = <RatingDisplay ratingScale={question.ratingScale} />;
  //       break;
  //     case "RANKING":
  //       typeDisplay = (
  //         <RankingChoiceDisplay rankingChoices={question.rankingChoices} />
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  //   return typeDisplay;
  // };

  // console.log(request.activeQuestion);

  // const onDragEnd = (result) => {
  //   console.log("question side result dnd");
  //   const { type, source, destination, draggableId } = result;

  //   if (!destination || !type) {
  //     return;
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }
  //   if (type === "question") {
  //     const sectionId = destination.droppableId;
  //     const questionId = draggableId;
  //     const oldIndex = source.index;
  //     const newIndex = destination.index;

  //     dispatch(
  //       actionCreators.updateQuestionIndex(
  //         surveyId,
  //         sectionId,
  //         questionId,
  //         oldIndex,
  //         newIndex
  //       )
  //     );

  //     // updateRequest({ activeQuestion: newIndex });
  //     updateQuestionAfterUpdated({ questionIndex: newIndex });
  //   }
  // };

  // const AccordionDisplay = ({ questions = [] }) => {
  //   return (
  //     <>
  //       <DragDropContext onDragEnd={onDragEnd}>
  //         {questions.length > 0 && (
  //           <Droppable droppableId={`${section.id}`} type="question">
  //             {(provided) => (
  //               <Row
  //                 className="m-3 mt-5"
  //                 {...provided.droppableProps}
  //                 ref={provided.innerRef}
  //               >
  //                 <Col xs={12} lg={2}>
  //                   <Accordion defaultActiveKey="0" className="sticky-top">
  //                     <Card className="border-0">
  //                       <Accordion.Toggle
  //                         as={Card.Header}
  //                         eventKey="0"
  //                         className="p-2 m-2 border-0 "
  //                       >
  //                         <strong> Questions List</strong>
  //                       </Accordion.Toggle>
  //                       <Accordion.Collapse eventKey="0">
  //                         <Card.Body className="m-0 p-0">
  //                           <Nav className="flex-column">
  //                             {questions.map((_, index) => (
  //                               <Nav.Link
  //                                 key={index}
  //                                 onClick={() => {
  //                                   refs.map((ref, i) => {
  //                                     if (ref.current) {
  //                                       if (i === index) {
  //                                         ref.current.setAttribute(
  //                                           "style",
  //                                           `  border-color: #28a745;
  //                                         box-shadow: 0 0 0 0.3rem rgba(40, 167, 69, 0.25);
  //                                     `
  //                                         );

  //                                         ref.current.scrollIntoView({
  //                                           behavior: "smooth",
  //                                           block: "center",
  //                                           inline: "center",
  //                                         });
  //                                       } else {
  //                                         ref.current.setAttribute("style", "");
  //                                       }
  //                                     }
  //                                     return null;
  //                                   });
  //                                 }}
  //                               >
  //                                 <strong>Question {index + 1}</strong>
  //                               </Nav.Link>
  //                             ))}
  //                           </Nav>
  //                           <Button
  //                             variant="info"
  //                             className="ml-3 mt-3  "
  //                             size="sm"
  //                             onClick={() => {
  //                               refs.map((ref, i) => {
  //                                 if (ref.current) {
  //                                   const content =
  //                                     ref.current.firstChild.childNodes[1];

  //                                   content.classList.toggle("show", true);
  //                                 }
  //                                 return null;
  //                               });
  //                             }}
  //                           >
  //                             Show all
  //                           </Button>
  //                           <Button
  //                             variant="secondary"
  //                             className="ml-3 mt-3  "
  //                             size="sm"
  //                             onClick={() => {
  //                               refs.map((ref, i) => {
  //                                 if (ref.current) {
  //                                   const content =
  //                                     ref.current.firstChild.childNodes[1];

  //                                   content.classList.toggle("show", false);
  //                                 }
  //                                 return null;
  //                               });
  //                             }}
  //                           >
  //                             Close all
  //                           </Button>
  //                         </Card.Body>
  //                       </Accordion.Collapse>
  //                     </Card>
  //                   </Accordion>
  //                 </Col>
  //                 <Col xs={12} lg={10}>
  //                   {questions.map((question, index) => (
  //                     <Draggable
  //                       draggableId={`${question.id}`}
  //                       index={index}
  //                       key={question.id}
  //                     >
  //                       {(provided) => (
  //                         <Accordion
  //                           defaultActiveKey={`${index}`}
  //                           ref={refs[index]}
  //                         >
  //                           <Card
  //                             className="mb-4 mt-2 border"
  //                             {...provided.draggableProps}
  //                             ref={provided.innerRef}
  //                           >
  //                             <Card.Header className="m-0 p-2">
  //                               <div
  //                                 {...provided.dragHandleProps}
  //                                 className="d-inline-block mr-2"
  //                               >
  //                                 <CustomOverlayTrigger
  //                                   unitKey={question.id}
  //                                   title="Select to move question"
  //                                 >
  //                                   <FontAwesomeIcon icon={["fas", "bars"]} />
  //                                 </CustomOverlayTrigger>
  //                               </div>

  //                               <div
  //                                 className="text-info d-inline-block"
  //                                 onClick={() => {
  //                                   refs.map((ref, i) => {
  //                                     if (ref.current) {
  //                                       if (i === index) {
  //                                         ref.current.setAttribute(
  //                                           "style",
  //                                           `  border-color: #28a745;
  //                                         box-shadow: 0 0 0 0.3rem rgba(40, 167, 69, 0.25);
  //                                     `
  //                                         );

  //                                         ref.current.scrollIntoView({
  //                                           behavior: "smooth",
  //                                           block: "center",
  //                                           inline: "center",
  //                                         });
  //                                       } else {
  //                                         ref.current.setAttribute("style", "");
  //                                       }
  //                                     }
  //                                     return null;
  //                                   });
  //                                 }}
  //                               >
  //                                 <strong> Question {index + 1}</strong>
  //                               </div>

  //                               <div className="d-inline-block float-right mb-0 pb-0">
  //                                 <QuestionOptions question={question} />
  //                                 {/* <Accordion.Toggle
  //                                   as={Card.Text}
  //                                   className="text-info d-inline-block"
  //                                   eventKey={`${index}`}
  //                                 >
  //                                   <IconButton
  //                                     btnClassName="p-0 m-0 mb-2"
  //                                     type="Toggle Expand"
  //                                     title="Toggle expand question"
  //                                   />
  //                                 </Accordion.Toggle> */}
  //                                 <span>
  //                                   <IconButton
  //                                     btnClassName="p-0 m-0 mb-2"
  //                                     onClickHandler={() => {
  //                                       if (refs[index].current) {
  //                                         const content =
  //                                           refs[index].current.firstChild
  //                                             .childNodes[1];

  //                                         content.classList.toggle("show");
  //                                       }
  //                                     }}
  //                                     type="Toggle Expand"
  //                                     title="Toggle expand question"
  //                                   />
  //                                 </span>
  //                               </div>
  //                             </Card.Header>
  //                             <Accordion.Collapse eventKey={`${index}`}>
  //                               <Card.Body className="m-0">
  //                                 <span
  //                                   dangerouslySetInnerHTML={{
  //                                     __html: funcs.updateQDescImgs(
  //                                       question.description,
  //                                       question.attachments
  //                                     ),
  //                                   }}
  //                                 />
  //                                 <hr />
  //                                 <QuestionDisplayTypes question={question} />
  //                               </Card.Body>
  //                             </Accordion.Collapse>
  //                           </Card>
  //                         </Accordion>
  //                       )}
  //                     </Draggable>
  //                   ))}
  //                 </Col>
  //                 {provided.placeholder}
  //               </Row>
  //             )}
  //           </Droppable>
  //         )}
  //       </DragDropContext>
  //     </>
  //   );
  // };

  // return (
  //   <>
  //     {updateQuestionModal}
  //     {deleteQuestionModal}
  //     {surveyId && section.id && !funcs.isEmpty(questions) && (
  //       // <MainDisplay questions={questions} />
  //       <AccordionDisplay questions={questions} />
  //       // <ArrDivDisplay questions={questions} />
  //     )}
  //   </>
  // );

  const updateQuestionModal = request.showUpdateQuestionModal && (
    <UpdateQuestionBuilder
      show={true}
      onHide={() => setRequest({ ...request, showUpdateQuestionModal: false })}
      surveyId={surveyId}
      section={section}
      question={questions[request.reqUpdateQuestionIndex]}
    ></UpdateQuestionBuilder>
  );

  const deleteQuestionModal = request.showDeleteQuestionModal && (
    <DeleteQuestionBuilder
      show={true}
      onHide={() => setRequest({ ...request, showDeleteQuestionModal: false })}
      surveyId={surveyId}
      section={section}
      question={questions[request.reqUpdateQuestionIndex]}
      // updateQuestion={updateQuestionAfterDeleted}
    ></DeleteQuestionBuilder>
  );

  const QuestionOptions = ({ question }) => {
    const editQuestionOption = {
      type: "Edit",
      title: "Edit Question",
      onClick: () =>
        setRequest({
          ...request,
          reqUpdateQuestionIndex: question[`${exprt.props.QUESTION_INDEX}`],
          showUpdateQuestionModal: true,
        }),
    };
    const deleteQuestionOptions = {
      type: "Delete",
      title: "Delete Question",
      onClick: () =>
        setRequest({
          ...request,
          reqUpdateQuestionIndex: question[`${exprt.props.QUESTION_INDEX}`],
          showDeleteQuestionModal: true,
        }),
    };

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
      </>
    );
  };

  const questionsNavVBar = (
    <Accordion defaultActiveKey="0" className="sticky-top pb-4">
      <Card className="border-0">
        <Accordion.Toggle
          as={Card.Header}
          eventKey="0"
          className="p-2 m-2 border-0 "
        >
          <strong> Questions List</strong>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="m-0 p-0">
            <Nav className="flex-column">
              {questions.map((question, index) => (
                <Nav.Link
                  key={index}
                  onClick={() => {
                    setRefBorderShadowGreen(refs, index);
                    setActiveQuestion(question);
                  }}
                >
                  <strong>Question {index + 1} </strong>
                </Nav.Link>
              ))}
            </Nav>
            <Button
              variant="info"
              className="ml-3 mt-3  "
              size="sm"
              onClick={() => toggleAllRefsContent(refs, true)}
            >
              Show all
            </Button>
            <Button
              variant="secondary"
              className="ml-3 mt-3  "
              size="sm"
              onClick={() => toggleAllRefsContent(refs, false)}
            >
              Close all
            </Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );

  const QuestionDisplayTypes = ({ question }) => {
    let typeDisplay = null;
    switch (question.questionType) {
      case "MULTIPLE_CHOICE":
        typeDisplay = <MultipleChoiceDisplay question={question} />;
        break;
      case "TEXT":
        typeDisplay = (
          <TextDisplay textLength={question[`${exprt.props.TXT_LENGTH}`]} />
        );
        break;
      case "RATING":
        typeDisplay = (
          <RatingDisplay ratingScale={question[`${exprt.props.RT_SCALE}`]} />
        );
        break;
      case "RANKING":
        typeDisplay = (
          <RankingChoiceDisplay
            rankingChoices={question[`${exprt.props.RK_ANSWERS}`]}
          />
        );
        break;
      default:
        break;
    }
    return typeDisplay;
  };

  const draggableIcon = (
    <CustomOverlayTrigger title="Select to move question">
      <FontAwesomeIcon icon={["fas", "bars"]} />
    </CustomOverlayTrigger>
  );

  const questionsList = (
    <Droppable
      droppableId={`${section[`${exprt.props.SECTION_ID}`]}`}
      type="question"
    >
      {(provided) => (
        <Row
          className="px-3"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <Col xs={12}>
            {questions.map((question, index) => (
              <Draggable
                draggableId={`${question[`${exprt.props.QUESTION_ID}`]}`}
                index={index}
                key={question[`${exprt.props.QUESTION_ID}`]}
              >
                {(provided) => (
                  <Accordion defaultActiveKey={`${index}`} ref={refs[index]}>
                    <Card
                      className="mb-4 mt-2 border"
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <Card.Header className="m-0 p-2">
                        {/* draggable icon */}

                        <div
                          {...provided.dragHandleProps}
                          className="d-inline-block mr-2"
                        >
                          {!readOnly && draggableIcon}
                        </div>

                        <div
                          className="text-info d-inline-block"
                          onClick={() => {
                            setRefBorderShadowGreen(refs, index);
                            setActiveQuestion(question);
                          }}
                        >
                          <strong> Question {index + 1}</strong>
                        </div>

                        <div className="d-inline-block float-right mb-0 pb-0">
                          {!readOnly && <QuestionOptions question={question} />}
                          <span>
                            <IconButton
                              btnClassName="p-0 m-0 mb-2"
                              onClickHandler={() =>
                                toggelRefContent(refs, index)
                              }
                              type="Toggle Expand"
                              title="Toggle expand question"
                            />
                          </span>
                        </div>
                      </Card.Header>
                      <Accordion.Collapse eventKey={`${index}`}>
                        <Card.Body className="m-0">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: funcs.updateQDescImgs(
                                question.description,
                                question.attachments
                              ),
                            }}
                          />
                          <hr />
                          <QuestionDisplayTypes question={question} />
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                )}
              </Draggable>
            ))}
          </Col>
          {provided.placeholder}
        </Row>
      )}
    </Droppable>
  );

  const questionsRender = (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Row className="mb-5">
        <Col xs={12} lg={2}>
          {questionsNavVBar}
        </Col>
        <Col xs={12} lg={10}>
          {questionsList}
        </Col>
      </Row>
    </DragDropContext>
  );

  const returnRender = (
    <>
      {!readOnly && (
        <>
          {updateQuestionModal}
          {deleteQuestionModal}
        </>
      )}
      {questionsRender}
    </>
  );

  return isRender && returnRender;
}

export default Questions;
