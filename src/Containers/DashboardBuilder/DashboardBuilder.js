import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ReactLoading from "react-loading";

import Dashboard from "../../Components/Dashboard/Dashboard";
import AlertDismissible from "../../Components/Alert/AlertDismissible";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import NotFoundPage from "../../NotFoundPage";

function DashboardBuilder() {
  const dispatch = useDispatch();

  // data from redux store
  const surveys = useSelector((state) => state.surveyBuilder.surveys);
  const err = useSelector((state) => state.surveyBuilder.err);
  const errMsg = useSelector((state) => state.surveyBuilder.errMsg);

  const loading = useRef(true);

  useEffect(() => {
    if (loading.current || !surveys) {
      setTimeout(() => {
        dispatch(actionCreators.initSurveys());
      }, 500);
      loading.current = false;
    }
  });

  const [request, setRequest] = useState({
    showSiteMsg: false,

    siteMsg: {
      type: "info",
      heading: "",
      msg: "This is an alert message!",
    },
  });

  if (
    err &&
    request.siteMsg.type !== "danger" &&
    errMsg !== request.siteMsg.msg
  ) {
    // re-render request and update state
    setRequest({
      ...request,
      showSiteMsg: true,
      siteMsg: {
        type: "danger",
        heading: "Oh snap! You got an error!",
        msg: errMsg,
      },
    });
  }

  const siteMsgComp = request.showSiteMsg ? (
    <AlertDismissible
      // component will be re-render cuz state is upddated when user click close
      onClose={() => setRequest({ ...request, showSiteMsg: false })}
      type={request.siteMsg.type}
      heading={request.siteMsg.heading}
      msg={request.siteMsg.msg}
    >
      {" "}
    </AlertDismissible>
  ) : null;

  return (
    <>
      <div className="m-5">
        {siteMsgComp}
        {!loading.current && surveys ? (
          <Switch>
            <Route path="/dashboard" exact>
              <Dashboard surveys={surveys}></Dashboard>
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
