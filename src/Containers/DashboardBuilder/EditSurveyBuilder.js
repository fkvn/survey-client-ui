import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../../store/actionCreators/Surveys/index";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

import FullSurvey from "../../Components/Surveys/FullSurvey";
import AlertDismissible from "../../Components/Alert/AlertDismissible";

function EditSurveyBuilder() {
  const dispatch = useDispatch();

  const params = new URLSearchParams(useLocation().search);
  const sId = Number(params.get("sId"));

  const fullSurvey = useSelector((state) => state.surveyBuilder.fullSurvey);
  const err = useSelector((state) => state.surveyBuilder.err);
  const errMsg = useSelector((state) => state.surveyBuilder.errMsg);

  const loading = useRef(true);

  const [request, setRequest] = useState({
    showSiteMsg: false,

    siteMsg: {
      type: "info",
      heading: "",
      msg: "This is an alert message!",
    },
  });

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

  // update siteMsg for err
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

  // update siteMsg for unvalid survey update
  if (
    fullSurvey &&
    (!fullSurvey.closed || fullSurvey.publishDate) &&
    !request.showSiteMsg
  ) {
    // re-render request and update state
    setRequest({
      ...request,
      showSiteMsg: true,
      siteMsg: {
        type: "danger",
        heading: "Oh snap! You got an error!",
        msg: "The survey is either not available to edit or has been deleted!",
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
        <></>
        <>
          {siteMsgComp}
          {!loading.current &&
          fullSurvey &&
          Number(fullSurvey.id) === Number(sId) ? (
            <FullSurvey survey={fullSurvey} edit={true} />
          ) : (
            <ReactLoading type={"bars"} color={"black"} />
          )}
        </>
      </div>
    </>
  );
}

export default EditSurveyBuilder;
