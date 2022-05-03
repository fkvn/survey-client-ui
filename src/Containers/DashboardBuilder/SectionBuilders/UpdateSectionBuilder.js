import React from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import UpdateSectionForm from "../../../Components/Form/SectionForm/UpdateSectionForm";

import * as exprt from "../../../shared/export";

function UpdateSectionBuilder(props) {
  // ============================ init =======================
  const {
    surveyId = -1,
    section = exprt.db.initDb.SECTION_INIT,
    show = false,
    onHide = () => {},
  } = props;

  const dispatch = useDispatch();

  let isRender = false;

  // ============================ functions =======================

  const updateSection = (updatedFields) => {
    dispatch(actionCreators.updateSection(surveyId, section, updatedFields));
  };

  // ============================ logic flow =======================

  if (
    show &&
    surveyId > -1 &&
    section[`${exprt.props.SECTION_ID}`] > -1 &&
    section[`${exprt.props.SECTION_INDEX}`] > -1
  ) {
    isRender = true;
  }

  // ============================ sub-components =======================
  const updateSectionModal = (
    <UpdateSectionForm
      show={show}
      onHide={onHide}
      heading={`Edit Section ${section[`${exprt.props.SECTION_INDEX}`] + 1}`}
      section={section}
      updateSection={updateSection}
    />
  );

  const returnRender = isRender && updateSectionModal;

  return returnRender;
}

export default UpdateSectionBuilder;
