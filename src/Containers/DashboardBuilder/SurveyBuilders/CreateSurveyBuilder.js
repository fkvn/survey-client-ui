import React from "react";
import { useDispatch } from "react-redux";

import CreateSurveyForm from "../../../Components/Form/SurveyFrom/CreateSurveyForm";
import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import { useHistory } from "react-router-dom";

function CreateSurveyBuilder(props) {
  // ========================== init ==============================
  const { show = false, onHide } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  // ========================== functions ==============================

  const handlerCreateSurveySubmit = (newSurvey) => {
    dispatch(actionCreators.addSurvey(newSurvey)).then((id) => {
      if (id) {
        history.push(`/dashboard/mysurveys/editSurvey?sId=${id}`);
      }
    });
  };

  // ========================== sub-components ==============================
  const CreateSurveyModal = () => {
    return (
      <CreateSurveyForm
        show={show}
        onHide={onHide}
        onCreateSurveySubmit={handlerCreateSurveySubmit}
      ></CreateSurveyForm>
    );
  };

  return <> {show && <CreateSurveyModal />} </>;
}

export default CreateSurveyBuilder;
