import React from "react";
import { useHistory } from "react-router";

import * as exprt from "../../../shared/export";
import ReactLoading from "react-loading";

import CustomBreadcrumb from "../../CustomBreadcrumb/CustomBreadcrumb";
import QuestionsQRS from "./QuestionsQRS/QuestionsQRS";
import SectionsQRS from "./SectionsQRS";

function QuestionResultSummary(props) {
  console.log("question Summary");

  const {
    survey = exprt.db.initDb.FULL_SURVEY_INIT,
    surveyQuestionSummaries = exprt.db.initDb.QUESTION_SUMMARIES_INIT,
  } = props;

  const history = useHistory();

  const breadcumbItems = [
    {
      title: "My Surveys",
      onClick: () => history.push(`/dashboard/mysurveys`),
    },

    {
      title: survey[`${exprt.props.SURVEY_NAME}`],
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/survey?sId=${
            survey[`${exprt.props.SURVEY_ID}`]
          }`
        ),
    },
    {
      title: "Responses",
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/survey/${
            survey[`${exprt.props.SURVEY_ID}`]
          }/responses`
        ),
    },
  ];

  const isValidatedComponent =
    survey[`${exprt.props.SECTION_LIST}`].length > 0 &&
    survey[`${exprt.props.SECTION_LIST}`].length ===
      Object.keys(surveyQuestionSummaries).length;

  const breadcrumb = (
    <CustomBreadcrumb
      items={breadcumbItems}
      iconClassname="ml-1"
    ></CustomBreadcrumb>
  );

  console.log("question sur");

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

  console.log("QRS compo");
  console.log(isValidatedComponent);
  console.log(surveyQuestionSummaries);

  return (
    <>
      {breadcrumb}
      {isValidatedComponent ? (
        <MainDisplay
          sections={survey[`${exprt.props.SECTION_LIST}`]}
          sectionsQRS={surveyQuestionSummaries}
        />
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );
}

export default QuestionResultSummary;
