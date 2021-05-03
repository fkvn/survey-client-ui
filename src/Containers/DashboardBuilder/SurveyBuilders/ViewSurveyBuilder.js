import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

import FullSurvey from "../../../Components/Surveys/FullSurvey";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import * as exprt from "../../../shared/export";

function ViewSurveyBuilder() {
  // ================================= init =========================
  const params = new URLSearchParams(useLocation().search);
  const sId = Number(params.get("sId"));

  const dispatch = useDispatch();

  const fullSurvey = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_FULL_SURVEY}`]
  );

  const loading = useRef(true);
  let isRender = false;

  // ================================= functions =========================

  const initFullSurvey = (id) => {
    setTimeout(() => dispatch(actionCreators.initFullSurvey(id)), 100);
  };

  // ================================= hooks =========================
  useEffect(() => {
    if (loading.current) {
      initFullSurvey(sId);
      loading.current = false;
    }
  });

  // ================================= logic flow =========================

  // check if the component is able to render
  if (
    !loading.current &&
    fullSurvey[`${exprt.props.IS_FETCHED}`] &&
    Number(fullSurvey[`${exprt.props.SURVEY_ID}`]) === Number(sId)
  ) {
    isRender = true;
  }

  const returnRender = (
    <>
      <div className="m-5">
        {isRender ? (
          <FullSurvey survey={fullSurvey} readOnly={true} />
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );

  return <> {returnRender} </>;
}

export default ViewSurveyBuilder;
