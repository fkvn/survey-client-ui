import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import MySurveys from "../../../Components/Dashboard/MySurveys/MySurveys";

import * as exprt from "../../../shared/export";
import NotFoundPage from "../../../NotFoundPage";

function MySurveysBuilder() {
  // ================================= init =========================
  const dispatch = useDispatch();

  // const params = new URLSearchParams(useLocation().search).entries();

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
      initUserSurveys();
      loading.current = false;
    }
  });

  // ================================= sub-components =========================

  const routes = (
    <Switch>
      <Route exact strict path="/dashboard/mysurveys">
        <MySurveys surveys={surveys[`${exprt.props.SURVEY_LIST}`]}></MySurveys>
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );

  const returnRender = (
    <>
      {/* {!params.next().done && <Redirect to="/dashboard/mysurveys" />} */}
      <div className="m-5">
        {!loading.current && surveys[`${exprt.props.IS_FETCHED}`] ? (
          routes
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );

  return returnRender;
}

export default MySurveysBuilder;
