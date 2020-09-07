import React from "react";
import { Form } from "react-bootstrap";
import FormModal from "../../Modal/FormModal";

function DeleteSectionForm(props) {
  const {
    show,
    onHide,

    heading = "Delete Section",
    headingColor = "text-danger",
    submitTitle = "Delete",
    submitTitleVariant = "danger",

    section,
    onDeleteSectionSubmit,
  } = props;

  const handlerOnSubmit = () => {
    onDeleteSectionSubmit(section.id);
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
              {` ${section.sectionIndex + 1}`}
            </strong>
          </Form.Check.Label>
          <Form.Control.Feedback type="invalid">
            You have to check it to delete section {section.sectionIndex + 1}
          </Form.Control.Feedback>
        </Form.Check>
      </Form.Group>
    </FormModal>
  );
  return <>{modal} </>;
}

export default DeleteSectionForm;
