import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import AddSectionForm from "../../../Components/Form/SectionForm/AddSectionForm";

import * as exprInit from "../../../export/exportInit";

function CreateSectionBuilder(props) {
  const {
    survey = exprInit.dataInitialize.SURVEY_INIT,
    handleValidationError = () => {},
    show,
    onHide,
    updateSection,
  } = props;

  const dispatch = useDispatch();

  const handlerAddSectionSubmit = (newSection) => {
    dispatch(
      actionCreators.addSection(
        survey[`${exprInit.abbrInit.SURVEY_ID}`],
        newSection
      )
    ).then((newSec) => {
      updateSection && updateSection(newSec);
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

  console.log(survey);
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
      {show &&
        survFetchDate &&
        survey[`${exprInit.abbrInit.IS_FETCHED}`] &&
        addSectionModal}{" "}
    </>
  );
}

export default CreateSectionBuilder;
