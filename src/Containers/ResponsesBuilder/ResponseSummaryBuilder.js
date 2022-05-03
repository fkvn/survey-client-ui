import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import ResponseSummary from "../../Components/Responses/ResponseSummary";

import * as exprt from "../../shared/export";

function ResponseSummaryBuilder(props) {
  const { survey = exprt.db.initDb.FULL_SURVEY_INIT } = props;

  const dispatch = useDispatch();

  const responses = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_SURVEY_RESPONSES}`]
  );

  const loading = useRef(true);
  let isRender = false;

  // ================================= functions =========================

  const initResponsesFromSurvey = (surveyId) => {
    setTimeout(() => dispatch(actionCreators.getResponses(surveyId)), 500);
  };

  // ================================= hooks =========================

  useEffect(() => {
    if (loading.current) {
      initResponsesFromSurvey(survey[`${exprt.props.SURVEY_ID}`]);
      loading.current = false;
    }
  });

  // ================================= logic flow =========================

  // check if the component is able to render
  if (
    !loading.current &&
    Number(survey[`${exprt.props.SURVEY_ID}`]) > -1 &&
    responses[`${exprt.props.IS_FETCHED}`]
  ) {
    isRender = true;
  }

  // ================================= sub-components =========================

  return (
    <>
      {isRender ? (
        <ResponseSummary
          responses={responses[`${exprt.props.RESPONSE_LIST}`]}
          survey={survey}
        />
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );
}

export default ResponseSummaryBuilder;
