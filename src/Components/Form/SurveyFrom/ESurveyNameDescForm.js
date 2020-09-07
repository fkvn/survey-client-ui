import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

function ESurveyNameDescModal(props) {
  const {
    show = "false",
    onHide,
    size = "md",
    onSubmitHanlder,
    sName = "",
    sDesc = "",
  } = props;

  const titleLabel = "Edit Survey";
  const closeLabel = "Close";
  const submitLabel = "Submit";

  const [validated, setValidated] = useState(false);

  const sNameRef = useRef(sName);
  const sDescRef = useRef(sDesc);

  useEffect(() => {
    sNameRef.current.focus();
  });

  const bodyChildren = (
    <>
      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          <strong>Name</strong>
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            ref={sNameRef}
            defaultValue={sName}
            required
          />
          <Form.Control.Feedback type="invalid">
            Name cannot be empty!
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          <strong>Description</strong>
        </Form.Label>

        <Col sm="10">
          <Form.Control
            as="textarea"
            ref={sDescRef}
            defaultValue={sDesc}
            placeholder={sDesc ? "" : "Enter description"}
          />
        </Col>
      </Form.Group>
    </>
  );

  const handlerOnSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      const updatedSurvey = {
        name: sNameRef.current.value,
        description: sDescRef.current.value,
      };

      onSubmitHanlder(updatedSurvey);

      onHide();
    }

    setValidated(true);
  };

  const FormModal = (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size={size}
      backdrop="static"
      keyboard={false}
    >
      <Form noValidate validated={validated} onSubmit={handlerOnSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="center-modal" className="text-primary">
            {titleLabel}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyChildren}</Modal.Body>

        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            {closeLabel}
          </Button>
          <Button type="submit" variant="success">
            {submitLabel}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );

  return <> {FormModal} </>;
}

export default ESurveyNameDescModal;
