import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ReactLoading from "react-loading";

import * as funcs from "../../shared/utility";
import * as actionCreators from "../../store/actionCreators/Surveys/index";
import IndividualResponse from "../../Components/Responses/IndividualResponseResult/IndividualResponse";
import { Card, Form } from "react-bootstrap";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb/CustomBreadcrumb";
import IconButton from "../../Components/CustomButton/IconButton";

import * as exprt from "../../shared/export";

function ResponseIndividualBuilder(props) {
  const { survey = exprt.db.initDb.FULL_SURVEY_INIT } = props;
  const { resId } = useParams();

  const dispatch = useDispatch();

  const response = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_FULL_RESPONSE}`]
  );

  const loading = useRef(true);
  let isRender = false;

  // ================================= functions =========================

  const initResponse = (surveyId, responseId) => {
    setTimeout(
      () => dispatch(actionCreators.getResponse(surveyId, responseId)),
      500
    );
  };

  // ================================= hooks =========================

  useEffect(() => {
    if (loading.current) {
      initResponse(survey[`${exprt.props.SURVEY_ID}`], resId);
      loading.current = false;
    }
  });

  // ================================= logic flow =========================

  if (
    survey[`${exprt.props.SURVEY_ID}`] > -1 &&
    response[`${exprt.props.RESPONSE_SURVEY_ID}`] ===
      survey[`${exprt.props.SURVEY_ID}`] &&
    response[`${exprt.props.RESPONSE_ID}`] > -1 &&
    Number(resId) === Number(response[`${exprt.props.RESPONSE_ID}`])
  ) {
    isRender = true;
  }

  // ================================= sub-components =========================

  const returnRender = (
    <>
      {isRender ? (
        <IndividualResponse survey={survey} response={response} />
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}{" "}
    </>
  );

  return returnRender;
}

export default ResponseIndividualBuilder;
