import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as funcs from "../../../shared/utility";
import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import UpdateSurveyForm from "../../../Components/Form/SurveyFrom/UpdateSurveyForm";
import AlertDismissible from "../../../Components/Alert/AlertDismissible";

import * as exprt from "../../../shared/export";

function UpdateSurveyBuilder(props) {
  // ========================== init ==============================

  const {
    survey = exprt.db.initDb.FULL_SURVEY_INIT,
    show = true,
    onHide = () => {},
  } = props;

  const dispatch = useDispatch();

  console.log(survey);

  let isRender = false;

  // ========================== functions ==============================

  const updateSurvey = (updatedFields) => {
    dispatch(actionCreators.updateSurvey(survey, updatedFields));
  };

  // ============================ logic flow =======================
  if (show && survey[`${exprt.props.SURVEY_ID}`] > -1) {
    isRender = true;
  }

  // ========================== sub-components ==============================

  const eSurveyNameDescModal = (
    <UpdateSurveyForm
      show={show}
      onHide={onHide}
      size="lg"
      survey={survey}
      sName={survey[`${exprt.props.SURVEY_NAME}`]}
      sDesc={survey[`${exprt.props.SURVEY_DESCRIPTION}`]}
      updateSurvey={updateSurvey}
    ></UpdateSurveyForm>
  );

  const returnRender = isRender && eSurveyNameDescModal;

  return returnRender;
}

export default UpdateSurveyBuilder;
