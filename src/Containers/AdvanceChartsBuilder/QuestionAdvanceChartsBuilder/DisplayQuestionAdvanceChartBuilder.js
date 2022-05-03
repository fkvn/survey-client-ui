import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

import * as exprt from "../../../shared/export";
import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import QuestionAdvanceChart from "../../../Components/Chart/QuestionAdvanceChart";

function AddQuestionAdvanceChartBuilder(props) {
  // ================================= init =========================
  const { question = exprt.db.initDb.QUESTION_INIT } = props;

  const dispatch = useDispatch();
  const survey = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_FULL_SURVEY}`]
  );

  const resGroups = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_RESPONSE_GROUPS}`]
  );

  console.log("question chart");

  const charts = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_ADVANCE_CHARTS}`]
  );

  const loading = useRef(true);

  let isRender = false;

  // ================================= functions =========================
  const init = (surveyId, questionId) => {
    setTimeout(() => {
      dispatch(actionCreators.initResponseGroups(surveyId));
      dispatch(actionCreators.initQuestionAdvanceCharts(questionId));
    }, 500);
  };

  // ================================= hooks =========================
  useEffect(() => {
    if (loading.current) {
      loading.current = false;
      init(
        survey[`${exprt.props.SURVEY_ID}`],
        question[`${exprt.props.QUESTION_ID}`]
      );
    }
  });

  // ================================= logic flows =========================
  if (
    question[`${exprt.props.QUESTION_ID}`] > -1 &&
    resGroups[`${exprt.props.IS_FETCHED}`] &&
    charts[`${exprt.props.IS_FETCHED}`]
  ) {
    isRender = true;
  }

  const returnRender = isRender && (
    <QuestionAdvanceChart
      charts={charts[`${exprt.props.CHART_LIST}`]}
      resGroups={resGroups[`${exprt.props.RESPONSE_GROUP_LIST}`]}
    />
  );

  return isRender ? (
    returnRender
  ) : (
    <div className="m-2">
      <ReactLoading type={"bars"} color={"black"} />
    </div>
  );
}

export default AddQuestionAdvanceChartBuilder;
