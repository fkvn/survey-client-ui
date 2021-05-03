import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import ReactLoading from "react-loading";
import FullSurvey from "../../../Components/Surveys/FullSurvey";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import * as exprt from "../../../shared/export";

function EditSurveyBuilder() {
  // ================================= init =========================

  const params = new URLSearchParams(useLocation().search);
  const sId = Number(params.get("sId"));

  const dispatch = useDispatch();

  const fullSurvey = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_FULL_SURVEY}`]
  );

  const loading = useRef(true);
  let isEditable = true;
  let isRender = false;

  // ================================= functions =========================

  const initFullSurvey = (id) => {
    setTimeout(() => dispatch(actionCreators.initFullSurvey(id)), 100);
  };

  const initError = (message) => {
    dispatch(actionCreators.initError(message, exprt.props.VALIDATION_ERROR));
  };

  // ================================= hooks =========================
  useEffect(() => {
    if (loading.current) {
      console.log("initFUllSurvey");
      initFullSurvey(sId);
      loading.current = false;
    }
  });

  // unavailable to update
  useEffect(() => {
    if (!isEditable) {
      let message =
        "The survey is either not available to edit or has been deleted!";

      if (Number(fullSurvey[`${exprt.props.SURVEY_ID}`]) !== Number(sId)) {
        message = "Unavailable survey !!!";
      }

      initError(message);
    }
  }, [fullSurvey]);

  // ================================= logic flow =========================

  // check if survey is allowed to edit
  if (
    fullSurvey[`${exprt.props.IS_FETCHED}`] &&
    (!fullSurvey[`${exprt.props.SURVEY_IS_CLOSED}`] ||
      fullSurvey[`${exprt.props.SURVEY_PUBLISHED_DATE}`] ||
      Number(fullSurvey[`${exprt.props.SURVEY_ID}`]) !== Number(sId))
  ) {
    isEditable = false;
  }

  // check if the component is able to render
  if (
    !loading.current &&
    isEditable &&
    fullSurvey[`${exprt.props.IS_FETCHED}`] &&
    Number(fullSurvey[`${exprt.props.SURVEY_ID}`]) === Number(sId)
  ) {
    isRender = true;
  }

  const returnRender = (
    <>
      <div className="m-5">
        {isRender ? (
          <FullSurvey survey={fullSurvey} readOnly={false} />
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );

  return <> {returnRender} </>;
}

export default EditSurveyBuilder;
