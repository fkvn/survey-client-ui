import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

import FullSurvey from "../../Components/Surveys/FullSurvey";

import * as exprInit from "../../export/exportInit";

function EditSurveyBuilder() {
  const dispatch = useDispatch();

  const params = new URLSearchParams(useLocation().search);
  const sId = Number(params.get("sId"));

  const fullSurvey = useSelector(
    (state) => state.surveyBuilder[`${exprInit.abbrInit.ACTIVE_SURVEY}`]
  );

  // dispatch from redux store
  const InitFullSurvey = (survID) => {
    dispatch(exprInit.actionCreators.initFullSurvey(survID));
  };

  const handleValidationError = (error) => {
    dispatch(exprInit.actionCreators.handleValidationError(error));
  };

  useEffect(() => {
    if (
      !fullSurvey[`${exprInit.abbrInit.IS_FETCHED}`] ||
      Number(fullSurvey[`${exprInit.abbrInit.SURVEY_ID}`]) !== Number(sId)
    ) {
      setTimeout(() => {
        InitFullSurvey(sId);
      }, 500);
    } else if (
      !fullSurvey[`${exprInit.abbrInit.SURVEY_IS_ARCHIVED}`] ||
      fullSurvey[`${exprInit.abbrInit.SURVEY_DATE_PUBLISHED}`]
    ) {
      handleValidationError({
        [`${exprInit.abbrInit.MESSAGE}`]: "The survey is either not available to edit or has been deleted!. Please reload or contact administrations!",
      });
    }
  });

  return (
    <>
      <div className="m-5">
        {fullSurvey[`${exprInit.abbrInit.IS_FETCHED}`] &&
        Number(fullSurvey[`${exprInit.abbrInit.SURVEY_ID}`]) === Number(sId) ? (
          <FullSurvey
            survey={fullSurvey}
            handleValidationError={handleValidationError}
          />
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );
}

export default EditSurveyBuilder;
