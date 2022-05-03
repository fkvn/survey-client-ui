import React from "react";
import { Form } from "react-bootstrap";
import FormModal from "../../Modal/FormModal";

import * as exprt from "../../../shared/export";

function DeleteSectionForm(props) {
  // ============================ init =======================

  const {
    show = false,
    onHide = () => {},

    heading = "Delete Section",
    headingColor = "text-danger",
    submitTitle = "Delete",
    submitTitleVariant = "danger",

    section = exprt.db.initDb.SECTION_INIT,
    deleteSection = () => {},
  } = props;

  let isRender = false;

  // ============================ functions =======================

  const handlerOnSubmit = () => {
    deleteSection();
    onHide();
  };

  // ============================ logic flow =======================
  if (
    section[`${exprt.props.SECTION_ID}`] > -1 &&
    section[`${exprt.props.SECTION_INDEX}`] > -1
  ) {
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
    >
      <Form.Group controlId="deleteSectionForm">
        <Form.Label>
          <strong>
            The section and all related questions will be deleted permantely.
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
              Please confirm that you would like to delete SECTION
              {` ${section[`${exprt.props.SECTION_INDEX}`] + 1}`}
            </strong>
          </Form.Check.Label>
          <Form.Control.Feedback type="invalid">
            You have to check it to delete section{" "}
            {section[`${exprt.props.SECTION_INDEX}`] + 1}
          </Form.Control.Feedback>
        </Form.Check>
      </Form.Group>
    </FormModal>
  );

  return isRender && modal;
}

export default DeleteSectionForm;
