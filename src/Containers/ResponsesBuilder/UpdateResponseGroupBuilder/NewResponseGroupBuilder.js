import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import AddNewResGroupForm from "../../../Components/Form/ResponseGroupForm/AddNewResGroupForm";

import * as funcs from "../../../shared/utility";
import * as actionCreators from "../../../store/actionCreators/Surveys/index";

function NewResponseGroupBuilder(props) {
  console.log("NewResGroup Builder");

  const { survey = {}, responses = [], show, onHide } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const addResGroup = (autoYear, resGroup) => {
    const returnURL = `/dashboard/mysurveys/survey/${survey.id}/responses/groups`;

    if (autoYear) {
      dispatch(
        actionCreators.addResponseGroupAutoYear(survey.id, resGroup)
      ).then(() => {
        if (history.location.pathname !== returnURL) {
          history.push(returnURL);
        } else {
          window.location.reload();
        }
      });
    } else {
      dispatch(actionCreators.addResponseGroup(resGroup)).then(() => {
        if (history.location.pathname !== returnURL) {
          history.push(returnURL);
        } else {
          window.location.reload();
        }
      });
    }
  };

  const addNewGroupForm = (
    <AddNewResGroupForm
      show={show}
      onHide={onHide}
      survey={survey}
      responses={responses}
      addResGroup={addResGroup}
    />
  );

  const MainDisplay = () => {
    return <>{addNewGroupForm} </>;
  };

  return <>{!funcs.isEmpty(survey) && <MainDisplay />}</>;
}

export default NewResponseGroupBuilder;
