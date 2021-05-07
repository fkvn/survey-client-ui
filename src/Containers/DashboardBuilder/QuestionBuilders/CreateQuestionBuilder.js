import React from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import * as funcs from "../../../shared/utility";
import AddEditQuestionForm from "../../../Components/Form/QuestionForm/AddEditQuestionForm";

import * as exprt from "../../../shared/export";
import AddQuestionForm from "../../../Components/Form/QuestionForm/AddQuestionForm";

function CreateQuestionBuilder(props) {
  // ================================= init =========================
  const {
    surveyId = -1,
    section = exprt.db.initDb.SECTION_INIT,
    show = false,
    onHide = () => {},
  } = props;

  const dispatch = useDispatch();

  let isRender = false;

  // ================================= functions =========================

  const addQuestion = (newQuestion, files) => {
    // console.log(newQuestion);
    dispatch(actionCreators.addQuestion(surveyId, section, newQuestion, files));
  };
  // ================================= logic flow =========================

  if (
    show &&
    surveyId > -1 &&
    section[`${exprt.props.SECTION_ID}`] > -1 &&
    section[`${exprt.props.SECTION_INDEX}`] > -1
  ) {
    isRender = true;
  }

  // ================================= sub-components =========================

  const addQuestionModal = (
    <AddQuestionForm show={show} onHide={onHide} addQuestion={addQuestion} />
  );

  const returnRender = isRender && addQuestionModal;

  return returnRender;
}

export default CreateQuestionBuilder;
