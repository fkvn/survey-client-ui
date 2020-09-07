import React from "react";
import DeleteQuestionForm from "../../../Components/Form/QuestionForm/DeleteQuestionForm";
import * as funcs from "../../../shared/utility";
import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import { useDispatch } from "react-redux";

function DeleteQuestionBuilder(props) {
  const { show, onHide, surveyId, sectionId, question, updateQuestion } = props;
  const dispatch = useDispatch();

  const handlerDeleteQuestionSubmit = (secId, questionId) => {
    if (
      Number(secId) === Number(sectionId) &&
      Number(questionId) === Number(question.id)
    ) {
      // console.log(surveyId);
      // console.log(secId);
      // console.log(questionId);
      // console.log("deleting");
      dispatch(
        actionCreators.deleteQuestion(surveyId, secId, questionId)
      ).then(() => updateQuestion(true));
    }
  };

  const deleteQuestionModal = (
    <>
      <DeleteQuestionForm
        show={show}
        onHide={onHide}
        sectionId={sectionId}
        question={question}
        onDeleteQuestionSubmit={handlerDeleteQuestionSubmit}
      />
    </>
  );

  return (
    <>
      {surveyId &&
        sectionId &&
        !funcs.isEmpty(question) &&
        question.id &&
        deleteQuestionModal}
    </>
  );
}

export default DeleteQuestionBuilder;
