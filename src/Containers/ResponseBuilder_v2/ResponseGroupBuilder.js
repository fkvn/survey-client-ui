import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import * as funcs from "../../shared/utility";
import ResponseGroup from "../../Components/Responses/ResponseGroup/ResponseGroup";

function ResponseGroupBuilder(props) {
  const { survey = {} } = props;

  console.log("ResponseGroup Builder");

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
        <ResponseGroup survey={survey} responses={responses} />
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );
}

export default ResponseGroupBuilder;
