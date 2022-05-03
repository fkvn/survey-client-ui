import * as actionTypes from "../actionCreators/Surveys/actionTypes";
import { updateObject } from "../../shared/utility";
import * as funcs from "../../shared/utility";

import * as exprt from "../../shared/export";

/* Description  

  This file defines initial state shape and reducer to produce new state.
  Every time the application is re-run, the reducer will call initialState as default

  A reducer is a pure function that will receiver previous state and action to produce new state.

  For example:
    export const reducerExample = (preState, action) => newState;
  
  New State will be return to Redux Store which will:
    
    1. Holds application state;
    2. Allows access to state via getState();
    3. Allows state to be updated via dispatch(action);
    4. Registers listeners via subscribe(listener);
    5. Handles unregistering of listeners via the function returned by subscribe(listener).

  Notes: We will only have a single store in a Redux application.
  -> To split data handling logic (such as we want to manage state for Rubrick and Survey), we will use 'reducer composition' instead of many stores.
*/

const initialState = {
  [`${exprt.props.STATE_OPEN_SURVEYS}`]: exprt.db.initDb.OPEN_SURVEYS_INIT,

  [`${exprt.props.STATE_USER_SURVEYS}`]: exprt.db.initDb.USER_SURVEYS_INIT,

  // active survey
  [`${exprt.props.STATE_FULL_SURVEY}`]: exprt.db.initDb.FULL_SURVEY_INIT,

  // section
  [`${exprt.props.STATE_ACTIVE_SECTION}`]: exprt.db.initDb.SECTION_INIT,

  // question
  [`${exprt.props.STATE_ACTIVE_QUESTION}`]: exprt.db.initDb.QUESTION_INIT,

  // responses
  [`${exprt.props.STATE_SURVEY_RESPONSES}`]: exprt.db.initDb
    .SURVEY_RESPONSES_INIT,

  // active response
  [`${exprt.props.STATE_FULL_RESPONSE}`]: exprt.db.initDb.FULL_RESPONSE_INIT,

  // Response groups
  [`${exprt.props.STATE_RESPONSE_GROUPS}`]: exprt.db.initDb
    .RESPONSE_GROUPS_INIT,

  // question summaries
  [`${exprt.props.STATE_QUESTION_SUMMARIES}`]: exprt.db.initDb
    .QUESTION_SUMMARIES_INIT,

  // charts
  [`${exprt.props.STATE_ADVANCE_CHARTS}`]: exprt.db.initDb.ADVANCE_CHARTS,

  // file
  attachmentObjects: {},

  //error
  [`${exprt.props.STATE_ERROR}`]: exprt.db.initDb.ERROR_INIT,
};

// ================== survey reducer helping functions =========================

/* 
  @Usage: called by redux reducer to update state from action payload
  @Param: state, action
*/
const getOpenSurveys = (state, action) => {
  const openSurveys = {
    ...state[`${exprt.props.STATE_OPEN_SURVEYS}`],
  };

  openSurveys[`${exprt.props.IS_FETCHED}`] = true;

  openSurveys[`${exprt.props.SURVEY_LIST}`] =
    action[`${exprt.props.SURVEY_LIST}`];

  return {
    ...state,
    [`${exprt.props.STATE_OPEN_SURVEYS}`]: openSurveys,
  };
};

const getUserSurveys = (state, action) => {
  const userSurveys = {
    ...state[`${exprt.props.STATE_USER_SURVEYS}`],
  };

  userSurveys[`${exprt.props.IS_FETCHED}`] = true;

  userSurveys[`${exprt.props.SURVEY_LIST}`] =
    action[`${exprt.props.SURVEY_LIST}`];

  return {
    ...state,
    [`${exprt.props.STATE_USER_SURVEYS}`]: userSurveys,
  };
};

const getFullSurvey = (state, action) => {
  const fullSurvey = {
    ...state[`${exprt.props.STATE_FULL_SURVEY}`],
    ...action[`${exprt.props.SURVEY}`],
  };

  fullSurvey[`${exprt.props.IS_FETCHED}`] = true;

  // update activeSection when fullSurvey has at least 1 section
  const sections = [...fullSurvey[`${exprt.props.SECTION_LIST}`]];
  let activeSection = {
    ...state[`${exprt.props.STATE_ACTIVE_SECTION}`],
  };

  if (sections.length > 0) {
    activeSection = {
      ...activeSection,
      ...fullSurvey[`${exprt.props.SECTION_LIST}`][0],
    };
  }

  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: fullSurvey,
    [`${exprt.props.STATE_ACTIVE_SECTION}`]: activeSection,
  };
};

const addSurvey = (state, action) => {
  const newSurvey = { ...action[`${exprt.props.SURVEY}`] };

  // update fullSurvey
  const fullSurvey = {
    ...state[`${exprt.props.STATE_FULL_SURVEY}`],
    ...newSurvey,
  };

  // update activeSection
  const activeSection = {
    ...state[`${exprt.props.STATE_ACTIVE_SECTION}`],
    ...fullSurvey[`${exprt.props.SECTION_LIST}`][0],
  };

  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: fullSurvey,
    [`${exprt.props.STATE_ACTIVE_SECTION}`]: activeSection,
  };
};

const updateSurvey = (state, action) => {
  const updatedSurvey = { ...action[`${exprt.props.SURVEY}`] };

  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: updatedSurvey,
  };
};

const publishSurvey = (state, _) => {
  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: exprt.db.initDb.FULL_SURVEY_INIT,
  };
};

const closeSurvey = (state, _) => {
  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: exprt.db.initDb.FULL_SURVEY_INIT,
  };
};

const deleteSurvey = (state, _) => {
  return state;
};

// ================== survey section =========================

const setActiveSection = (state, action) => {
  const activeSection = {
    ...state[`${exprt.props.STATE_ACTIVE_SECTION}`],
    ...action[`${exprt.props.SECTION}`],
  };

  return {
    ...state,
    [`${exprt.props.STATE_ACTIVE_SECTION}`]: activeSection,
  };
};

const addSection = (state, action) => {
  const fullSurvey = {
    ...state[`${exprt.props.STATE_FULL_SURVEY}`],
  };

  const newSection = {
    ...action[`${exprt.props.SECTION}`],
    [`${exprt.props.SECTION_INDEX}`]: fullSurvey[`${exprt.props.SECTION_LIST}`]
      .length,
  };

  // update active survey
  fullSurvey[`${exprt.props.SECTION_COUNT}`] =
    fullSurvey[`${exprt.props.SECTION_COUNT}`] + 1;

  fullSurvey[`${exprt.props.SECTION_LIST}`] = [
    ...fullSurvey[`${exprt.props.SECTION_LIST}`],
    newSection,
  ];

  // update active section
  const activeSection = {
    ...state[`${exprt.props.STATE_ACTIVE_SECTION}`],
    ...newSection,
  };

  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: fullSurvey,
    [`${exprt.props.STATE_ACTIVE_SECTION}`]: activeSection,
  };
};

const updateSection = (state, action) => {
  const updatedSection = action[`${exprt.props.SECTION}`];

  // update sections list in fullSurvey
  const fullSurvey = {
    ...state[`${exprt.props.STATE_FULL_SURVEY}`],
  };

  fullSurvey[`${exprt.props.SECTION_LIST}`][
    updatedSection[`${exprt.props.SECTION_INDEX}`]
  ] = updatedSection;

  // update active section
  const activeSection = {
    ...state[`${exprt.props.STATE_ACTIVE_SECTION}`],
    ...updatedSection,
  };

  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: fullSurvey,
    [`${exprt.props.STATE_ACTIVE_SECTION}`]: activeSection,
  };
};

const updateSectionIndex = (state, action) => {
  // update sections list in fullSurvey
  const fullSurvey = { ...state[`${exprt.props.STATE_FULL_SURVEY}`] };

  const updatedSections = funcs
    .moveItemFromSource(
      fullSurvey[`${exprt.props.SECTION_LIST}`],
      action.oldIndex,
      action.newIndex
    )
    .reduce(
      (newSecs, sec, index) => [
        ...newSecs,
        { ...sec, [`${exprt.props.SECTION_INDEX}`]: index },
      ],
      []
    );

  fullSurvey[`${exprt.props.SECTION_LIST}`] = [...updatedSections];

  // // update active section
  const activeSection = {
    ...state[`${exprt.props.STATE_ACTIVE_SECTION}`],
    ...fullSurvey[`${exprt.props.SECTION_LIST}`][action.newIndex],
  };

  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: fullSurvey,
    [`${exprt.props.STATE_ACTIVE_SECTION}`]: activeSection,
  };
};

const deleteSection = (state, action) => {
  let deletedSectionIndex = Number.MAX_SAFE_INTEGER;
  const delectedSectionId = action[`${exprt.props.SECTION_ID}`];

  // update sections list in fullSurvey
  const fullSurvey = { ...state[`${exprt.props.STATE_FULL_SURVEY}`] };

  const updatedSections = fullSurvey[`${exprt.props.SECTION_LIST}`].reduce(
    (nSecs, sec, index) => {
      if (sec[`${exprt.props.SECTION_ID}`] === delectedSectionId) {
        deletedSectionIndex = index;
      }

      return sec[`${exprt.props.SECTION_ID}`] !== delectedSectionId
        ? [
            ...nSecs,
            {
              ...sec,
              [`${exprt.props.SECTION_INDEX}`]:
                index > deletedSectionIndex
                  ? sec[`${exprt.props.SECTION_INDEX}`] - 1
                  : sec[`${exprt.props.SECTION_INDEX}`],
            },
          ]
        : nSecs;
    },
    []
  );

  fullSurvey[`${exprt.props.SECTION_LIST}`] = updatedSections;

  // update activeSection
  let activeSection = { ...state[`${exprt.props.STATE_ACTIVE_SECTION}`] };

  if (updatedSections.length > 0) {
    activeSection = { ...updatedSections[0] };
  }

  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: fullSurvey,
    [`${exprt.props.STATE_ACTIVE_SECTION}`]: activeSection,
  };
};

// ================== survey question =========================

const setActiveQuestion = (state, action) => {
  const activeQuestion = {
    ...state[`${exprt.props.STATE_ACTIVE_QUESTION}`],
    ...action[`${exprt.props.QUESTION}`],
  };

  return {
    ...state,
    [`${exprt.props.STATE_ACTIVE_QUESTION}`]: activeQuestion,
  };
};

const addQuestion = (state, action) => {
  // let updateFullSurvey = state.fullSurvey;

  // if (
  //   updateFullSurvey &&
  //   Number(updateFullSurvey.id) === Number(action.surveyId)
  // ) {
  //   updateFullSurvey = {
  //     ...state.fullSurvey,
  //     questionSections: state.fullSurvey.questionSections.reduce(
  //       (newSecs, sec) => [
  //         ...newSecs,
  //         Number(sec.id) === Number(action.sectionId)
  //           ? { ...sec, questions: [...sec.questions, action.newQuestion] }
  //           : sec,
  //       ],
  //       []
  //     ),
  //   };
  // }
  // return { fullSurvey: updateFullSurvey };

  const fullSurvey = { ...state[`${exprt.props.STATE_FULL_SURVEY}`] };
  const activeSection = {
    ...state[`${exprt.props.STATE_ACTIVE_SECTION}`],
    ...action[`${exprt.props.SECTION}`],
  };

  const newQuestion = {
    ...exprt.db.initDb.QUESTION_INIT,
    ...action[`${exprt.props.QUESTION}`],
    [`${exprt.props.QUESTION_INDEX}`]: activeSection[
      `${exprt.props.QUESTION_LIST}`
    ].length,
  };

  fullSurvey[`${exprt.props.SECTION_LIST}`] = fullSurvey[
    `${exprt.props.SECTION_LIST}`
  ].reduce(
    (newSecs, sec) => [
      ...newSecs,
      Number(sec.id) === Number(activeSection[`${exprt.props.SECTION_ID}`])
        ? {
            ...sec,
            questions: [...sec.questions, newQuestion],
          }
        : sec,
    ],
    []
  );

  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: fullSurvey,
    [`${exprt.props.STATE_ACTIVE_SECTION}`]: activeSection,
    [`${exprt.props.STATE_ACTIVE_QUESTION}`]: newQuestion,
  };
};

const updateQuestion = (state, action) => {
  // sectionId
  // question
  // const updatedSection = state.fullSurvey.questionSections.reduce(
  //   (newSecs, sec) => [
  //     ...newSecs,
  //     sec.id === action.sectionId
  //       ? {
  //           ...sec,
  //           questions: sec.questions.reduce(
  //             (newQs, q) => [
  //               ...newQs,
  //               q.id === action.question.id ? { ...action.question } : { ...q },
  //             ],
  //             []
  //           ),
  //         }
  //       : { ...sec },
  //   ],
  //   []
  // );

  // return updateObject(state, {
  //   fullSurvey: { ...state.fullSurvey, questionSections: updatedSection },
  //   error: false,
  //   errorMessage: "",
  // });

  const fullSurvey = { ...state[`${exprt.props.STATE_FULL_SURVEY}`] };
  const activeSection = fullSurvey[`${exprt.props.SECTION_LIST}`].filter(
    (sec) =>
      sec[`${exprt.props.SECTION_ID}`] ===
      Number(action[`${exprt.props.SECTION_ID}`])
  )[0];

  const updatedQuestion = { ...action[`${exprt.props.QUESTION}`] };

  const updateQuestions = activeSection[`${exprt.props.QUESTION_LIST}`].reduce(
    (newQues, ques) => [
      ...newQues,
      Number(ques[`${exprt.props.QUESTION_ID}`]) ===
      Number(updatedQuestion[`${exprt.props.QUESTION_ID}`])
        ? updatedQuestion
        : ques,
    ],
    []
  );

  // update active section
  activeSection[`${exprt.props.QUESTION_LIST}`] = updateQuestions;

  // console.log(action[`${exprt.props.SECTION_ID}`]);
  // console.log(activeSection);

  // // update active survey
  fullSurvey[`${exprt.props.SECTION_LIST}`][
    activeSection[`${exprt.props.SECTION_INDEX}`]
  ] = activeSection;

  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: fullSurvey,
    [`${exprt.props.STATE_ACTIVE_SECTION}`]: activeSection,
    [`${exprt.props.STATE_ACTIVE_QUESTION}`]: updatedQuestion,
  };
};

const updateQuestionIndex = (state, action) => {
  const fullSurvey = { ...state[`${exprt.props.STATE_FULL_SURVEY}`] };
  const activeSection = fullSurvey[`${exprt.props.SECTION_LIST}`].filter(
    (sec) =>
      sec[`${exprt.props.SECTION_ID}`] ===
      Number(action[`${exprt.props.SECTION_ID}`])
  )[0];

  const updateQuestions = exprt.funcs
    .moveItemFromSource(
      activeSection[`${exprt.props.QUESTION_LIST}`],
      action.oldIndex,
      action.newIndex
    )
    .reduce(
      (newQues, ques, index) => [...newQues, { ...ques, questionIndex: index }],
      []
    );

  // update active section
  activeSection[`${exprt.props.QUESTION_LIST}`] = updateQuestions;

  // console.log(action[`${exprt.props.SECTION_ID}`]);
  // console.log(activeSection);

  // // update active survey
  fullSurvey[`${exprt.props.SECTION_LIST}`][
    activeSection[`${exprt.props.SECTION_INDEX}`]
  ] = activeSection;

  // update active question
  const activeQuestion =
    activeSection[`${exprt.props.QUESTION_LIST}`][action.newIndex];

  // console.log(activeQuestion);

  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: fullSurvey,
    [`${exprt.props.STATE_ACTIVE_SECTION}`]: activeSection,
    [`${exprt.props.STATE_ACTIVE_QUESTION}`]: activeQuestion,
  };

  // const updatedSections = state.fullSurvey.questionSections.reduce(
  //   (newSec, sec) => [
  //     ...newSec,
  //     sec.id === Number(action[`${exprt.props.SECTION_ID}`])
  //       ? {
  //           ...sec,
  //           questions: funcs
  //             .moveItemFromSource(
  //               sec.questions,
  //               action.oldIndex,
  //               action.newIndex
  //             )
  //             .reduce(
  //               (newQues, ques, index) => [
  //                 ...newQues,
  //                 { ...ques, questionIndex: index },
  //               ],
  //               []
  //             ),
  //         }
  //       : { ...sec },
  //   ],
  //   []
  // );

  // return {
  //   fullSurvey: { ...state.fullSurvey, questionSections: updatedSections },
  // };
};

const deleteQuestion = (state, action) => {
  const fullSurvey = { ...state[`${exprt.props.STATE_FULL_SURVEY}`] };
  const updatedSection = { ...state[`${exprt.props.STATE_ACTIVE_SECTION}`] };

  let deletedQuestionIndex = Number.MAX_SAFE_INTEGER;
  const questionId = Number(action[`${exprt.props.QUESTION_ID}`]);

  const updateQuestions = updatedSection[`${exprt.props.QUESTION_LIST}`].reduce(
    (newQuestions, question, index) => {
      // update deletedQuestionIndex
      if (Number(question[`${exprt.props.QUESTION_ID}`]) === questionId) {
        deletedQuestionIndex = index;
      }

      // update sections and questions' index
      return Number(question[`${exprt.props.QUESTION_ID}`]) !== questionId
        ? [
            ...newQuestions,
            {
              ...question,
              [`${exprt.props.QUESTION_INDEX}`]:
                index > deletedQuestionIndex
                  ? question[`${exprt.props.QUESTION_INDEX}`] - 1
                  : question[`${exprt.props.QUESTION_INDEX}`],
            },
          ]
        : newQuestions;
    },
    []
  );

  // update active section
  updatedSection[`${exprt.props.QUESTION_LIST}`] = updateQuestions;

  // // update active survey
  fullSurvey[`${exprt.props.SECTION_LIST}`][
    updatedSection[`${exprt.props.SECTION_INDEX}`]
  ] = updatedSection;

  // update active question
  let activeQuestion = { ...exprt.db.initDb.QUESTION_INIT };
  if (updateQuestions.length > 0) {
    activeQuestion = { ...updateQuestions[0] };
  }

  return {
    ...state,
    [`${exprt.props.STATE_FULL_SURVEY}`]: fullSurvey,
    [`${exprt.props.STATE_ACTIVE_SECTION}`]: updatedSection,
    [`${exprt.props.STATE_ACTIVE_QUESTION}`]: activeQuestion,
  };

  
};

// ================== survey response =========================

const getResponses = (state, action) => {
  const survResponses = { ...state[`${exprt.props.STATE_SURVEY_RESPONSES}`] };

  survResponses[`${exprt.props.IS_FETCHED}`] = true;
  survResponses[`${exprt.props.RESPONSE_LIST}`] =
    action[`${exprt.props.RESPONSE_LIST}`];

  return {
    ...state,
    [`${exprt.props.STATE_SURVEY_RESPONSES}`]: survResponses,
  };


};

const getResponse = (state, action) => {
 

  const fullResponse = {
    ...state[`${exprt.props.STATE_FULL_RESPONSE}`],
    ...action[`${exprt.props.RESPONSE}`],
  };

  fullResponse[`${exprt.props.IS_FETCHED}`] = true;

  return {
    ...state,
    [`${exprt.props.STATE_FULL_RESPONSE}`]: fullResponse,
  };
};

const addResponse = (state, action) => {
  if (state.surveys) {
    const updatedSurveys = state.surveys.reduce((nSurveys, survey) => {
      return [
        ...nSurveys,
        Number(survey.id) === Number(action.surveyId)
          ? { ...survey, numberOfResponses: survey.numberOfResponses + 1 }
          : survey,
      ];
    }, []);

    return updateObject(state, {
      surveys: updatedSurveys,
      error: false,
      errorMessage: "",
    });
  }
  return state;
};

const removeResponse = (state, _) => {
 
  return state;
};

// =============== response groups =========================

const getReponseGroups = (state, action) => {
  const resGroups = {
    ...state[`${exprt.props.STATE_RESPONSE_GROUPS}`],
    [`${exprt.props.IS_FETCHED}`]: true,
    [`${exprt.props.RESPONSE_GROUP_LIST}`]: action[
      `${exprt.props.RESPONSE_GROUP_LIST}`
    ],
  };

  return {
    ...state,
    [`${exprt.props.STATE_RESPONSE_GROUPS}`]: resGroups,
  };
};

// ================== question summary =========================

const initQuestionSummaries = (state, action) => {
  const questionSummaries = {
    ...state[`${exprt.props.STATE_QUESTION_SUMMARIES}`],
  };

  questionSummaries[`${exprt.props.IS_FETCHED}`] = true;

  questionSummaries[`${exprt.props.QUESTION_SUMMARIES}`] =
    action[`${exprt.props.QUESTION_SUMMARIES}`];

  return {
    ...state,
    [`${exprt.props.STATE_QUESTION_SUMMARIES}`]: questionSummaries,
  };
};

// ================== charts =========================

const initQuestionAdvanceCharts = (state, action) => {
  const charts = {
    ...state[`${exprt.props.STATE_ADVANCE_CHARTS}`],
    [`${exprt.props.IS_FETCHED}`]: true,
    [`${exprt.props.CHART_LIST}`]: action[`${exprt.props.CHART_LIST}`]
  };

  return {
    ...state,
    [`${exprt.props.STATE_ADVANCE_CHARTS}`]: charts
  }
}

// ================== error =========================

const dispatchError = (state, action) => {
  const error = { ...state[`${exprt.props.STATE_ERROR}`] };

  error[`${exprt.props.IS_ERROR}`] = true;
  error[`${exprt.props.ERROR_MESSAGE}`] =
    action[`${exprt.props.ERROR_MESSAGE}`];
  error[`${exprt.props.ERROR_TYPE}`] = action[`${exprt.props.ERROR_TYPE}`];

  return {
    ...state,
    [`${exprt.props.ERROR}`]: error,
  };
};

// ================== attachment objects =========================

const updateAttachmentObjects = (state, action) => {
  const newAttachmentObjects = {
    ...state.attachmentObjects,
    ...action.imgObject,
  };

  return funcs.updateObject(state, {
    attachmentObjects: newAttachmentObjects,
  });
};

// ************* reducer ****************************************

/* 
  @Params: state with default is initialState
  @Usage: this reducer will get the initialState everytime and return updated state by calling function depends on action object {type, ...payload}.
*/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_ATTACHMENT_OBJECTS:
      return updateAttachmentObjects(state, action);

    case actionTypes.GET_OPEN_SURVEYS:
      return getOpenSurveys(state, action);
    case actionTypes.GET_USER_SURVEYS:
      return getUserSurveys(state, action);
    case actionTypes.GET_FULL_SURVEY:
      return getFullSurvey(state, action);
    case actionTypes.ADD_SURVEY:
      return addSurvey(state, action);
    case actionTypes.UPDATE_SURVEY:
      return updateSurvey(state, action);
    case actionTypes.PUBLISH_SURVEY:
      return publishSurvey(state, action);
    case actionTypes.CLOSE_SURVEY:
      return closeSurvey(state, action);
    case actionTypes.DELETE_SURVEY:
      return deleteSurvey(state, action);

    // survey > section

    case actionTypes.SET_ACTIVE_SECTION:
      return setActiveSection(state, action);
    case actionTypes.UPDATE_SECTION:
      return updateSection(state, action);
    case actionTypes.ADD_SECTION:
      return addSection(state, action);
    case actionTypes.UPDATE_SECTION_INDEX:
      return updateSectionIndex(state, action);
    case actionTypes.DELETE_SECTION:
      return deleteSection(state, action);

    // survey > section > question
    case actionTypes.SET_ACTIVE_QUESTION:
      return setActiveQuestion(state, action);
    case actionTypes.ADD_QUESTION:
      return addQuestion(state, action);
    case actionTypes.UPDATE_QUESTION:
      return updateQuestion(state, action);
    case actionTypes.UPDATE_QUESTION_INDEX:
      return updateQuestionIndex(state, action);
    case actionTypes.DELETE_QUESTION:
      return deleteQuestion(state, action);

    // survey > response
    case actionTypes.GET_RESPONSES:
      return getResponses(state, action);
    case actionTypes.GET_RESPONSE:
      return getResponse(state, action);
    case actionTypes.ADD_RESPONSE:
      return addResponse(state, action);
    case actionTypes.REMOVE_REPSONSE:
      return removeResponse(state, action);

    // response group
    case actionTypes.GET_RESPONSE_GROUPS:
      return getReponseGroups(state, action);

    // question summary
    case actionTypes.GET_QUESTION_SUMMARIES:
      return initQuestionSummaries(state, action);

    // charts
    case actionTypes.GET_QUESTION_ADVANCE_CHARTS:
      return initQuestionAdvanceCharts(state, action)

    // Error
    case actionTypes.DISPATCH_ERROR:
      return dispatchError(state, action);

    // default
    default:
      return state;
  }
};

export default reducer;
