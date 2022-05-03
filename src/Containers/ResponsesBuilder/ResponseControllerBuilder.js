import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useParams } from "react-router-dom";
import ReactLoading from "react-loading";

import NotFoundPage from "../../NotFoundPage";
import ResponseSummaryBuilder from "./ResponseSummaryBuilder";
import ResponseIndividualBuilder from "./ResponseIndividualBuilder";
import ResponseQuestionSummaryBuilder from "./ResponseQuestionSummaryBuilder";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import * as exprt from "../../shared/export";
import ResponseGroupBuilder from "./ResponseGroupBuilder";

function ResponseControllerBuilder() {
  const { sId } = useParams();
  const surveyId = Number(sId);

  const dispatch = useDispatch();

  const survey = useSelector(
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
      initFullSurvey(surveyId);
      loading.current = false;
    }
  });

  // ================================= logic flow =========================

  // check if the component is able to render
  if (
    !loading.current &&
    survey[`${exprt.props.IS_FETCHED}`] &&
    Number(survey[`${exprt.props.SURVEY_ID}`]) === Number(surveyId)
  ) {
    isRender = true;
  }

  // ================================= sub-components =========================

  const routes = (
    <>
      <Switch>
        <Route
          path="/dashboard/mysurveys/survey/:sId/responses/groups"
          exact
          strict
        >
          <ResponseGroupBuilder survey={survey} />
        </Route>
        <Route
          path="/dashboard/mysurveys/survey/:sId/responses/questionSummary"
          exact
          strict
        >
          <ResponseQuestionSummaryBuilder survey={survey} />
        </Route>
        <Route
          path="/dashboard/mysurveys/survey/:sId/responses/:resId"
          exact
          strict
        >
          <ResponseIndividualBuilder survey={survey} />
        </Route>

        <Route path="/dashboard/mysurveys/survey/:sId/responses" exact strict>
          <ResponseSummaryBuilder survey={survey} />
        </Route>

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>
  );

  return (
    <div className="m-5 ">
      {isRender ? routes : <ReactLoading type={"bars"} color={"black"} />}
    </div>
  );
}

export default ResponseControllerBuilder;
