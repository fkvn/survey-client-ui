import React from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import DeleteSurveyForm from "../../../Components/Form/SurveyFrom/DeleteSurveyForm";
import { useHistory } from "react-router-dom";

function DeleteSurveyBuilder(props) {
  const { show, onHide, survey } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteSurveySubmit = (id) => {
    dispatch(actionCreators.deleteSurvey(id)).then(() => {
      if (history.location.pathname !== "/dashboard/mysurveys") {
        history.push(`/dashboard/mysurveys`);
      }
    });
  };

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

  return <>{show && <DeleteSurveyModal />} </>;
}

export default DeleteSurveyBuilder;
