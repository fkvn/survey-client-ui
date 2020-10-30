import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import SurveyResponse from "../../Components/Surveys/SurveyResponse";
import AlertDismissible from "../../Components/Alert/AlertDismissible";

function SubmitSurveyBuilder(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const params = new URLSearchParams(useLocation().search);
  const sId = Number(params.get("sId"));

  const fullSurvey = useSelector((state) => state.surveyBuilder.fullSurvey);
  const err = useSelector((state) => state.surveyBuilder.err);
  const errMsg = useSelector((state) => state.surveyBuilder.errMsg);

  // console.log("SubmitSurveyBuilder render");
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
    (fullSurvey.closed || !fullSurvey.publishDate) &&
    !request.showSiteMsg
  ) {
    // re-render request and update state
    setRequest({
      ...request,
      showSiteMsg: true,
      siteMsg: {
        type: "danger",
        heading: "Oh snap! Survey is unavailable!",
        msg:
          "The survey is either no longer available or the link is expired!!!",
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

  const handlerOnSubmitResponse = (response) => {
    // console.log(response);
    dispatch(actionCreators.addResponse(fullSurvey.id, response)).then((id) => {
      if (id) {
        localStorage.removeItem(`survey:${fullSurvey.id}`);
        history.push(`/surveys/response/successful`);
      } else {
        history.push(`/surveys/response/unsuccessful`);
      }
    });
  };

  return (
    <>
      <div className="m-5">
        {siteMsgComp}
        {!loading.current &&
        fullSurvey &&
        !fullSurvey.closed &&
        fullSurvey.publishDate ? (
          <SurveyResponse
            mode="Submit"
            survey={fullSurvey}
            onSubmitResponse={handlerOnSubmitResponse}
          />
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );
}

export default SubmitSurveyBuilder;
