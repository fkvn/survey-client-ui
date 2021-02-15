import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ReactLoading from "react-loading";

import Dashboard from "../../Components/Dashboard/Dashboard";
import NotFoundPage from "../../NotFoundPage";

import * as exprInit from "../../export/exportInit";

function DashboardBuilder() {
  const dispatch = useDispatch();

  // data from redux store
  const userSurvList = useSelector(
    (state) => state.surveyBuilder[`${exprInit.abbrInit.USER_SURVEY_LIST}`]
  );

  // dispatch from redux store
  const InitUserSurvList = () => {
    dispatch(exprInit.actionCreators.initUserSurveyList());
  };

  useEffect(() => {
    if (!userSurvList[`${exprInit.abbrInit.IS_FETCHED}`]) {
      setTimeout(() => {
        InitUserSurvList();
      }, 500);
    }
  });

  // console.log("Dashboard builder");
  // console.log(userSurvList);

  const handleValidationError = (error) => {
    dispatch(exprInit.actionCreators.handleValidationError(error));
  };

  return (
    <>
      <div className="m-5">
        {userSurvList[`${exprInit.abbrInit.IS_FETCHED}`] ? (
          <Switch>
            <Route path="/dashboard" exact>
              <Dashboard
                userSurvList={userSurvList}
                handleValidationError={handleValidationError}
              ></Dashboard>
            </Route>
            <Route path="*" component={NotFoundPage} />
          </Switch>
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );
}

export default DashboardBuilder;
