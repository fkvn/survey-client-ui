import React from "react";
import FormModal from "../../Modal/FormModal";
import { Form } from "react-bootstrap";

function DeleteSurveyForm(props) {
  const {
    show,
    onHide,

    heading = "Delete Survey",
    headingColor = "text-danger",
    submitTitle = "Delete",
    submitTitleVariant = "danger",
    size,

    survey,
    onDeleteSurveySubmit,
  } = props;

  const modal = (
    <FormModal
      show={show}
      onHide={onHide}
      onSubmit={() => onDeleteSurveySubmit(survey && survey.id)}
      heading={heading}
      headingColor={headingColor}
      submitTitle={submitTitle}
      submitTitleVariant={submitTitleVariant}
      size={size}
    >
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label className="">
          <strong>
            The survey{" "}
            <span className="text-danger">{survey && survey.name}</span> and all
            related sections as well as questions will be deleted permantely.
          </strong>
        </Form.Label>

        <Form.Check
          type="checkbox"
          id={`check-delete-survey`}
          isInvalid
          className="mt-3 text-info"
        >
          <Form.Check.Input type="checkbox" required />
          <Form.Check.Label>
            <strong>
              Please confirm that you would like to delete the survey
            </strong>
          </Form.Check.Label>
          <Form.Control.Feedback type="invalid">
            You have to check it to delete survey
          </Form.Control.Feedback>
        </Form.Check>
      </Form.Group>
    </FormModal>
  );
  return <>{modal} </>;
}

export default DeleteSurveyForm;
