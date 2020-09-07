import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

import AlertDismissible from "../../Components/Alert/AlertDismissible";
import * as actionCreators from "../../store/actionCreators/Surveys/index";
import ViewSurvey from "../../Components/Surveys/ViewSurvey";
// import ViewSurvey from "../../Components/Surveys/ViewSurvey";

function ViewSurveyBuilder() {
  const params = new URLSearchParams(useLocation().search);
  const sId = Number(params.get("sId"));

  const dispatch = useDispatch();

  const fullSurvey = useSelector((state) => state.surveyBuilder.fullSurvey);
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
    if (
      loading.current ||
      !fullSurvey ||
      Number(fullSurvey.id) !== Number(sId)
    ) {
      setTimeout(() => dispatch(actionCreators.initFullSurvey(sId)), 100);
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
    ></AlertDismissible>
  ) : null;

  return (
    <>
      <div className="m-5">
        {siteMsgComp}
        {!loading.current &&
        fullSurvey &&
        Number(fullSurvey.id) === Number(sId) ? (
          <ViewSurvey survey={fullSurvey} />
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );
}

export default ViewSurveyBuilder;
