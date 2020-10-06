import React from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import * as funcs from "../../../shared/utility";
import DeleteSectionForm from "../../../Components/Form/SectionForm/DeleteSectionForm";

function DeleteSectionBuilder(props) {
  const { surveyId, section = {}, show, onHide, updateSection } = props;
  const dispatch = useDispatch();

  console.log("delete section ....");
  console.log(section);

  const handlerDeleteSectionSubmit = (sectionId) => {
    if (Number(sectionId) === Number(section.id)) {
      dispatch(actionCreators.deleteSection(surveyId, sectionId)).then(() =>
        updateSection()
      );
    }
  };

  const deleteSectionModal = (
    <DeleteSectionForm
      show={show}
      onHide={onHide}
      heading={`Delete Section ${section.sectionIndex + 1} `}
      section={section}
      onDeleteSectionSubmit={handlerDeleteSectionSubmit}
    />
  );

  return <>{surveyId && !funcs.isEmpty(section) && deleteSectionModal} </>;
}

export default DeleteSectionBuilder;
