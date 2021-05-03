import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import SurveyResponse from "../../Components/Surveys/SurveyResponse";

import * as exprt from "../../shared/export";

function SubmitSurveyBuilder(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const params = new URLSearchParams(useLocation().search);
  const sId = Number(params.get("sId"));

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

  const handlerOnSubmitResponse = (response) => {
    // // console.log(response);
    dispatch(actionCreators.addResponse(fullSurvey.id, response)).then(
      (success) => {
        if (success) {
          localStorage.removeItem(`survey:${fullSurvey.id}`);
          history.push(`/surveys/response/successful`);
        } else {
          history.push(`/surveys/response/unsuccessful`);
        }
      }
    );
  };

  // ================================= hooks =========================
  useEffect(() => {
    if (loading.current) {
      initFullSurvey(sId);
      loading.current = false;
    }
  });

  // unavailable to update
  useEffect(() => {
    if (!isEditable) {
      let message = "The survey is either not available or has been deleted!";

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
    (fullSurvey[`${exprt.props.SURVEY_IS_CLOSED}`] ||
      !fullSurvey[`${exprt.props.SURVEY_PUBLISHED_DATE}`] ||
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
          <SurveyResponse
            mode="Submit"
            survey={fullSurvey}
            onSubmitResponse={handlerOnSubmitResponse}
          />
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );

  return <> {returnRender} </>;
}

export default SubmitSurveyBuilder;
