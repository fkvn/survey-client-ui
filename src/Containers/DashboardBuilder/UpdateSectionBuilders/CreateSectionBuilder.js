import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import AddSectionForm from "../../../Components/Form/SectionForm/AddSectionForm";
import AlertDismissible from "../../../Components/Alert/AlertDismissible";

function CreateSectionBuilder(props) {
  const { surveyId, show, onHide, updateSection } = props;

  const dispatch = useDispatch();

  const [request, setRequest] = useState({
    showSiteMsg: true,
  });

  const handlerAddSectionSubmit = (newSection) => {
    dispatch(actionCreators.addSection(surveyId, newSection)).then((newSec) => {
      updateSection && updateSection(newSec);
    });
  };

  const alert = !surveyId && request.showSiteMsg && (
    <AlertDismissible
      // component will be re-render cuz state is upddated when user click close
      onClose={() => setRequest({ ...request, showSiteMsg: false })}
      type="danger"
      msg={"Couldn't find survey information!!!"}
    ></AlertDismissible>
  );

  const addSectionModal = (
    <AddSectionForm
      show={show}
      onHide={onHide}
      onAddSectionSubmit={handlerAddSectionSubmit}
      heading="Add Section"
    ></AddSectionForm>
  );
  return (
    <>
      {alert}
      {surveyId && addSectionModal}{" "}
    </>
  );
}

export default CreateSectionBuilder;
