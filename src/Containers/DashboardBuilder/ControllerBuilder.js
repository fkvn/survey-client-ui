import React from "react";
import { Switch, Route } from "react-router-dom";

import MySurveysBuilder from "./MySurveysBuilder";
import EditSurveyBuilder from "../DashboardBuilder/EditSurveyBuilder";
import DashboardBuilder from "../DashboardBuilder/DashboardBuilder";
import ViewSurveyBuilder from "./ViewSurveyBuilder";

import NotFoundPage from "../../NotFoundPage";
// import ResponseControllerBuilder from "../ResponsesBuilder/ResponseControllerBuilder";

import ResponseControllerBuilder from "../ResponseBuilder_v2/ResponseControllerBuilder";
// import QuestionSummaryBuilder from "../ResponseBuilder_v2/QuestionSummaryBuilder";

function ControllerBuilder() {
  return (
    <>
      <Switch>
        {/* <Route
          path={["/dashboard/mysurveys/survey/:sId/responses/questionSummary"]}
          exact
          strict
        >
          <QuestionSummaryBuilder />
        </Route> */}
        <Route
          path={[
            "/dashboard/mysurveys/survey/:sId/responses",
            "/dashboard/mysurveys/survey/:sId/responses/:resId",
            "/dashboard/mysurveys/survey/:sId/responses/questionSummary",
          ]}
          exact
          strict
        >
          <ResponseControllerBuilder />
        </Route>
        <Route path="/dashboard/mysurveys/survey" exact strict>
          <ViewSurveyBuilder />
        </Route>
        <Route path="/dashboard/mysurveys/editSurvey" exact strict>
          <EditSurveyBuilder />
        </Route>

        <Route path="/dashboard/mysurveys" exact strict>
          <MySurveysBuilder />
        </Route>
        <Route exact strict path="/dashboard">
          <DashboardBuilder />
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default ControllerBuilder;
