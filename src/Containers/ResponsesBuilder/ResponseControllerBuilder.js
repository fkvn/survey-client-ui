import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useParams } from "react-router-dom";
import ReactLoading from "react-loading";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import * as funcs from "../../shared/utility";

import AlertDismissible from "../../Components/Alert/AlertDismissible";
import NotFoundPage from "../../NotFoundPage";
import ResponseSummaryBuilder from "./ResponseSummaryBuilder";
import ResponseIndividualBuilder from "./ResponseIndividualBuilder";
import ResponseQuestionSummaryBuilder from "./ResponseQuestionSummaryBuilder";

function ResponseControllerBuilder() {
  const { sId } = useParams();
  const surveyId = Number(sId);

  const dispatch = useDispatch();

  const survey = useSelector((state) => state.surveyBuilder.fullSurvey);

  const SURVEY_NOT_FOUND_ERROR = {
    type: "danger",
    heading: "Oop! Something has went wrong!",
    msg: "SURVEY NOT FOUND",
  };

  const [request, setRequest] = useState({
    showSiteMsg: false,

    siteMsg: {
      type: "info",
      heading: "",
      msg: "This is an alert message!",
    },
  });

  useEffect(() => {
    if (surveyId && !survey) {
      setTimeout(() => dispatch(actionCreators.initFullSurvey(surveyId), 50));
    }
  });

  const resetMsg = () => {
    setRequest({
      ...request,
      showSiteMsg: false,

      siteMsg: {
        type: "info",
        heading: "",
        msg: "",
      },
    });
  };

  if (!surveyId || (surveyId && !survey)) {
    if (!request.showSiteMsg) {
      setRequest({
        ...request,
        showSiteMsg: true,
        siteMsg: { ...SURVEY_NOT_FOUND_ERROR },
      });
    }
  } else {
    if (
      request.showSiteMsg &&
      request.siteMsg.msg === SURVEY_NOT_FOUND_ERROR.msg
    ) {
      resetMsg();
    }
  }

  const siteMsgComp = request.showSiteMsg ? (
    <AlertDismissible
      // component will be re-render cuz state is upddated when user click close
      type={request.siteMsg.type}
      heading={request.siteMsg.heading}
      msg={request.siteMsg.msg}
    >
      {" "}
    </AlertDismissible>
  ) : null;

  return (
    <div className="m-5 ">
      {surveyId && !funcs.isEmpty(survey) && surveyId === Number(survey.id) ? (
        <>
          {siteMsgComp}
          <Switch>
            <Route
              path="/dashboard/mysurveys/survey/:sId/responses"
              exact
              strict
            >
              <ResponseSummaryBuilder survey={survey} />
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

            <Route path="*" component={NotFoundPage} />
          </Switch>
        </>
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </div>
  );
}

export default ResponseControllerBuilder;
