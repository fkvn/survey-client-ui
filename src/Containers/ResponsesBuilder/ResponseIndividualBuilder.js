import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";

import * as funcs from "../../shared/utility";
import * as actionCreators from "../../store/actionCreators/Surveys/index";
import IndividualResponse from "../../Components/Responses/IndividualResponseResult/IndividualResponse";

function ResponseIndividualBuilder(props) {
  console.log("inv");

  const { survey = {}, updateBreadcumb, currentBreadcumbItems } = props;
  const { sId, resId } = useParams();
  const surveyId = Number(sId);
  const responseId = Number(resId);

  const dispatch = useDispatch();
  const response = useSelector((state) => state.surveyBuilder.response);

  useEffect(() => {
    if (surveyId && funcs.isEmpty(survey)) {
      setTimeout(() => dispatch(actionCreators.initFullSurvey(sId)), 500);
    }

    if (responseId && funcs.isEmpty(response)) {
      setTimeout(
        () => dispatch(actionCreators.getResponse(surveyId, responseId)),
        500
      );
    }
    if (
      responseId &&
      !funcs.isEmpty(response) &&
      currentBreadcumbItems.length !== 4
    ) {
      const title = `${funcs.toSentenceCase(
        response.type
      )} <span class="text-dark"> (${response.date})</span>`;

      updateBreadcumb({
        title: title,
      });
    }
  });

  return (
    <>
      {!funcs.isEmpty(response) && !funcs.isEmpty(survey) ? (
        <IndividualResponse survey={survey} response={response} />
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}{" "}
    </>
  );
}

export default ResponseIndividualBuilder;
