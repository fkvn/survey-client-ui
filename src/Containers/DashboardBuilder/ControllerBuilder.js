import React from "react";
import { Switch, Route } from "react-router-dom";

import MySurveysBuilder from "./SurveyBuilders/MySurveysBuilder";
import EditSurveyBuilder from "./SurveyBuilders/EditSurveyBuilder";
import DashboardBuilder from "./DashboardBuilder";
import ViewSurveyBuilder from "./SurveyBuilders/ViewSurveyBuilder";

import NotFoundPage from "../../NotFoundPage";
import ResponseControllerBuilder from "../ResponsesBuilder/ResponseControllerBuilder";
import OIDCHandler from "../../Components/Auth/OIDCHandler";

function ControllerBuilder(props) {
  const aliceObj = window.sessionStorage.getItem(
    "oidc.user:https://identity.cysun.org:alice-survey-service-spa"
  );

  window.sessionStorage.setItem("redirectURL", props.location.pathname);

  let user = null;

  if (aliceObj) user = JSON.parse(aliceObj).profile;

  const routes = (
    <Switch>
      <Route path="/dashboard/mysurveys/editSurvey" exact strict>
        <EditSurveyBuilder />
      </Route>
      <Route
        path={[
          "/dashboard/mysurveys/survey/:sId/responses",
          "/dashboard/mysurveys/survey/:sId/responses/:resId",
        ]}
        exact
        strict
      >
        <ResponseControllerBuilder />
      </Route>
      <Route path="/dashboard/mysurveys/survey" exact strict>
        <ViewSurveyBuilder />
      </Route>
      <Route exact strict path="/dashboard/mysurveys">
        <MySurveysBuilder />
      </Route>
      <Route exact strict path="/dashboard">
        <DashboardBuilder />
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );

  // <Switch>
  //   <Route path="/dashboard/mysurveys" exact strict>
  //         <MySurveysBuilder />
  //       </Route>
  //   <Route path="/dashboard/mysurveys/survey" exact strict>
  //         <ViewSurveyBuilder />
  //       </Route>
  //   <Route
  //         path={[
  //           "/dashboard/mysurveys/survey/:sId/responses",
  //           "/dashboard/mysurveys/survey/:sId/responses/:resId",
  //         ]}
  //         exact
  //         strict
  //       >
  //         <ResponseControllerBuilder />
  //       </Route>
  //   <Route path="/dashboard/mysurveys/editSurvey" exact strict>
  //         <EditSurveyBuilder />
  //       </Route>
  //   <Route exact strict path="/dashboard">
  //     <DashboardBuilder />
  //   </Route>
  //   <Route path="*" component={NotFoundPage} />
  // </Switch>;

  // return <>{aliceObj ? routes : <OIDCHandler />}</>;
  return routes;
}

export default ControllerBuilder;
