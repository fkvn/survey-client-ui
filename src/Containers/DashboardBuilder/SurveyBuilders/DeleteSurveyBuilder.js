import React from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import DeleteSurveyForm from "../../../Components/Form/SurveyFrom/DeleteSurveyForm";
import { useHistory } from "react-router-dom";

import * as exprt from "../../../shared/export";

function DeleteSurveyBuilder(props) {
  // ============================ init =======================
  const {
    show = false,
    onHide = () => {},
    survey = exprt.db.initDb.FULL_SURVEY_INIT,
  } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  let isRender = false;

  // ============================ functions =======================

  const deleteSurvey = (id) => {
    // console.log("deleting");
    dispatch(actionCreators.deleteSurvey(id)).then(() => {
      // console.log("afterDelete");
      if (history.location.pathname !== "/dashboard/mysurveys") {
        history.push(`/dashboard/mysurveys`);
      } else {
        window.location.reload();
      }
    });
  };

  // ============================ logic flow =======================
  if (show && survey[`${exprt.props.SURVEY_ID}`] > -1) {
    isRender = true;
  }

  // ============================ sub-components =======================
  const DeleteSurveyModal = () => {
    return (
      <DeleteSurveyForm
        show={show}
        onHide={onHide}
        survey={survey}
        deleteSurvey={deleteSurvey}
      />
    );
  };

  return <>{isRender && <DeleteSurveyModal />} </>;
}

export default DeleteSurveyBuilder;
