import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import FormModal from "../../Modal/FormModal";

import * as funcs from "../../../shared/utility";
import MultipleChoiceDisplay from "../../QuestionTypes/DisplayQuestions/MultipleChoiceDisplay";
import TextDisplay from "../../QuestionTypes/DisplayQuestions/TextDisplay";
import RatingDisplay from "../../QuestionTypes/DisplayQuestions/RatingDisplay";
import RankingChoiceDisplay from "../../QuestionTypes/DisplayQuestions/RankingChoiceDisplay";

function AddNewResGroupForm(props) {
  console.log("AddNewResGroup form");

  // const survey = {
  //   id: 1,
  //   name: "Testing response",
  //   type: "ANONYMOUS",
  //   description: "",
  //   createdDate: "2020-10-06 09:22:23",
  //   publishDate: "2020-10-06 13:47:57",
  //   closeDate: "2020-10-06 10:21:59",
  //   closed: false,
  //   numberOfSections: 1,
  //   questionSections: [
  //     {
  //       id: 2,
  //       description: "",
  //       questions: [
  //         {
  //           questionType: "MULTIPLE_CHOICE",
  //           id: 4,
  //           description:
  //             '<p>Multiple choice with image</p>\n<div style="text-align:left;"><img src="blob:http://localhost:3000/5b19e353-d4bd-4b2d-8cc7-dc598c6f2fa5" alt="" style="height: 120px;width: 100px" attachmentindex="0"></div>\n<p></p>\n',
  //           attachments: ["http://localhost:8080/api/files/3"],
  //           choices: ["1", "2", "3", "4"],
  //           minSelections: 1,
  //           maxSelections: 1,
  //           questionIndex: 0,
  //         },
  //         {
  //           questionType: "MULTIPLE_CHOICE",
  //           id: 5,
  //           description: "<p>Multiple choice without image</p>\n",
  //           attachments: [],
  //           choices: ["no img 1", "no img 2", "no img 3"],
  //           minSelections: 1,
  //           maxSelections: 1,
  //           questionIndex: 1,
  //         },
  //         {
  //           questionType: "MULTIPLE_CHOICE",
  //           id: 6,
  //           description:
  //             "<p>Multiple choice with restrictions min = 1, max = 3</p>\n",
  //           attachments: [],
  //           choices: ["1", "2", "3"],
  //           minSelections: 1,
  //           maxSelections: 3,
  //           questionIndex: 2,
  //         },
  //         {
  //           questionType: "MULTIPLE_CHOICE",
  //           id: 7,
  //           description:
  //             "<p><strong>Multiple choice with restrictions min = 1, max = 2</strong></p>\n",
  //           attachments: [],
  //           choices: ["1", "2", "3"],
  //           minSelections: 1,
  //           maxSelections: 2,
  //           questionIndex: 3,
  //         },
  //         {
  //           questionType: "MULTIPLE_CHOICE",
  //           id: 8,
  //           description:
  //             "<p><strong>Multiple choice with restrictions min = 2, max = 3</strong></p>\n",
  //           attachments: [],
  //           choices: ["1", "2", "3", "4"],
  //           minSelections: 2,
  //           maxSelections: 3,
  //           questionIndex: 4,
  //         },
  //         {
  //           questionType: "RANKING",
  //           id: 9,
  //           description: "<p>Ranking without duplicate answer</p>\n",
  //           attachments: [],
  //           rankingChoices: ["r1", "r2", "r3"],
  //           questionIndex: 5,
  //         },
  //         {
  //           questionType: "RANKING",
  //           id: 10,
  //           description: "<p>Ranking with duplicate answer</p>\n",
  //           attachments: [],
  //           rankingChoices: ["r1", "r2", "r1", "r3", "r2"],
  //           questionIndex: 6,
  //         },
  //         {
  //           questionType: "RATING",
  //           id: 11,
  //           description: "<p>Rating question</p>\n",
  //           attachments: [],
  //           ratingScale: 7,
  //           questionIndex: 7,
  //         },
  //         {
  //           questionType: "TEXT",
  //           id: 12,
  //           description: "<p>Texting without limit length</p>\n",
  //           attachments: [],
  //           textLength: -1,
  //           attachmentAllowed: false,
  //           questionIndex: 8,
  //         },
  //         {
  //           questionType: "TEXT",
  //           id: 13,
  //           description: "<p>Texting with limit length</p>\n",
  //           attachments: [],
  //           textLength: 7,
  //           attachmentAllowed: false,
  //           questionIndex: 9,
  //         },
  //       ],
  //       sectionIndex: 0,
  //     },
  //   ],
  //   numberOfResponses: 10,
  // };

  // const responses = [
  //   {
  //     id: 192,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2012-12-01 15:46:18",
  //     isDeleted: false,
  //     totalResposeGroups: 1,
  //   },
  //   {
  //     id: 204,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2015-12-01 15:47:13",
  //     isDeleted: false,
  //     totalResposeGroups: 1,
  //   },
  //   {
  //     id: 216,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2020-12-01 15:47:43",
  //     isDeleted: false,
  //     totalResposeGroups: 2,
  //   },
  //   {
  //     id: 228,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2012-12-01 15:48:31",
  //     isDeleted: false,
  //     totalResposeGroups: 1,
  //   },
  //   {
  //     id: 240,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2020-12-01 15:49:09",
  //     isDeleted: false,
  //     totalResposeGroups: 2,
  //   },
  //   {
  //     id: 252,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2020-12-01 15:49:37",
  //     isDeleted: false,
  //     totalResposeGroups: 2,
  //   },
  //   {
  //     id: 264,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2022-12-01 15:50:12",
  //     isDeleted: false,
  //     totalResposeGroups: 1,
  //   },
  //   {
  //     id: 276,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2020-12-01 15:50:43",
  //     isDeleted: false,
  //     totalResposeGroups: 3,
  //   },
  //   {
  //     id: 288,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2022-12-01 15:51:12",
  //     isDeleted: false,
  //     totalResposeGroups: 3,
  //   },
  //   {
  //     id: 300,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2020-12-01 15:51:47",
  //     isDeleted: false,
  //     totalResposeGroups: 2,
  //   },
  //   {
  //     id: 344,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2020-12-04 00:15:37",
  //     isDeleted: false,
  //     totalResposeGroups: 0,
  //   },
  //   {
  //     id: 356,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2020-12-04 00:16:09",
  //     isDeleted: false,
  //     totalResposeGroups: 0,
  //   },
  //   {
  //     id: 368,
  //     survey: 1,
  //     type: "ANONYMOUS",
  //     date: "2020-12-04 00:16:41",
  //     isDeleted: false,
  //     totalResposeGroups: 0,
  //   },
  // ];

  const {
    survey = {},
    responses = [],
    show = false,
    onHide = () => {},
    addResGroup = () => {},
  } = props;

  const heading = "New Response Group";
  const headingColor = "text-success";
  const submitTitle = "Add";
  const submitTitleVariant = "success";
  const GroupTypeValues = ["NAME", "RESPONSE", "YEAR"];

  const [request, setRequest] = useState({
    groupType: GroupTypeValues[0],
    showQuestionDetailsModal: false,

    selectedSection:
      survey.questionSections && survey.questionSections.length > 0 ? 0 : null,
    selectedQuestion:
      survey.questionSections &&
      survey.questionSections.length > 0 &&
      survey.questionSections[0].questions &&
      survey.questionSections[0].questions.length > 0
        ? 0
        : null,

    respondantAnswer: {},
    autoCreateYear: false,
  });

  const handlerOnSubmit = () => {
    const [autoYear, resGroup] = getSubmitAnswer();
    addResGroup(autoYear, resGroup);
    onHide();
  };

  useEffect(() => {
    groupNamedRef.current.focus();
  });

  const groupNamedRef = useRef();
  const groupNameField = (
    <Form.Group as={Row} controlId="groupNameField">
      <Form.Label column sm="2">
        Name
      </Form.Label>
      <Col sm="10">
        <Form.Control
          required
          focus="true"
          placeholder="Group Name"
          ref={groupNamedRef}
        />
      </Col>
    </Form.Group>
  );

  const groupTypeField = (
    <Form.Group as={Row} controlId="formPlaintextEmail">
      <Form.Label column sm="2">
        Group Type
      </Form.Label>
      <Col sm="10">
        <Form.Control
          as="select"
          className="text-info"
          onChange={(event) => {
            const typeIndex = event.target.value;
            setRequest({ ...request, groupType: GroupTypeValues[typeIndex] });
          }}
        >
          {GroupTypeValues.map((type, i) => (
            <option key={i} value={i}>
              {type}
            </option>
          ))}
        </Form.Control>
      </Col>
    </Form.Group>
  );

  const getSubmitAnswer = () => {
    const resGroup = {};

    resGroup.name = groupNamedRef.current.value;
    resGroup.groupType = request.groupType;

    if (request.autoCreateYear) {
      resGroup.groupBy = "surveyId;year";
    } else {
      switch (request.groupType) {
        case "NAME":
          {
            resGroup.groupBy = "surveyId;name";
            resGroup.groupedValue = `${survey.id};${groupNamedRef.current.value}`;
            resGroup.responses = getGivenResponses();
          }
          break;
        case "RESPONSE":
          {
            const question =
              survey.questionSections[request.selectedSection].questions[
                request.selectedQuestion
              ];

            switch (question.questionType) {
              case "MULTIPLE_CHOICE":
                {
                  resGroup.groupBy =
                    "surveyId;questionId;mulChoiceSelectionIndex";
                  resGroup.groupedValue = `${survey.id};${question.id};${request.respondantAnswer.mulChoiceSelectionIndex}`;
                }
                break;
              case "RANKING":
                {
                  resGroup.groupBy = "surveyId;questionId;rank;rankChoiceIndex";
                  resGroup.groupedValue = `${survey.id};${question.id};${request.respondantAnswer.rank};${request.respondantAnswer.rankChoiceIndex}`;
                }
                break;
              case "RATING":
                {
                  resGroup.groupBy = "surveyId;questionId;rating";
                  resGroup.groupedValue = `${survey.id};${question.id};${request.respondantAnswer.rating}`;
                }
                break;
              case "TEXT":
                {
                  resGroup.groupBy = "surveyId;questionId;textAnswerType";
                  resGroup.groupedValue = `${survey.id};${question.id};${request.respondantAnswer.textAnswerType}`;
                }
                break;
              default:
                break;
            }

            resGroup.responses = [];
          }
          break;
        case "YEAR":
          {
            resGroup.groupBy = "surveyId;year";
            resGroup.groupedValue = `${survey.id};${request.respondantAnswer.year}`;
            resGroup.responses = [];
          }
          break;
        default:
          break;
      }
    }

    return [request.autoCreateYear, resGroup];
  };

  const getGivenResponses = () => {
    // console.log(givenResponsesRef.current);
    if (givenResponsesRef.current) {
      const options = givenResponsesRef.current.options
        ? givenResponsesRef.current.options
        : [];

      let givenResponses = [];

      for (let i = 0; i < options.length; i++) {
        const op = options[i];
        if (op.selected) {
          givenResponses = [...givenResponses, op.value];
        }
      }
      return givenResponses;
    }
    return [];
  };
  const givenResponsesRef = useRef();
  const OptionFields = ({ groupType }) => {
    let fields = <> </>;

    switch (groupType) {
      case "NAME":
        fields = (
          <Form.Group as={Row} controlId="customSelectResponses">
            <Form.Label column sm="2">
              Responses
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                multiple
                ref={givenResponsesRef}
                htmlSize="10"
              >
                {responses.map((res, i) => (
                  <option
                    key={i}
                    value={res.id}
                    className={`${
                      res.totalResposeGroups === 0 && "text-danger"
                    }`}
                  >
                    {i + 1}. {res.type} ({res.date})
                    {res.totalResposeGroups === 0 && " (Non-group)"}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
        );
        break;
      case "RESPONSE":
        {
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
                typeDisplay = (
                  <RatingDisplay ratingScale={question.ratingScale} />
                );
                break;
              case "RANKING":
                typeDisplay = (
                  <RankingChoiceDisplay
                    rankingChoices={question.rankingChoices}
                  />
                );
                break;
              default:
                break;
            }
            return typeDisplay;
          };

          const sections = survey.questionSections
            ? survey.questionSections
            : [];

          const section =
            sections.length > 0 &&
            request.selectedSection >= 0 &&
            request.selectedSection < sections.length
              ? sections[request.selectedSection]
              : {};

          const questions =
            section && section.questions ? section.questions : [];

          const question =
            questions.length > 0 &&
            request.selectedQuestion >= 0 &&
            request.selectedQuestion < questions.length
              ? questions[request.selectedQuestion]
              : {};

          const DisplayQuestionTypeFiels = ({ question }) => {
            let questionTypeFields = <> </>;

            switch (question.questionType) {
              case "MULTIPLE_CHOICE":
                {
                  const questionChoices = question.choices
                    ? question.choices
                    : [];

                  if (questionChoices.length > 0) {
                    questionTypeFields = questionChoices.map((choice, i) => (
                      <Form.Check
                        key={i}
                        type="radio"
                        name="mulChoice"
                        label={choice}
                        required
                        checked={
                          Number(i) ===
                          Number(
                            request.respondantAnswer.mulChoiceSelectionIndex
                          )
                            ? true
                            : false
                        }
                        onChange={(event) => {
                          setRequest({
                            ...request,
                            respondantAnswer: {
                              ...request.respondantAnswer,
                              mulChoiceSelectionIndex: event.target.value,
                            },
                          });
                        }}
                        value={i}
                      />
                    ));
                  }
                }
                break;
              case "RANKING":
                {
                  const choices = question.rankingChoices
                    ? question.rankingChoices
                    : [];

                  if (choices.length > 0) {
                    const defaultChoice =
                      choices[Number(request.respondantAnswer.rankChoiceIndex)];
                    console.log(defaultChoice);

                    questionTypeFields = (
                      <>
                        <Form.Row>
                          <Form.Group as={Col} controlId="choice">
                            <Form.Label>Choice</Form.Label>
                            <Form.Control
                              as="select"
                              required
                              onChange={(event) => {
                                setRequest({
                                  ...request,
                                  respondantAnswer: {
                                    ...request.respondantAnswer,
                                    rankChoiceIndex: event.target.value,
                                  },
                                });
                              }}
                              defaultValue={
                                request.respondantAnswer.rankChoiceIndex
                              }
                            >
                              <option value="">Choose...</option>
                              {choices.map((choice, i) => (
                                <option key={i} value={i}>
                                  {choice}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>

                          <Form.Group as={Col} controlId="rank">
                            <Form.Label>Rank</Form.Label>
                            <Form.Control
                              as="select"
                              required
                              onChange={(event) => {
                                setRequest({
                                  ...request,
                                  respondantAnswer: {
                                    ...request.respondantAnswer,
                                    rank: event.target.value,
                                  },
                                });
                              }}
                              defaultValue={request.respondantAnswer.rank}
                            >
                              <option value="">Choose...</option>
                              {choices.map((_, i) => (
                                <option key={i} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Form.Row>
                      </>
                    );
                  }
                }

                break;
              case "RATING":
                {
                  const ratingScale = question.ratingScale
                    ? question.ratingScale
                    : -1;

                  if (ratingScale) {
                    questionTypeFields = (
                      <Form.Group as={Col} controlId="rating">
                        <Form.Label>Rate</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          onChange={(event) => {
                            setRequest({
                              ...request,
                              respondantAnswer: {
                                ...request.respondantAnswer,
                                rating: event.target.value,
                              },
                            });
                          }}
                          defaultValue={request.respondantAnswer.rating}
                        >
                          <option value="">Choose...</option>
                          {Array(ratingScale)
                            .fill()
                            .map((choice, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                        </Form.Control>
                      </Form.Group>
                    );
                  }
                }
                break;
              case "TEXT":
                {
                  const textTypes = ["answered", "skipped"];
                  questionTypeFields = (
                    <Form.Group as={Col} controlId="rating">
                      <Form.Label>Answer type</Form.Label>
                      <Form.Control
                        as="select"
                        required
                        onChange={(event) => {
                          setRequest({
                            ...request,
                            respondantAnswer: {
                              ...request.respondantAnswer,
                              textAnswerType: event.target.value,
                            },
                          });
                        }}
                        defaultValue={request.respondantAnswer.textAnswerType}
                      >
                        <option value="">Choose...</option>
                        {textTypes.map((type, i) => (
                          <option key={i} value={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  );
                }
                break;

              default:
                break;
            }

            return questionTypeFields;
          };

          fields = (
            <>
              <Form.Group as={Row} controlId="Section">
                <Form.Label column sm="2">
                  Section
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="select"
                    onChange={(event) =>
                      setRequest({
                        ...request,
                        selectedSection: event.target.value,
                      })
                    }
                    defaultValue={request.selectedSection}
                  >
                    {sections.map((_, i) => (
                      <option key={i} value={i}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="Question">
                <Form.Label column sm="2">
                  Question
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="select"
                    onChange={(event) =>
                      setRequest({
                        ...request,
                        selectedQuestion: event.target.value,
                        respondantAnswer: {},
                      })
                    }
                    defaultValue={request.selectedQuestion}
                  >
                    {questions.map((_, i) => (
                      <option key={i} value={i}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              {!funcs.isEmpty(question) ? (
                !request.showQuestionDetailsModal ? (
                  <Form.Group as={Row} controlId="Question">
                    <Form.Label column sm="2"></Form.Label>
                    <Col sm="10">
                      <Button
                        variant="link"
                        onClick={() =>
                          setRequest({
                            ...request,
                            showQuestionDetailsModal: true,
                          })
                        }
                      >
                        Show Question{" "}
                        {request.groupType === "QUESTION" && "Details"}
                        {request.groupType === "RESPONSE" && "Description"}!
                      </Button>
                    </Col>
                  </Form.Group>
                ) : (
                  <Form.Group as={Row} controlId="QuestionDetails">
                    <Form.Label column sm="2"></Form.Label>
                    <Col sm="10">
                      <Card
                        style={{ maxHeight: "10rem" }}
                        className="overflow-auto"
                      >
                        <Card.Body>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: funcs.updateQDescImgs(
                                question.description,
                                question.attachments
                              ),
                            }}
                          />
                          <hr />
                          {request.groupType === "QUESTION" && (
                            <QuestionDisplayTypes question={question} />
                          )}
                        </Card.Body>
                      </Card>
                      <Button
                        variant="link"
                        onClick={() =>
                          setRequest({
                            ...request,
                            showQuestionDetailsModal: false,
                          })
                        }
                      >
                        Close Details!
                      </Button>
                    </Col>
                  </Form.Group>
                )
              ) : (
                <> </>
              )}
              {request.groupType === "RESPONSE" && !funcs.isEmpty(question) && (
                <Form.Group as={Row} controlId="Section">
                  <Form.Label column sm="2">
                    Respondant's selection
                  </Form.Label>

                  <Col sm="10">
                    <DisplayQuestionTypeFiels question={question} />
                  </Col>
                </Form.Group>
              )}
            </>
          );
        }
        break;
      case "YEAR":
        {
          const years = responses
            .reduce((years, res) => {
              const year = Number(res.date.split(" ")[0].split("-")[0]);
              return years.includes(year) ? [...years] : [...years, year];
            }, [])
            .sort();

          fields = (
            <>
              <Form.Group as={Row} controlId="autoCreateYears">
                <Form.Label column sm="2"></Form.Label>

                <Col sm="10">
                  <Form.Check
                    type="checkbox"
                    label="Auto Create"
                    checked={request.autoCreateYear}
                    onChange={() =>
                      setRequest({
                        ...request,
                        autoCreateYear: !request.autoCreateYear,
                      })
                    }
                  />
                </Col>
              </Form.Group>
              {!request.autoCreateYear && (
                <Form.Group as={Row} controlId="autoCreateYears">
                  <Form.Label column sm="2">
                    YEAR
                  </Form.Label>

                  <Col sm="10">
                    <Form.Control
                      as="select"
                      required
                      onChange={(event) => {
                        setRequest({
                          ...request,
                          respondantAnswer: {
                            ...request.respondantAnswer,
                            year: event.target.value,
                          },
                        });
                      }}
                      defaultValue={request.respondantAnswer.year}
                    >
                      <option value="">Choose...</option>
                      {years.map((year, i) => (
                        <option key={i} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
              )}
            </>
          );
        }
        break;
      default:
        break;
    }
    return fields;
  };

  const modal = (
    <>
      <FormModal
        show={show}
        onHide={onHide}
        heading={heading}
        headingColor={headingColor}
        submitTitle={submitTitle}
        submitTitleVariant={submitTitleVariant}
        onSubmit={handlerOnSubmit}
        size="lg"
      >
        {groupNameField}
        {groupTypeField}
        <OptionFields groupType={request.groupType} />
      </FormModal>
    </>
  );

  return <>{modal}</>;
}

export default AddNewResGroupForm;
