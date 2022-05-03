import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function FormModal(props) {
  const {
    show,
    onHide,
    heading,
    closeTitle = "Close",
    submitTitle = "Submit",
    onSubmit,
    onStatic = true,
    size = "md",
    headingColor = "text-primary",
    closeTitleVariant = "secondary",
    submitTitleVariant = "success",
  } = props;

  const [validated, setValidated] = useState(false);

  const handlerOnSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      setValidated(true);
      event.stopPropagation();
    } else {
      onSubmit();
      event.preventDefault();
      // onHide();
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={onStatic ? "static" : ""}
      keyboard={onStatic ? false : true}
      size={size}
    >
      <Form noValidate validated={validated} onSubmit={handlerOnSubmit}>
        {/* <Form> */}
        {heading && (
          <Modal.Header closeButton className="py-2">
            <Modal.Title
              id="contained-modal-title-vcenter"
              className={headingColor}
            >
              {heading}
            </Modal.Title>
          </Modal.Header>
        )}
        {props.children && <Modal.Body>{props.children}</Modal.Body>}
        <Modal.Footer>
          <Button onClick={onHide} variant={closeTitleVariant}>
            {closeTitle}
          </Button>
          {onSubmit && (
            <Button type="submit" variant={submitTitleVariant}>
              {submitTitle}
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default FormModal;
