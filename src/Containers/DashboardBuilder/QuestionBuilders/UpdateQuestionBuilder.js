import React from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import * as funcs from "../../../shared/utility";
import AddEditQuestionForm from "../../../Components/Form/QuestionForm/AddEditQuestionForm";
import IconButton from "../../../Components/CustomButton/IconButton";

import * as exprt from "../../../shared/export";
import UpdateQuestionForm from "../../../Components/Form/QuestionForm/UpdateQuestionForm";

function UpdateQuestionBuilder(props) {
  const {
    surveyId = -1,
    section = exprt.db.initDb.SECTION_INIT,
    question = exprt.db.initDb.QUESTION_INIT,
    show = false,
    onHide = () => {},
  } = props;

  const dispatch = useDispatch();

  let isRender = false;

  const updateQuestion = (updatedFields, files) => {
    dispatch(
      actionCreators.updateQuestion(
        surveyId,
        section[`${exprt.props.SECTION_ID}`],
        question[`${exprt.props.QUESTION_ID}`],
        updatedFields,
        files
      )
    );
  };

  if (
    surveyId > -1 &&
    section[`${exprt.props.SECTION_ID}`] > -1 &&
    section[`${exprt.props.SECTION_INDEX}`] > -1 &&
    question[`${exprt.props.QUESTION_ID}`] > -1 &&
    question[`${exprt.props.QUESTION_INDEX}`] > -1
  ) {
    isRender = true;
  }

  const editQuestionModal = (
    <>
      <UpdateQuestionForm
        show={show}
        onHide={onHide}
        editQuestion={question}
        updateQuestion={updateQuestion}
      />
    </>
  );

  return isRender && editQuestionModal;
}

export default UpdateQuestionBuilder;
