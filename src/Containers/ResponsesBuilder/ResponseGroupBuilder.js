import React, { useEffect, useRef } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import * as funcs from "../../shared/utility";
import ResponseGroup from "../../Components/Responses/ResponseGroup/ResponseGroup";

import * as exprt from "../../shared/export";

function ResponseGroupBuilder(props) {
  const { survey = exprt.db.initDb.FULL_SURVEY_INIT } = props;

  console.log("ResponseGroup Builder");

  const dispatch = useDispatch();
  const responses = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_SURVEY_RESPONSES}`]
  );

  const resGroups = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_RESPONSE_GROUPS}`]
  );

  const loading = useRef(true);
  let isRender = false;

  // ================================= functions =========================

  const init = (surveyId) => {
    setTimeout(() => {
      dispatch(actionCreators.getResponses(surveyId));
      dispatch(actionCreators.initResponseGroups(surveyId));
    }, 500);
  };
  // ================================= hooks =========================

  useEffect(() => {
    if (loading.current) {
      init(survey[`${exprt.props.SURVEY_ID}`]);
      loading.current = false;
    }
  });

  // check if the component is able to render
  if (
    !loading.current &&
    Number(survey[`${exprt.props.SURVEY_ID}`]) > -1 &&
    responses[`${exprt.props.IS_FETCHED}`] &&
    resGroups[`${exprt.props.IS_FETCHED}`]
  ) {
    isRender = true;
  }

  return (
    <>
      {isRender ? (
        <ResponseGroup
          responses={responses[`${exprt.props.RESPONSE_LIST}`]}
          survey={survey}
          responseGroups={resGroups[`${exprt.props.RESPONSE_GROUP_LIST}`]}
        />
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );
}

export default ResponseGroupBuilder;
