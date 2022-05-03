import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import AddSectionForm from "../../../Components/Form/SectionForm/AddSectionForm";

import * as exprt from "../../../shared/export";

function CreateSectionBuilder(props) {
  // ============================ init =======================
  const { surveyId = -1, show = false, onHide = () => {} } = props;

  const dispatch = useDispatch();

  let isRender = false;

  // ============================ functions =======================

  const handlerAddSectionSubmit = (newSection) => {
    dispatch(actionCreators.addSection(surveyId, newSection));
  };

  const initError = (message) => {
    dispatch(actionCreators.initError(message, exprt.props.VALIDATION_ERROR));
  };

  // ============================ hooks =======================

  useEffect(() => {
    if (surveyId < 0) {
      const message = "Couldn't find survey information!!!";
      initError(message);
    }
  });

  // ============================ logic flow =======================

  if (show && surveyId > -1) {
    isRender = true;
  }

  const addSectionModal = (
    <AddSectionForm
      show={show}
      onHide={onHide}
      onAddSectionSubmit={handlerAddSectionSubmit}
      heading="Add Section"
    ></AddSectionForm>
  );

  const returnRender = <>{isRender && addSectionModal} </>;

  return returnRender;
}

export default CreateSectionBuilder;
