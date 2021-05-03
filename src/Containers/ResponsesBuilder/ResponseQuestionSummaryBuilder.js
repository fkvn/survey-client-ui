import React, { useEffect, useRef } from "react";
import { Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb/CustomBreadcrumb";

import * as funcs from "../../shared/utility";
import * as actionCreators from "../../store/actionCreators/Surveys/index";
import * as exprt from "../../shared/export";
import { useDispatch, useSelector } from "react-redux";
import QuestionResultSummary from "../../Components/Responses/QuestionResultSummary/QuestionResultSummary";

function ResponseQuestionSummaryBuilder(props) {
  const { survey = exprt.db.initDb.FULL_SURVEY_INIT } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const questionSummaries = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_QUESTION_SUMMARIES}`]
  );

  const loading = useRef(true);
  let isRender = false;

  // ================================= functions =========================

  const initQuestionSummaries = (surveyId) => {
    setTimeout(
      () => dispatch(actionCreators.initQuestionSummaries(surveyId)),
      500
    );
  };

  // ================================= hooks =========================

  useEffect(() => {
    if (loading.current) {
      initQuestionSummaries(survey[`${exprt.props.SURVEY_ID}`]);
      loading.current = false;
    }
  });

  // ================================= logic flow =========================

  if (survey[`${exprt.props.SURVEY_ID}`] > -1) {
    isRender = true;
  }

  console.log(questionSummaries);

  console.log("Question summary");
  console.log(questionSummaries);

  const returnRender = (
    <QuestionResultSummary
      survey={survey}
      surveyQuestionSummaries={
        questionSummaries[`${exprt.props.QUESTION_SUMMARIES}`]
      }
    />
  );

  return isRender && returnRender;
}

export default ResponseQuestionSummaryBuilder;
