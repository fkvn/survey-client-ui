import React from "react";

import * as funcs from "../../../shared/utility";
import QuestionsQRS from "./QuestionsQRS/QuestionsQRS";
import SectionsQRS from "./SectionsQRS";

function QuestionResultSummary(props) {
  console.log("question Summary");

  const { survey = {}, surveyQuestionSummaries = {} } = props;

  const isValidatedComponent =
    !funcs.isEmpty(survey) &&
    !funcs.isEmpty(surveyQuestionSummaries) &&
    survey.questionSections &&
    survey.questionSections.length > 0 &&
    survey.questionSections.length ===
      Object.keys(surveyQuestionSummaries).length;

  const MainDisplay = ({ sections = [], sectionsQRS = {} }) => {
    return (
      <>
        {sections.length === 1 ? (
          <QuestionsQRS
            questions={sections[0].questions}
            questionsQRS={sectionsQRS[sections[0].id]}
          />
        ) : (
          <SectionsQRS sections={sections} sectionsQRS={sectionsQRS} />
        )}
      </>
    );
  };

  return (
    <>
      {isValidatedComponent && (
        <MainDisplay
          sections={survey.questionSections}
          sectionsQRS={surveyQuestionSummaries}
        />
      )}{" "}
    </>
  );
}

export default QuestionResultSummary;
