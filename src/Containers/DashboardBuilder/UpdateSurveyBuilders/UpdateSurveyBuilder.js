import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as exprInit from "../../../export/exportInit";
import ESurveyNameDescForm from "../../../Components/Form/SurveyFrom/ESurveyNameDescForm";

function UpdateSurveyBuilder(props) {
  const {
    survey = exprInit.dataInitialize.SURVEY_INIT,
    handleValidationError = () => {},
    show,
    onHide,
  } = props;
  const dispatch = useDispatch();

  const handlerOnSubmitHandler = (updatedSurvey) => {
    dispatch(
      exprInit.actionCreators.updateSurvey(
        survey[`${exprInit.abbrInit.SURVEY_ID}`],
        updatedSurvey
      )
    );
  };

  let survFetchDate = null;
  try {
    survFetchDate = exprInit.funcs.dateFormat(
      survey[`${exprInit.abbrInit.FETCHING_DATE}`]
    );
  } catch (error) {}

  useEffect(() => {
    if (!survFetchDate) {
      handleValidationError({
        [`${exprInit.abbrInit.MESSAGE}`]: "Please reload or contact administrations!",
      });
    }
  }, [survFetchDate, handleValidationError]);

  const eSurveyNameDescModal = (
    <ESurveyNameDescForm
      show={show}
      onHide={onHide}
      size="lg"
      sName={survey[`${exprInit.abbrInit.SURVEY_NAME}`]}
      sDesc={survey[`${exprInit.abbrInit.SURVEY_DESCRIPTION}`]}
      onSubmitHanlder={handlerOnSubmitHandler}
    ></ESurveyNameDescForm>
  );

  return (
    <>
      {show &&
        survFetchDate &&
        survey[`${exprInit.abbrInit.IS_FETCHED}`] &&
        eSurveyNameDescModal}
    </>
  );
}

export default UpdateSurveyBuilder;
