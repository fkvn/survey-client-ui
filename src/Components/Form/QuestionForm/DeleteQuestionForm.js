import React from "react";
import { Form } from "react-bootstrap";
import FormModal from "../../Modal/FormModal";
import * as funcs from "../../../shared/utility";

import * as exprt from "../../../shared/export";

function DeleteQuestionForm(props) {
  const {
    show = false,
    onHide = () => {},

    heading = "Delete Question",
    headingColor = "text-danger",
    submitTitle = "Delete",
    submitTitleVariant = "danger",

    question = exprt.db.initDb.QUESTION_INIT,
    deleteQuestion = () => {},
  } = props;

  const handlerOnSubmit = () => {
    deleteQuestion();
    onHide();
  };

  let isRender = false;

  if (
    question[`${exprt.props.QUESTION_ID}`] > -1 &&
    question[`${exprt.props.QUESTION_INDEX}`] > -1
  ) {
    isRender = true;
  }

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
        <Form.Label className="w-100">
          <strong>
            {" "}
            Question {question[`${exprt.props.QUESTION_INDEX}`] + 1}
          </strong>
          <hr className="p-1 m-1"></hr>
        </Form.Label>
        <span
          dangerouslySetInnerHTML={{
            __html: funcs.updateQDescImgs(
              question[`${exprt.props.QUESTION_DESCRIPTION}`],
              question[`${exprt.props.QUESTION_ATTACHMENTS}`]
            ),
          }}
        />

        {/* {question.questionType === "MULTIPLE_CHOICE" && (
          <MultipleChoiceDisplay question={question} />
        )} */}

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
              {` ${question[`${exprt.props.QUESTION_INDEX}`] + 1}`}
            </strong>
          </Form.Check.Label>
          <Form.Control.Feedback type="invalid">
            You have to check it to delete question{" "}
            {question[`${exprt.props.QUESTION_INDEX}`] + 1}
          </Form.Control.Feedback>
        </Form.Check>
      </Form.Group>
    </FormModal>
  );
  return isRender && modal;
}

export default DeleteQuestionForm;
