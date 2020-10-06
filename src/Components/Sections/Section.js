import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import Questions from "../Questions/Questions";
import * as funcs from "../../shared/utility";

function Section(props) {
  const {
    surveyId,
    section = {},
    activeQuestion,
    addQuestionShow,
    updateQuestionAfterDeleted,
    updateQuestionAfterUpdated,
  } = props;

  const DisplayDescription = ({ description }) => {
    return (
      <Card.Text className="ml-2 mb-3">
        {description && <strong>Description: </strong>}
        <em>{description}</em>
      </Card.Text>
    );
  };

  const MainDisplay = ({ sec, activeQuestion }) => (
    <>
      <DisplayDescription description={sec.description}></DisplayDescription>
      {sec.questions.length > 0 && (
        <Questions
          surveyId={surveyId}
          section={section}
          questions={sec.questions}
          defaultActiveQuestion={activeQuestion}
          updateQuestionAfterDeleted={updateQuestionAfterDeleted}
          updateQuestionAfterUpdated={updateQuestionAfterUpdated}
        />
      )}
      <Form.Group className="">
        <Button variant="success" onClick={addQuestionShow}>
          Add Question
        </Button>
      </Form.Group>
    </>
  );

  return (
    <>
      {surveyId && !funcs.isEmpty(section) && (
        <MainDisplay sec={section} activeQuestion={activeQuestion} />
      )}
    </>
  );
}

export default Section;
