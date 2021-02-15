import React, { useRef } from "react";
import FormModal from "../../Modal/FormModal";
import { Form } from "react-bootstrap";

import * as exprInit from "../../../export/exportInit";

function AddSectionForm(props) {
  const {
    show,
    onHide,
    heading = "Add Section",
    headingColor = "text-success",
    closeTitle,
    closeTitleVariant,
    submitTitle,
    submitTitleVariant,
    size,

    onAddSectionSubmit,
  } = props;

  const descRef = useRef("");

  const handlerOnSubmit = () => {
    const newSection = {
      [`${exprInit.serVarInit.SECTION_DESCRIPTION}`]: descRef.current.value,
    };

    onAddSectionSubmit(newSection);
  };

  const modal = (
    <FormModal
      show={show}
      onHide={onHide}
      onSubmit={handlerOnSubmit}
      heading={heading}
      headingColor={headingColor}
      closeTitle={closeTitle}
      closeTitleVariant={closeTitleVariant}
      submitTitle={submitTitle}
      submitTitleVariant={submitTitleVariant}
      size={size}
    >
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          ref={descRef}
          placeholder={"Enter description"}
        />
      </Form.Group>
    </FormModal>
  );
  return <>{modal} </>;
}

export default AddSectionForm;
