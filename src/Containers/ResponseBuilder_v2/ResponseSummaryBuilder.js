import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

import ResponseSummary from "../../Components/Responses/ResponseSummary";
import * as actionCreators from "../../store/actionCreators/Surveys/index";
import * as funcs from "../../shared/utility";

function ResponseSummaryBuilder(props) {
  const { survey = {} } = props;

  console.log("Response Summary");

  const dispatch = useDispatch();
  const responses = useSelector((state) => state.surveyBuilder.responses);

  useEffect(() => {
    if (survey && survey.id && !responses) {
      setTimeout(() => dispatch(actionCreators.getResponses(survey.id)), 1000);
    }
  });

  return (
    <>
      {!funcs.isEmpty(survey) && !funcs.isEmpty(responses) ? (
        <ResponseSummary responses={responses} survey={survey} />
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );
}

export default ResponseSummaryBuilder;
