import React, { useRef } from "react";
import FormModal from "../../Modal/FormModal";
import { Form } from "react-bootstrap";

function ESectionDescForm(props) {
  const {
    show,
    onHide,

    heading,
    size,

    section,
    onUpdateSectionSubmit,
  } = props;

  const descRef = useRef(section.description);

  const handlerOnSubmit = () => {
    const updatedSection = {
      description: descRef.current.value,
    };
    onUpdateSectionSubmit(updatedSection);
  };

  const modal = (
    <FormModal
      show={show}
      onHide={onHide}
      heading={heading}
      size={size}
      onSubmit={handlerOnSubmit}
    >
      <Form.Group>
        <Form.Label>Description </Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          ref={descRef}
          defaultValue={section.description}
          placeholder={section.description ? "" : "Enter description"}
        />
      </Form.Group>
    </FormModal>
  );

  return <> {modal} </>;
}

export default ESectionDescForm;
