import React, { useRef } from "react";
import FormModal from "../../Modal/FormModal";
import { Form } from "react-bootstrap";

import * as exprt from "../../../shared/export";

function UpdateSectionForm(props) {
  // ============================ init =======================

  const {
    show = false,
    onHide = () => {},

    heading = "Edit Section",
    size = "md",

    section = exprt.db.initDb.SECTION_INIT,
    updateSection = () => {},
  } = props;

  const descRef = useRef(section[`${exprt.props.SECTION_DESCRIPTION}`]);

  let isRender = false;

  // ============================ functions =======================

  const handlerOnSubmit = () => {
    const updatedFields = {
      [`${exprt.props.SECTION_DESCRIPTION}`]: descRef.current.value,
    };

    updateSection(updatedFields);
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
          defaultValue={section[`${exprt.props.SECTION_DESCRIPTION}`]}
          placeholder={
            section[`${exprt.props.SECTION_DESCRIPTION}`]
              ? ""
              : "Enter description"
          }
        />
      </Form.Group>
    </FormModal>
  );

  return isRender && modal;
}

export default UpdateSectionForm;
