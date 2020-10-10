import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import MySurveys from "../../Components/Dashboard/MySurveys/MySurveys";
import AlertDismissible from "../../Components/Alert/AlertDismissible";

function MySurveysBuilder() {
  const dispatch = useDispatch();

  const params = new URLSearchParams(useLocation().search).entries();

  const surveys = useSelector((state) => state.surveyBuilder.surveys);

  const err = useSelector((state) => state.surveyBuilder.err);
  const errMsg = useSelector((state) => state.surveyBuilder.errMsg);

  const [request, setRequest] = useState({
    showSiteMsg: false,

    siteMsg: {
      type: "info",
      heading: "",
      msg: "This is an alert message!",
    },
  });

  const loading = useRef(true);

  useEffect(() => {
    if (loading.current || !surveys) {
      setTimeout(() => dispatch(actionCreators.initSurveys()), 100);
      loading.current = false;
    }
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
      {
        !params.next().done && (
          // history.push("/dashboard/mysurveys");
          <Redirect to="/dashboard/mysurveys" />
        )
        // return;
      }
      <div className="m-5">
        {siteMsgComp}
        {!loading.current && surveys ? (
          <MySurveys surveys={surveys}></MySurveys>
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );
}

export default MySurveysBuilder;
