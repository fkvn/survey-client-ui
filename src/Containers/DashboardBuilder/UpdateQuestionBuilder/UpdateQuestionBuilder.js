import React from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import * as funcs from "../../../shared/utility";
import AddEditQuestionForm from "../../../Components/Form/QuestionForm/AddEditQuestionForm";

function UpdateQuestionBuilder(props) {
  const { surveyId, section, question, show, onHide, updateQuestion } = props;
  const dispatch = useDispatch();

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

export default UpdateQuestionBuilder;
