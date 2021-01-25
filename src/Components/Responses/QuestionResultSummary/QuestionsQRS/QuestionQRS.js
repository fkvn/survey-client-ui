import React from "react";
import { Alert, Card, Col, Row } from "react-bootstrap";

import * as funcs from "../../../../shared/utility";
import MultiChoiceQRS from "./QuestionQRSTypes/MultiChoiceQRS";
import RankingQRS from "./QuestionQRSTypes/RankingQRS";
import RatingQRS from "./QuestionQRSTypes/RatingQRS";
import TextQRS from "./QuestionQRSTypes/TextQRS";

function QuestionQRS(props) {
  const { question = {}, questionQRS = {} } = props;

  const isValidatedComponent = question && questionQRS;

  const QuestionQRSType = ({ question = {}, questionQRS = {} }) => {
    let displayQuestionQRSType = null;

    switch (question.questionType) {
      case "MULTIPLE_CHOICE":
        displayQuestionQRSType = (
          <MultiChoiceQRS question={question} questionQRS={questionQRS} />
        );

        break;
      case "RANKING":
        displayQuestionQRSType = (
          <RankingQRS question={question} questionQRS={questionQRS} />
        );

        break;
      case "RATING":
        displayQuestionQRSType = (
          <RatingQRS question={question} questionQRS={questionQRS} />
        );

        break;
      case "TEXT":
        displayQuestionQRSType = (
          <TextQRS question={question} questionQRS={questionQRS} />
        );

        break;
      default:
        break;
    }

    return displayQuestionQRSType;
  };

  const MainDisplay = ({ question = {}, questionQRS = {} }) => {
    return (
      <>
        <Card className="my-4">
          <Card.Header className="text-primary m-0 p-2 px-3">
            <strong>Question {question.questionIndex + 1}</strong>
          </Card.Header>
          <Card.Body className="m-0 p-0">
            <Row className="m-0 p-0">
              <Col xs={12} lg={4} className="border-right border-light">
                <div
                  className="m-2"
                  dangerouslySetInnerHTML={{
                    __html: funcs.updateQDescImgs(
                      question.description,
                      question.attachments
                    ),
                  }}
                />
              </Col>
              <Col xs={12} lg={8} className="m-lg-0 p-lg-0 bg-light">
                {questionQRS && question.id === questionQRS.question ? (
                  <QuestionQRSType
                    question={question}
                    questionQRS={questionQRS}
                  />
                ) : (
                  <Alert className="m-3" variant="danger">
                    No available result summary !!!
                  </Alert>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>{" "}
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

export default QuestionQRS;
