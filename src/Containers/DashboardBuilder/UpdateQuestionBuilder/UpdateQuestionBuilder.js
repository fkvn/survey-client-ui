import React from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import * as funcs from "../../../shared/utility";
import AddEditQuestionForm from "../../../Components/Form/QuestionForm/AddEditQuestionForm";
import IconButton from "../../../Components/CustomButton/IconButton";

function UpdateQuestionBuilder(props) {
  const {
    surveyId,
    section,
    question,
    show,
    onHide,
    updateQuestion,
    moveQuestion = false,
  } = props;
  const dispatch = useDispatch();

  if (moveQuestion) {
    const moveUpQuestion = {
      type: "Move Up",
      title: "Move Up",
      disabled: question.questionIndex === 0 ? true : false,
      onClick: () => {
        dispatch(
          actionCreators.updateQuestionIndex(
            surveyId,
            section.id,
            question.id,
            question.questionIndex,
            question.questionIndex - 1
          )
        );
        updateQuestion({
          ...question,
          questionIndex: question.questionIndex - 1,
        });
      },
    };

    const moveDownQuestion = {
      type: "Move Down",
      title: "Move Down",
      disabled:
        question.questionIndex >= section.questions.length - 1 ? true : false,
      onClick: () => {
        dispatch(
          actionCreators.updateQuestionIndex(
            surveyId,
            section.id,
            question.id,
            question.questionIndex,
            question.questionIndex + 1
          )
        );
        updateQuestion({
          ...question,
          questionIndex: question.questionIndex + 1,
        });
      },
    };

    const moveQuestionBtns = (
      <>
        <IconButton
          btnClassName="p-0 m-0 mb-2"
          type={moveUpQuestion.type}
          title={moveUpQuestion.title}
          onClickHandler={moveUpQuestion.onClick}
          disabled={moveUpQuestion.disabled}
        />
        <IconButton
          btnClassName="p-0 m-0 mb-2"
          type={moveDownQuestion.type}
          title={moveDownQuestion.title}
          onClickHandler={moveDownQuestion.onClick}
          disabled={moveDownQuestion.disabled}
        />
      </>
    );

    return <>{moveQuestionBtns} </>;
  } else {
    const handleUpdateQuestionSubmit = (
      sectionId,
      questionId,
      newQuestion,
      files
    ) => {
      if (
        Number(sectionId) === Number(section.id) &&
        Number(questionId) === Number(question.id)
      ) {
        // console.log(questionId);
        // console.log(newQuestion);
        // console.log(files);
        dispatch(
          actionCreators.updateQuestion(
            surveyId,
            sectionId,
            questionId,
            newQuestion,
            files
          )
        ).then((response) => updateQuestion(response));
      }
    };

    const editQuestionModal = (
      <>
        <AddEditQuestionForm
          show={show}
          onHide={onHide}
          heading="Edit Question"
          headingColor="text-warning"
          mode="Edit"
          section={section}
          question={question}
          onUpdateQuestionSubmit={handleUpdateQuestionSubmit}
        />
      </>
    );

    return (
      <>
        {surveyId &&
          !funcs.isEmpty(section) &&
          !funcs.isEmpty(question) &&
          editQuestionModal}
      </>
    );
  }
}

export default UpdateQuestionBuilder;
