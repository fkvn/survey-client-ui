import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import DeleteResponseForm from "../../../Components/Form/ResponseForm/DeleteResponseForm";

function DeleteResponseBuilder(props) {
  const {
    show,
    onHide,
    surveyId,
    response = {},
    updateAfterRemoveResponse,
  } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  console.log(response);

  const handleDeleteResponseSubmit = (responseId) => {
    dispatch(actionCreators.removeResponse(surveyId, responseId)).then(() => {
      if (
        history.location.pathname !==
        `/dashboard/mysurveys/survey/${surveyId}/responses`
      ) {
        history.push(`/dashboard/mysurveys/survey/${surveyId}/responses`);
      } else {
        updateAfterRemoveResponse();
      }
    });
  };

  const MainDisplay = ({ response }) => {
    return (
      <DeleteResponseForm
        show={show}
        onHide={onHide}
        response={response}
        onDeleteResponseSubmit={handleDeleteResponseSubmit}
      />
    );
  };

  return <>{show && <MainDisplay response={response} />} </>;
}

export default DeleteResponseBuilder;
