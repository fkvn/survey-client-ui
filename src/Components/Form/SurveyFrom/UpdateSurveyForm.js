import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

import * as exprt from "../../../shared/export";

function UpdateSurveyForm(props) {
  // ============================ init =======================
  const {
    show = false,
    onHide = () => {},

    survey = exprt.db.initDb.FULL_SURVEY_INIT,
    updateSurvey = () => {},

    size = "md",
  } = props;

  const titleLabel = "Edit Survey";
  const closeLabel = "Close";
  const submitLabel = "Submit";

  const [validated, setValidated] = useState(false);

  const sNameRef = useRef(survey[`${exprt.props.SURVEY_NAME}`]);
  const sDescRef = useRef(survey[`${exprt.props.SURVEY_DESCRIPTION}`]);

  let isRender = false;

  // ============================ hooks =======================
  useEffect(() => {
    if (sNameRef.current) {
      sNameRef.current.focus();
    }
  });

  // ============================ fucntions =======================

  const handlerOnSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      const updatedFields = {
        [`${exprt.props.SURVEY_NAME}`]: sNameRef.current.value,
        [`${exprt.props.SURVEY_DESCRIPTION}`]: sDescRef.current.value,
      };

      updateSurvey(updatedFields);

      onHide();
    }

    setValidated(true);
  };

  // ============================ logic flow =======================
  if (show && survey[`${exprt.props.SURVEY_ID}`] > -1) {
    isRender = true;
  }

  // ============================ sub-components =======================

  const sNameField = (
    <Form.Group as={Row} controlId="formPlaintextEmail">
      <Form.Label column sm="2">
        <strong>Name</strong>
      </Form.Label>
      <Col sm="10">
        <Form.Control
          type="text"
          ref={sNameRef}
          defaultValue={survey[`${exprt.props.SURVEY_NAME}`]}
          required
          autoFocus
        />
        <Form.Control.Feedback type="invalid">
          Name cannot be empty!
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );

  const sDescField = (
    <Form.Group as={Row} controlId="formPlaintextPassword">
      <Form.Label column sm="2">
        <strong>Description</strong>
      </Form.Label>

      <Col sm="10">
        <Form.Control
          as="textarea"
          ref={sDescRef}
          defaultValue={survey[`${exprt.props.SURVEY_DESCRIPTION}`]}
          placeholder={
            survey[`${exprt.props.SURVEY_DESCRIPTION}`]
              ? ""
              : "Enter description"
          }
        />
      </Col>
    </Form.Group>
  );

  const formControls = (
    <>
      {sNameField}
      {sDescField}
    </>
  );

  const modal = (
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
        <Modal.Body>{formControls}</Modal.Body>

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

  return isRender && modal;
}

export default UpdateSurveyForm;
