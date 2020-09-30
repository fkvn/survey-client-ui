import React from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import ESectionDescForm from "../../../Components/Form/SectionForm/ESectionDescForm";

function UpdateSectionBuilder(props) {
  const { surveyId, section, show, onHide } = props;
  const dispatch = useDispatch();

  const handlerUpdateSectionSubmit = (updatedSection) => {
    dispatch(
      actionCreators.updateSection(surveyId, section.id, updatedSection)
    ).then(() => onHide());
  };

  const updateSectionModal = (
    <ESectionDescForm
      show={show}
      onHide={onHide}
      heading={`Edit Section ${section.sectionIndex + 1}`}
      section={section}
      onUpdateSectionSubmit={handlerUpdateSectionSubmit}
    />
  );

  return <>{surveyId && section && show && updateSectionModal} </>;
}

export default UpdateSectionBuilder;
