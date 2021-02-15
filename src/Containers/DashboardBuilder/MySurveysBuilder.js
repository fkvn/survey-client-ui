import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

import MySurveys from "../../Components/Dashboard/MySurveys/MySurveys";

import * as exprInit from "../../export/exportInit";

function MySurveysBuilder() {
  const dispatch = useDispatch();

  const params = new URLSearchParams(useLocation().search).entries();

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

  console.log("MySurvey builder");
  // console.log(userSurvList);

  const handleValidationError = (error) => {
    dispatch(exprInit.actionCreators.handleValidationError(error));
  };

  return (
    <>
      {
        !params.next().done && (
          // history.push("/dashboard/mysurveys");
          <Redirect to="/dashboard/mysurveys" />
        )
        // return;
      }
      <div className="m-5">
        {userSurvList[`${exprInit.abbrInit.IS_FETCHED}`] ? (
          <>
            <MySurveys
              userSurvList={userSurvList}
              handleValidationError={handleValidationError}
            />
          </>
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );
}

export default MySurveysBuilder;
