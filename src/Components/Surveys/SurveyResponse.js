import React, { useState } from "react";
import {
  Breadcrumb,
  Card,
  ListGroup,
  Form,
  Button,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import ReactLoading from "react-loading";
import * as funcs from "../../shared/utility";
import MultipleChoiceRes from "../QuestionTypes/ResponseValidate/MultipleChoiceRes";
import RankingChoiceRes from "../QuestionTypes/ResponseValidate/RankingChoiceRes";
import TextRes from "../QuestionTypes/ResponseValidate/TextRes";
import RatingRes from "../QuestionTypes/ResponseValidate/RatingRes";

function SurveyResponse(props) {
  const {
    // mode,
    survey,
    onSubmitResponse,
  } = props;

  const [request, setRequest] = useState({
    validated: false,
    sResponse: {
      answerSections: survey.questionSections.reduce(
        (nSec, sec) => [
          ...nSec,
          {
            answers: sec.questions.reduce(
              (nAns, q) => [...nAns, { answerType: q.questionType }],
              []
            ),
          },
        ],
        []
      ),
    },
    updatedRankingLists: null,
    currentSecIndex: null,
    currentQIndex: null,
  });

  const validateSResponse = () => {
    let validated =
      request.sResponse.answerSections.length ===
      survey.questionSections.length;

    validated = survey.questionSections.reduce(
      (validSec, sec, index) =>
        validSec &&
        request.sResponse.answerSections[index].answers.length ===
          sec.questions.length &&
        sec.questions.reduce(
          (validAns, question, qIndex) =>
            validAns &&
            request.sResponse.answerSections[index].answers[qIndex]
              .answerType === question.questionType,
          true
        ),
      validated
    );

    return validated;

    // console.log("validated: " + validated);
  };

  if (!validateSResponse()) {
    setRequest({
      validated: false,
      sResponse: {
        answerSections: survey.questionSections.reduce(
          (nSec, sec) => [
            ...nSec,
            {
              answers: sec.questions.reduce(
                (nAns, q) => [...nAns, { answerType: q.questionType }],
                []
              ),
            },
          ],
          []
        ),
      },
      updatedRankingLists: null,
      currentSecIndex: null,
      currentQIndex: null,
    });
  }

  // console.log("validated: " + request.validated);
  // console.log(request.sResponse);

  // =================== functions ===================

  const updatedResponse = (secIndex, qIndex, answer, updatedRankingLists) => {
    const updatedAnswerSections = request.sResponse.answerSections.reduce(
      (nAnsSec, ansSec, index) => [
        ...nAnsSec,
        index === secIndex
          ? {
              answers: ansSec.answers.reduce(
                (nAns, ans, ansIndex) => [
                  ...nAns,
                  ansIndex === qIndex ? answer : ans,
                ],
                []
              ),
            }
          : ansSec,
      ],
      []
    );

    const updatedResponse = {
      answerSections: updatedAnswerSections,
    };

    setRequest({
      ...request,
      sResponse: updatedResponse,
      currentSecIndex: secIndex,
      currentQIndex: qIndex,
      updatedRankingLists: {
        ...request.updatedRankingLists,
        [`${secIndex}-${qIndex}`]: updatedRankingLists,
      },
    });
  };

  const getResponse = (secIndex, qIndex) => {
    const response = request.sResponse.answerSections
      .filter((_, index) => index === secIndex)[0]
      .answers.filter((_, index) => index === qIndex)[0];

    return response;
  };

  const validateSection = (index) => {
    const section = request.sResponse.answerSections[index];

    let totalAnsweredQuestion = 0;

    try {
      totalAnsweredQuestion = section.answers.reduce(
        (totalAnsQ, answer, answerIndex) => {
          switch (answer.answerType) {
            case "MULTIPLE_CHOICE":
              const totalSelections = answer.selections
                ? answer.selections.length
                : 0;
              const maxSelections =
                survey.questionSections[index].questions[answerIndex]
                  .maxSelections;
              const minSelections =
                survey.questionSections[index].questions[answerIndex]
                  .minSelections;

              if (
                (totalSelections > 0 &&
                  totalSelections >= minSelections &&
                  totalSelections <= maxSelections) ||
                (minSelections === 0 && maxSelections === 0)
              ) {
                totalAnsQ = totalAnsQ + 1;
              }
              break;
            case "RANKING":
              const totalSelectionRanks = answer.selectionRanks
                ? Object.entries(answer.selectionRanks).length
                : 0;
              const emptyRank = answer.selectionRanks
                ? Object.entries(answer.selectionRanks).filter(
                    (e) => e[0] === ""
                  ).length
                : 0;
              const totalRankingChoice =
                survey.questionSections[index].questions[answerIndex]
                  .rankingChoices.length;

              if (
                totalSelectionRanks === totalRankingChoice &&
                emptyRank === 0
              ) {
                totalAnsQ = totalAnsQ + 1;
              }
              break;
            case "RATING":
              const totalRatings = answer.rating ? 1 : 0;
              if (totalRatings > 0) {
                totalAnsQ = totalAnsQ + 1;
              }
              break;
            case "TEXT":
              totalAnsQ = totalAnsQ + 1;
              break;
            default:
              break;
          }
          return totalAnsQ;
        },
        totalAnsweredQuestion
      );
    } catch (error) {
      setRequest({
        ...request,
        sResponse: {
          answerSections: survey.questionSections.reduce(
            (nSec, sec) => [
              ...nSec,
              {
                answers: sec.questions.reduce(
                  (nAns, q) => [...nAns, { answerType: q.questionType }],
                  []
                ),
              },
            ],
            []
          ),
        },
      });
    }

    return totalAnsweredQuestion;
  };

  const validateResponse = () => {
    let isValid = true;

    isValid = request.sResponse.answerSections.reduce((valid, _, index) => {
      const totalQuestions = survey.questionSections[index].questions.length;
      const totalAnswers = validateSection(index);

      return valid && totalQuestions === totalAnswers;
    }, isValid);

    return isValid;
  };

  const handlerOnSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false || validateResponse() === false) {
      // console.log("error");
      event.preventDefault();
      event.stopPropagation();
      setRequest({ ...request, validated: true });
    } else {
      // console.log("submitting");
      onSubmitResponse(request.sResponse);
      event.preventDefault();
    }
  };

  // =================== components ===================

  const titleBar = (
    <Breadcrumb>
      <Breadcrumb.Item active>
        <Link to={"/"}>Open Surveys</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>
        <strong className="text-info">{survey.name}</strong>
      </Breadcrumb.Item>
    </Breadcrumb>
  );

  const description = <p>{survey.description}</p>;

  // eslint-disable-next-line no-lone-blocks
  {
    // const [inValidResAlert, setInValidResAlert] = useState(false);
    // const editStatus = validated && inValidResAlert && (
    //   <Alert variant="danger" className="p-0">
    //     Please select all required fields
    //   </Alert>
    // );
    // useEffect(() => {
    //   setInValidResAlert(true);
    // }, [validated]);
    // if (inValidResAlert) {
    //   setTimeout(() => setInValidResAlert(false), 5000);
    // }
  }

  const QuestionType = ({ secIndex, question }) => {
    let typeDisplay = null;

    switch (question.questionType) {
      case "MULTIPLE_CHOICE":
        typeDisplay = (
          <MultipleChoiceRes
            sectionIndex={secIndex}
            question={question}
            currentSelections={
              getResponse(secIndex, question.questionIndex).selections
            }
            updatedResponse={updatedResponse}
            validated={request.validated}
          ></MultipleChoiceRes>
        );
        break;
      case "TEXT": {
        typeDisplay = (
          <TextRes
            question={question}
            sectionIndex={secIndex}
            currentTextAnswer={
              getResponse(secIndex, question.questionIndex).text
            }
            currentSecIndex={request.currentSecIndex}
            currentQIndex={request.currentQIndex}
            updatedResponse={updatedResponse}
          />
        );
        break;
      }
      case "RATING": {
        typeDisplay = (
          <RatingRes
            sectionIndex={secIndex}
            question={question}
            currentRatingScale={
              getResponse(secIndex, question.questionIndex).rating
            }
            updatedResponse={updatedResponse}
            validated={request.validated}
          />
        );
        break;
      }
      case "RANKING":
        typeDisplay = (
          <RankingChoiceRes
            sectionIndex={secIndex}
            question={question}
            currentSelectionRanks={
              getResponse(secIndex, question.questionIndex).selectionRanks
            }
            updatedRankingLists={
              request.updatedRankingLists &&
              request.updatedRankingLists[
                `${secIndex}-${question.questionIndex}`
              ]
            }
            updatedResponse={updatedResponse}
            validated={request.validated}
          ></RankingChoiceRes>
        );
        break;
      default:
        break;
    }

    return typeDisplay;
  };

  const Questions = ({ secIndex, questions = [] }) => {
    return (
      <>
        <Card className="border-0">
          <ListGroup variant="flush">
            {questions.map((question, index) => (
              <ListGroup.Item className="p-0" key={index}>
                <Card.Header className="p-3 pl-4 pt-0 mt-0">
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
                </Card.Header>
                <Card.Body className="pb-1 pl-4">
                  <QuestionType
                    secIndex={secIndex}
                    qIndex={index}
                    question={question}
                  />
                </Card.Body>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </>
    );
  };

  const responseDisplay = (
    <>
      {description}

      <Form noValidate validated={request.validated} onSubmit={handlerOnSubmit}>
        <Card>
          <Card.Body className="p-0">
            {survey.questionSections.length === 1 ? (
              <Questions
                secIndex={0}
                questions={survey.questionSections[0].questions}
              />
            ) : (
              <Tabs
                defaultActiveKey={0}
                transition={false}
                id="noanim-tab-example"
                className="mb-3 ml-0 border-bottom"
              >
                {survey.questionSections.map((sec, index) => (
                  <Tab
                    eventKey={index}
                    title={
                      <span>
                        <span
                          className={
                            request.validated
                              ? validateSection(index) !== sec.questions.length
                                ? "text-danger"
                                : "text-success"
                              : ""
                          }
                        >
                          Section {index + 1}
                        </span>
                        - {validateSection(index)} / {sec.questions.length}
                      </span>
                    }
                    key={index}
                    className="p-0 m-0"
                  >
                    {sec.description}
                    <Questions secIndex={index} questions={sec.questions} />
                  </Tab>
                ))}
              </Tabs>
            )}
          </Card.Body>

          <Card.Footer className="">
            {/* {editStatus} */}
            <Button
              type="submit"
              variant={
                request.validated && !validateResponse() ? "danger" : "success"
              }
            >
              Submit survey
            </Button>
          </Card.Footer>
        </Card>
      </Form>
    </>
  );

  return (
    <>
      {titleBar}
      {!funcs.isEmpty(survey) ? (
        responseDisplay
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );
}

export default SurveyResponse;
