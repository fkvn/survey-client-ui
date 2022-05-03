import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sections from "../../../Components/Sections/Sections";

import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import * as exprt from "../../../shared/export";

function SectionBuilder(props) {
  // ================================= init =========================

  const { surveyId = -1, sections = [], readOnly = true } = props;

  const dispatch = useDispatch();

  const activeSection = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_ACTIVE_SECTION}`]
  );

  let isRender = false;

  // ============================ functions =======================

  const initError = (message) => {
    dispatch(actionCreators.initError(message, exprt.props.VALIDATION_ERROR));
  };

  const setActiveSection = (section) => {
    dispatch(actionCreators.setActiveSection(section));

    // update active question if there is at least 1 question
    const questions = section[`${exprt.props.QUESTION_LIST}`];
    if (questions.length > 0) {
      dispatch(actionCreators.setActiveQuestion(questions[0]));
    }
  };

  // ============================ hooks =======================

  useEffect(() => {
    if (surveyId < 0) {
      const message = "Couldn't find survey information!!!";
      initError(message);
    }
  });

  // ============================ logic flow =======================

  if (
    surveyId > -1 &&
    sections.length > 0 &&
    activeSection[`${exprt.props.SECTION_ID}`] > -1 &&
    activeSection[`${exprt.props.SECTION_INDEX}`] > -1
  ) {
    isRender = true;
  }

  // ================================= sub-components =========================

  const sectionList = (
    <Sections
      surveyId={surveyId}
      sections={sections}
      readOnly={readOnly}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
    />
  );

  const returnRender = isRender && <div className="mt-4">{sectionList}</div>;

  return returnRender;
}

export default SectionBuilder;
