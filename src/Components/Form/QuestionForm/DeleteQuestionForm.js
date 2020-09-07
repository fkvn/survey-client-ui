import React from "react";
import { Form } from "react-bootstrap";
import FormModal from "../../Modal/FormModal";
import MultipleChoiceDisplay from "../../QuestionTypes/DisplayQuestions/MultipleChoiceDisplay";
import * as funcs from "../../../shared/utility";

function DeleteQuestionForm(props) {
  const {
    show,
    onHide,

    heading = "Delete Question",
    headingColor = "text-danger",
    submitTitle = "Delete",
    submitTitleVariant = "danger",

    sectionId,
    question,
    onDeleteQuestionSubmit,
  } = props;

  const handlerOnSubmit = () => {
    onDeleteQuestionSubmit(sectionId, question.id);
  };

  const modal = (
    <FormModal
      show={show}
      onHide={onHide}
      onSubmit={handlerOnSubmit}
      heading={heading}
      headingColor={headingColor}
      submitTitle={submitTitle}
      submitTitleVariant={submitTitleVariant}
    >
      <Form.Group controlId="deleteSectionForm">
        <Form.Label className="text-danger">
          <strong>
            <small>The following question will be deleted permantely.</small>
          </strong>
        </Form.Label>
        <br />
        <Form.Label>
          <strong> Question {question.questionIndex + 1}: </strong>
          <span
            dangerouslySetInnerHTML={{
              __html: funcs.updateQDescImgs(
                question.description,
                question.attachments
              ),
            }}
          />
        </Form.Label>
        {question.questionType === "MULTIPLE_CHOICE" && (
          <MultipleChoiceDisplay question={question} />
        )}

        <Form.Check
          type="checkbox"
          id={`check-delete-survey`}
          isInvalid
          className="mt-3 text-info"
        >
          <Form.Check.Input type="checkbox" required />
          <Form.Check.Label>
            <strong>
              Please confirm that you would like to delete Question
              {` ${question.questionIndex + 1}`}
            </strong>
          </Form.Check.Label>
          <Form.Control.Feedback type="invalid">
            You have to check it to delete question {question.questionIndex + 1}
          </Form.Control.Feedback>
        </Form.Check>
      </Form.Group>
    </FormModal>
  );
  return <>{modal} </>;
}

export default DeleteQuestionForm;
