import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Questions from "../Questions/Questions";
import * as funcs from "../../shared/utility";

import DescriptionDisplay from "../DescriptionDisplay/DescriptionDisplay";

import * as exprt from "../../shared/export";
import QuestionBuilder from "../../Containers/DashboardBuilder/QuestionBuilders/QuestionBuilder";
import CreateQuestionBuilder from "../../Containers/DashboardBuilder/QuestionBuilders/CreateQuestionBuilder";

function Section(props) {
  // ================================= init =========================
  const {
    surveyId = -1,
    section = exprt.db.initDb.SECTION_INIT,
    readOnly = true,
    activeQuestion,
    addQuestionShow,
    updateQuestionAfterDeleted,
    updateQuestionAfterUpdated,
  } = props;

  const [request, setRequest] = useState({
    showAddQuestionModal: false,
  });

  let isRender = false;

  // ================================= logic flow =========================
  if (
    surveyId > -1 &&
    section[`${exprt.props.SECTION_ID}`] > -1 &&
    section[`${exprt.props.SECTION_INDEX}`] > -1
  ) {
    isRender = true;
  }

  // ================================= sub-components =========================

  const addQuestionModal = request.showAddQuestionModal && (
    <CreateQuestionBuilder
      surveyId={surveyId}
      section={section}
      show={true}
      onHide={() => setRequest({ ...request, showAddQuestionModal: false })}
    />
  );

  const returnRender = (
    <>
      {/* modals */}
      {!readOnly && request.showAddQuestionModal && addQuestionModal}

      {/* components */}
      <DescriptionDisplay
        description={section[`${exprt.props.SECTION_DESCRIPTION}`]}
        title="section"
        className="py-4"
      />

      {!readOnly && (
        <Form.Group className="pl-2">
          <Button
            variant="primary"
            className="mt-3"
            onClick={() =>
              setRequest({ ...request, showAddQuestionModal: true })
            }
          >
            Add Question
          </Button>
        </Form.Group>
      )}

      <QuestionBuilder
        surveyId={surveyId}
        section={section}
        questions={section[`${exprt.props.QUESTION_LIST}`]}
        readOnly={readOnly}
      />
    </>
  );

  return isRender && returnRender;
}

export default Section;
