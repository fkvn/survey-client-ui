import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import DeleteResponseForm from "../../../Components/Form/ResponseForm/DeleteResponseForm";

import * as exprt from "../../../shared/export";

function DeleteResponseBuilder(props) {
  const { show, onHide, surveyId, response = {} } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteResponseSubmit = () => {
    dispatch(
      actionCreators.removeResponse(
        surveyId,
        response[`${exprt.props.RESPONSE_ID}`]
      )
    ).then(() => {
      if (
        history.location.pathname !==
        `/dashboard/mysurveys/survey/${surveyId}/responses`
      ) {
        history.push(`/dashboard/mysurveys/survey/${surveyId}/responses`);
      } else {
        window.location.reload();
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
