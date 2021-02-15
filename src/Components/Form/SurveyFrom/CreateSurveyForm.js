import React, { useRef } from "react";
import FormModal from "../../Modal/FormModal";
import { Form } from "react-bootstrap";

import * as exprInit from "../../../export/exportInit";

function CreateSurveyForm(props) {
  const {
    show,
    onHide,
    heading = "Create Survey",
    submitTitle = "Create",
    submitTitleVariant = "success",

    onCreateSurveySubmit,
  } = props;

  const sName = useRef();
  const sNameFGroup = (
    <Form.Group controlId="SurveyName.ControlText">
      <Form.Label className="text-info">
        <strong>Name</strong>
      </Form.Label>
      <Form.Control
        required
        ref={sName}
        type="text"
        placeholder="Survey name"
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        Required survey name
      </Form.Control.Feedback>
    </Form.Group>
  );

  const sType = useRef();
  const types = ["Anonymous", "Named", "Recorded"];
  const sTypeFGroup = (
    <Form.Group controlId="SurveyType.ControlSelect">
      <Form.Label className="text-info">
        <strong>Type</strong>
      </Form.Label>
      <Form.Control as="select" ref={sType} className="text-primary">
        {types.map((e, index) => (
          <option key={index}>{e}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );

  const sDescription = useRef();
  const sDescriptionFGroup = (
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label className="text-info">
        <strong>Description</strong>
      </Form.Label>
      <Form.Control
        ref={sDescription}
        as="textarea"
        rows="3"
        placeholder="Survey description"
      />
    </Form.Group>
  );

  const sSection = useRef(1);
  const sSectionFGroup = (
    <Form.Group controlId="SurveyName.ControlText">
      <Form.Label className="text-info">
        <strong>Total sections</strong>
      </Form.Label>
      <Form.Control
        required
        ref={sSection}
        type="number"
        min="1"
        max="20"
        defaultValue={1}
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        The total sections is between 1 and 20.
      </Form.Control.Feedback>
    </Form.Group>
  );

  const handlerOnSubmit = () => {
    const newSurvey = {
      [`${exprInit.serVarInit.SURVEY_NAME}`]: sName.current.value,
      [`${exprInit.serVarInit.SURVEY_TYPE}`]: sType.current.value.toUpperCase(),
      [`${exprInit.serVarInit.SURVEY_DESCRIPTION}`]: sDescription.current.value,
      [`${exprInit.serVarInit.SURVEY_SECTION_COUNT}`]: Number(
        sSection.current.value
      ),
    };
    onCreateSurveySubmit(newSurvey);
  };
  const modal = (
    <>
      <FormModal
        show={show}
        onHide={onHide}
        heading={heading}
        submitTitle={submitTitle}
        submitTitleVariant={submitTitleVariant}
        onSubmit={handlerOnSubmit}
      >
        {sNameFGroup}
        {sTypeFGroup}
        {sDescriptionFGroup}
        {sSectionFGroup}
      </FormModal>
    </>
  );

  return <>{modal} </>;
}

export default CreateSurveyForm;
