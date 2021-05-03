import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";

import * as exprt from "../../../shared/export";
import Questions from "../../../Components/Questions/Questions";

function QuestionBuilder(props) {
  // ================================= init =========================
  const {
    surveyId = -1,
    section = exprt.db.initDb.SECTION_INIT,
    questions = [],
    readOnly = true,
  } = props;

  const dispatch = useDispatch();

  const activeQuestion = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_ACTIVE_QUESTION}`]
  );

  let isRender = false;

  // ============================ functions =======================

  const initError = (message) => {
    dispatch(actionCreators.initError(message, exprt.props.VALIDATION_ERROR));
  };

  const setActiveQuestion = (question) => {
    dispatch(actionCreators.setActiveQuestion(question));
  };

  // ============================ hooks =======================

  useEffect(() => {
    if (
      surveyId < 0 ||
      section[`${exprt.props.SECTION_ID}`] < 0 ||
      section[`${exprt.props.SECTION_INDEX}`] < 0
    ) {
      const message = "Couldn't load survey or section information!!!";
      initError(message);
    }

    if (
      questions.lenght > 0 &&
      activeQuestion[`${exprt.props.QUESTION_INDEX}`] < 0
    ) {
      console.log("set again");
      setActiveQuestion(questions[0]);
    }
  });

  // console.log(activeQuestion);

  // ============================ logic flow =======================

  if (
    surveyId > -1 &&
    section[`${exprt.props.SECTION_ID}`] > -1 &&
    section[`${exprt.props.SECTION_INDEX}`] > -1 &&
    questions.length > 0
  ) {
    isRender = true;
  }

  // ================================= sub-components =========================

  const questionList = (
    <Questions
      surveyId={surveyId}
      section={section}
      questions={questions}
      activeQuestion={activeQuestion}
      setActiveQuestion={setActiveQuestion}
      readOnly={readOnly}
    />
  );

  const returnRender = <div className="mt-3">{questionList}</div>;

  return isRender && returnRender;
}

export default QuestionBuilder;
