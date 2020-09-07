import React from "react";
import { useDispatch } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import * as funcs from "../../../shared/utility";
import AddEditQuestionForm from "../../../Components/Form/QuestionForm/AddEditQuestionForm";

function CreateQuestionBuilder(props) {
  const { surveyId, section, show, onHide, updateQuestion } = props;
  const dispatch = useDispatch();

  const handlerAddQuestionSubmit = (sectionId, newQuestion, files) => {
    if (Number(section.id) === Number(sectionId)) {
      // console.log(newQuestion);
      // console.log(files);
      dispatch(
        actionCreators.addQuestion(surveyId, section.id, newQuestion, files)
      ).then((response) => updateQuestion(response));
    }
  };

  const addQuestionModal = (
    <>
      <AddEditQuestionForm
        show={show}
        onHide={onHide}
        heading="Add Question"
        submitTitle="Add"
        mode="Add"
        onAddQuestionSubmit={handlerAddQuestionSubmit}
        section={section}
      />
    </>
  );
  return <>{surveyId && !funcs.isEmpty(section) && addQuestionModal} </>;
}

export default CreateQuestionBuilder;
