import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactLoading from "react-loading";
import ResponseSummary from "../../Components/Responses/ResponseSummary";

import * as actionCreators from "../../store/actionCreators/Surveys/index";

function ResponseSummaryBuilder(props) {
  const { survey = {} } = props;
  const dispatch = useDispatch();

  const responses = useSelector((state) => state.surveyBuilder.responses);

  useEffect(() => {
    if (survey.id && !responses) {
      setTimeout(() => dispatch(actionCreators.getResponses(survey.id)), 500);
    }
  });

  return (
    <>
      {survey.id && responses ? (
        <ResponseSummary responses={responses} survey={survey} />
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );
}

export default ResponseSummaryBuilder;
