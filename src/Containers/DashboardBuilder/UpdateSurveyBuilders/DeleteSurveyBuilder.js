import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import DeleteSurveyForm from "../../../Components/Form/SurveyFrom/DeleteSurveyForm";

import * as exprInit from "../../../export/exportInit";

function DeleteSurveyBuilder(props) {
  const {
    show,
    onHide,
    survey = exprInit.dataInitialize.SURVEY_INIT,
    handleValidationError = () => {},
  } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteSurveySubmit = (id) => {
    dispatch(exprInit.actionCreators.deleteSurvey(id)).then(() => {
      if (history.location.pathname !== "/dashboard/mysurveys") {
        history.push(`/dashboard/mysurveys`);
      }
    });
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

  const DeleteSurveyModal = () => {
    return (
      <DeleteSurveyForm
        show={show}
        onHide={onHide}
        survey={survey}
        onDeleteSurveySubmit={handleDeleteSurveySubmit}
      />
    );
  };

  return (
    <>
      {show && survFetchDate && survey[`${exprInit.abbrInit.IS_FETCHED}`] && (
        <DeleteSurveyModal />
      )}{" "}
    </>
  );
}

export default DeleteSurveyBuilder;
