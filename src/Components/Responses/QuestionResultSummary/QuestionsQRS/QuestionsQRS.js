import React from "react";
import QuestionQRS from "./QuestionQRS";

function QuestionsQRS(props) {
  console.log("QuestionsQRS");

  const { questions = [], questionsQRS = {} } = props;

  const isValidatedComponent =
    questions.length > 0 &&
    questions.length === Object.keys(questionsQRS).length;

  const MainDisplay = ({ questions = [], questionsQRS = {} }) => {
    return (
      <>
        {questions.map((question, index) => (
          <QuestionQRS
            key={index}
            question={question}
            questionQRS={questionsQRS[question.id]}
          />
        ))}{" "}
      </>
    );
  };

  return (
    <>
      {isValidatedComponent && (
        <MainDisplay questions={questions} questionsQRS={questionsQRS} />
      )}
    </>
  );
}

export default QuestionsQRS;
