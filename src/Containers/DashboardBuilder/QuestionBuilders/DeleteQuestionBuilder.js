import React from "react";
import DeleteQuestionForm from "../../../Components/Form/QuestionForm/DeleteQuestionForm";
import * as funcs from "../../../shared/utility";
import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import { useDispatch } from "react-redux";

import * as exprt from "../../../shared/export";

function DeleteQuestionBuilder(props) {
  const {
    surveyId = -1,
    section = exprt.db.initDb.SECTION_INIT,
    question = exprt.db.initDb.QUESTION_INIT,
    show = false,
    onHide = () => {},
  } = props;

  const dispatch = useDispatch();

  let isRender = false;

  if (
    surveyId > -1 &&
    section[`${exprt.props.SECTION_ID}`] > -1 &&
    section[`${exprt.props.SECTION_INDEX}`] > -1 &&
    question[`${exprt.props.QUESTION_ID}`] > -1 &&
    question[`${exprt.props.QUESTION_INDEX}`] > -1
  ) {
    isRender = true;
  }

  const deleteQuestion = () => {
    dispatch(
      actionCreators.deleteQuestion(
        surveyId,
        section[`${exprt.props.SECTION_ID}`],
        question[`${exprt.props.QUESTION_ID}`]
      )
    );
  };

  const deleteQuestionModal = (
    <>
      <DeleteQuestionForm
        show={show}
        onHide={onHide}
        // sectionId={sectionId}
        question={question}
        deleteQuestion={deleteQuestion}
      />
    </>
  );

  return isRender && deleteQuestionModal;
}

export default DeleteQuestionBuilder;
