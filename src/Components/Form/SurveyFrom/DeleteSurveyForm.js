import React from "react";
import FormModal from "../../Modal/FormModal";
import { Form } from "react-bootstrap";
import * as exprt from "../../../shared/export";

function DeleteSurveyForm(props) {
  // ============================ init =======================
  const {
    show = false,
    onHide = () => {},

    heading = "Delete Survey",
    headingColor = "text-danger",
    submitTitle = "Delete",
    submitTitleVariant = "danger",
    size,

    survey = exprt.db.initDb.FULL_SURVEY_INIT,
    deleteSurvey = () => {},
  } = props;

  let isRender = false;

  // ============================ functions=======================
  const handlerOnSubmit = () => {
    deleteSurvey(survey[`${exprt.props.SURVEY_ID}`]);
    onHide();
  };

  // ============================ logic flow =======================
  if (show && survey[`${exprt.props.SURVEY_ID}`] > -1) {
    isRender = true;
  }

  // ============================ sub-components =======================
  const modal = (
    <FormModal
      show={show}
      onHide={onHide}
      onSubmit={handlerOnSubmit}
      heading={heading}
      headingColor={headingColor}
      submitTitle={submitTitle}
      submitTitleVariant={submitTitleVariant}
      size={size}
    >
      <Form.Group controlId="ControlInput1">
        <Form.Label className="">
          <strong>
            The survey{" "}
            <span className="text-danger">
              {survey[`${exprt.props.SURVEY_NAME}`]}
            </span>{" "}
            and all related sections as well as questions will be deleted
            permantely.
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

  return isRender && modal;
}

export default DeleteSurveyForm;
