import React from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import * as funcs from "../../../shared/utility";
import DeleteSectionForm from "../../../Components/Form/SectionForm/DeleteSectionForm";

import * as exprt from "../../../shared/export";

function DeleteSectionBuilder(props) {
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
  const deleteSection = () => {
    dispatch(
      actionCreators.deleteSection(
        surveyId,
        section[`${exprt.props.SECTION_ID}`]
      )
    );
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

  const deleteSectionModal = (
    <DeleteSectionForm
      show={show}
      onHide={onHide}
      heading={`Delete Section ${section[`${exprt.props.SECTION_INDEX}`] + 1} `}
      section={section}
      deleteSection={deleteSection}
    />
  );

  const returnRender = isRender && deleteSectionModal;

  return returnRender;
}

export default DeleteSectionBuilder;
