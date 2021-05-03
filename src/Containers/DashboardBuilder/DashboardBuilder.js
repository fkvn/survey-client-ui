import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ReactLoading from "react-loading";

import Dashboard from "../../Components/Dashboard/Dashboard";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import NotFoundPage from "../../NotFoundPage";

import * as exprt from "../../shared/export";

function DashboardBuilder() {
  // ================================= init =========================
  const dispatch = useDispatch();
  const surveys = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_USER_SURVEYS}`]
  );

  const loading = useRef(true);

  // ================================= functions =========================
  const initUserSurveys = () => {
    setTimeout(() => {
      dispatch(actionCreators.initUserSurveys());
    }, 500);
  };

  // ================================= hooks =========================
  useEffect(() => {
    if (loading.current) {
      loading.current = false;
      initUserSurveys();
    }
  });

  // ================================= sub-components =========================

  const routes = (
    <Switch>
      <Route path="/dashboard" exact>
        <Dashboard surveys={surveys[`${exprt.props.SURVEY_LIST}`]}></Dashboard>
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );

  const returnRender = (
    <>
      <div className="m-5">
        {/* {routes} */}
        {!loading.current && surveys[`${exprt.props.IS_FETCHED}`] ? (
          routes
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );

  return <> {returnRender} </>;
}

export default DashboardBuilder;
