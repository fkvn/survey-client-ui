import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as funcs from "../../../shared/utility";
import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import ESurveyNameDescForm from "../../../Components/Form/SurveyFrom/ESurveyNameDescForm";
import AlertDismissible from "../../../Components/Alert/AlertDismissible";

function UpdateSurveyBuilder(props) {
  console.log("UpdateSurveyBuilder render");
  const { survey = {}, show, onHide } = props;
  const dispatch = useDispatch();

  const [request, setRequest] = useState({
    showSiteMsg: true,
  });

  const handlerOnSubmitHandler = (updatedSurvey) => {
    dispatch(actionCreators.updateSurvey(survey.id, updatedSurvey));
  };

  const eSurveyNameDescModal = (
    <ESurveyNameDescForm
      show={show}
      onHide={onHide}
      size="lg"
      sName={survey.name}
      sDesc={survey.description}
      onSubmitHanlder={handlerOnSubmitHandler}
    ></ESurveyNameDescForm>
  );

  const alert = funcs.isEmpty(survey) && request.showSiteMsg && (
    <AlertDismissible
      // component will be re-render cuz state is upddated when user click close
      onClose={() => setRequest({ ...request, showSiteMsg: false })}
      type="danger"
      msg={"Couldn't find survey information!!!"}
    ></AlertDismissible>
  );

  return (
    <>
      {alert}
      {!funcs.isEmpty(survey) && eSurveyNameDescModal}
    </>
  );
}

export default UpdateSurveyBuilder;
