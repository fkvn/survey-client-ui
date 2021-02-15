import * as actionTypes from "../actionCreators/Surveys/actionTypes";
import { updateObject } from "../../shared/utility";
import * as funcs from "../../shared/utility";

import * as exprInit from "../../export/exportInit";

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
  [`${exprInit.abbrInit.OPEN_SURVEY_LIST}`]: exprInit.dataInitialize
    .OPEN_SURVEY_LIST_INIT,

  [`${exprInit.abbrInit.USER_SURVEY_LIST}`]: exprInit.dataInitialize
    .USER_SURVEY_LIST_INIT,

  [`${exprInit.abbrInit.ACTIVE_SURVEY}`]: exprInit.dataInitialize.SURVEY_INIT,

  [`${exprInit.abbrInit.ACTIVE_SECTION}`]: exprInit.dataInitialize.SECTION_INIT,

  [`${exprInit.abbrInit.ERROR}`]: exprInit.dataInitialize.ERROR_INIT,

  // openedSurveys: null,
  // surveys: null,
  // fullSurvey: null,
  // responses: null,
  // response: null,
  // questionResultSummaries: null,
  // attachmentObjects: {},
  // err: false,
  // errMsg: "",
};

// ================== survey reducer helping functions =========================

/* 
  @Usage: called by redux reducer to update state from action payload
  @Param: state, action
*/
const getOpenSurvList = (state, action) => {
  const openSurvListInit = {
    ...state[`${exprInit.abbrInit.OPEN_SURVEY_LIST}`],
  };

  const openSurvList = action[`${exprInit.abbrInit.SURVEY_LIST}`];

  openSurvListInit[`${exprInit.abbrInit.FETCHING_DATE}`] = new Date();
  openSurvListInit[`${exprInit.abbrInit.IS_FETCHED}`] = true;
  openSurvListInit[`${exprInit.abbrInit.SURVEY_COUNT}`] = openSurvList.length;
  openSurvListInit[`${exprInit.abbrInit.SURVEY_LIST}`] = openSurvList;

  return {
    ...state,
    [`${exprInit.abbrInit.OPEN_SURVEY_LIST}`]: openSurvListInit,
  };
};

const getUserSurveyList = (state, action) => {
  const userSurvListInit = {
    ...state[`${exprInit.abbrInit.USER_SURVEY_LIST}`],
  };

  const userSurvList = action[`${exprInit.abbrInit.SURVEY_LIST}`];

  userSurvListInit[`${exprInit.abbrInit.FETCHING_DATE}`] = new Date();
  userSurvListInit[`${exprInit.abbrInit.IS_FETCHED}`] = true;
  userSurvListInit[`${exprInit.abbrInit.SURVEY_COUNT}`] = userSurvList.length;
  userSurvListInit[`${exprInit.abbrInit.SURVEY_LIST}`] = userSurvList;

  return {
    ...state,
    [`${exprInit.abbrInit.USER_SURVEY_LIST}`]: userSurvListInit,
  };
};

// const getUserSurveys = (state, action) => {
//   return updateObject(state, {
//     surveys: action.surveys,
//     error: false,
//     errorMessage: "",
//   });
// };

const getFullSurvey = (state, action) => {
  const activeSurv = exprInit.funcs.updateSurvey(
    state[`${exprInit.abbrInit.ACTIVE_SURVEY}`],
    action[`${exprInit.abbrInit.ACTIVE_SURVEY}`]
  );

  activeSurv[`${exprInit.abbrInit.FETCHING_DATE}`] = new Date();
  activeSurv[`${exprInit.abbrInit.IS_FETCHED}`] = true;

  return {
    ...state,
    [`${exprInit.abbrInit.ACTIVE_SURVEY}`]: activeSurv,
  };
};

const addSurvey = (state, action) => {
  const newSurv = {
    ...state[`${exprInit.abbrInit.ACTIVE_SURVEY}`],
  };

  newSurv[`${exprInit.abbrInit.SURVEY_ID}`] =
    action[`${exprInit.abbrInit.SURVEY_ID}`];

  return {
    ...state,
    [`${exprInit.abbrInit.ACTIVE_SURVEY}`]: newSurv,
  };
};

const updateSurvey = (state, action) => {
  const activeSurv = exprInit.funcs.updateSurvey(
    state[`${exprInit.abbrInit.ACTIVE_SURVEY}`],
    action[`${exprInit.abbrInit.ACTIVE_SURVEY}`]
  );

  return {
    ...state,
    [`${exprInit.abbrInit.USER_SURVEY_LIST}`]: exprInit.dataInitialize
      .USER_SURVEY_LIST_INIT,
    [`${exprInit.abbrInit.ACTIVE_SURVEY}`]: activeSurv,
  };
};

const deleteSurvey = (state, _) => {
  return funcs.updateObject(state, {
    [`${exprInit.abbrInit.USER_SURVEY_LIST}`]: exprInit.dataInitialize
      .USER_SURVEY_LIST_INIT,
    [`${exprInit.abbrInit.ACTIVE_SURVEY}`]: exprInit.dataInitialize.SURVEY_INIT,
  });
};

// ================== survey section =========================

const addSection = (state, action) => {
  const newSec = exprInit.funcs.updateSurvey(
    state[`${exprInit.abbrInit.ACTIVE_SECTION}`],
    action[`${exprInit.abbrInit.ACTIVE_SECTION}`]
  );

  const actvSur = {
    ...state[`${exprInit.abbrInit.ACTIVE_SURVEY}`],
  };

  actvSur[`${exprInit.abbrInit.SURVEY_SECTION_COUNT}`] =
    actvSur[`${exprInit.abbrInit.SURVEY_SECTION_COUNT}`] + 1;

  actvSur[`${exprInit.abbrInit.SURVEY_SECTION_LIST}`] = [
    ...actvSur[`${exprInit.abbrInit.SURVEY_SECTION_LIST}`],
    newSec,
  ];

  newSec[`${exprInit.abbrInit.FETCHING_DATE}`] = new Date();
  newSec[`${exprInit.abbrInit.IS_FETCHED}`] = true;
  newSec[`${exprInit.abbrInit.SURVEY_ID}`] =
    action[`${exprInit.abbrInit.SURVEY_ID}`];

  return {
    ...state,
    [`${exprInit.abbrInit.ACTIVE_SURVEY}`]: actvSur,
    [`${exprInit.abbrInit.ACTIVE_SECTION}`]: newSec,
  };
};

const updateSection = (state, action) => {
  const currentSections = state.fullSurvey.questionSections;

  const updatedSections = currentSections.reduce(
    (result, sec) =>
      sec.id === action.section.id
        ? [...result, { ...sec, ...action.section.updatedFields }]
        : [...result, sec],
    []
  );

  // return updateObject(state, {
  //   fullSurvey: { ...state.fullSurvey, questionSections: updatedSections },
  //   error: false,
  //   errorMessage: "",
  // });
  return {
    fullSurvey: { ...state.fullSurvey, questionSections: updatedSections },
  };
};

const updateSectionIndex = (state, action) => {
  if (
    !funcs.isEmpty(state.fullSurvey) &&
    Number(state.fullSurvey.id) === Number(action.surveyId)
  ) {
    const updatedSections = funcs
      .moveItemFromSource(
        state.fullSurvey.questionSections,
        action.oldIndex,
        action.newIndex
      )
      .reduce(
        (newSecs, sec, index) => [...newSecs, { ...sec, sectionIndex: index }],
        []
      );

    return {
      fullSurvey: { ...state.fullSurvey, questionSections: updatedSections },
    };
  }
  return state;
};

const deleteSection = (state, action) => {
  let deletedSectionIndex = Number.MAX_SAFE_INTEGER;

  const updatedSections = state.fullSurvey.questionSections.reduce(
    (nSecs, sec, index) => {
      if (sec.id === action.sectionId) {
        deletedSectionIndex = index;
      }

      return sec.id !== action.sectionId
        ? [
            ...nSecs,
            {
              ...sec,
              sectionIndex:
                index > deletedSectionIndex
                  ? sec.sectionIndex - 1
                  : sec.sectionIndex,
            },
          ]
        : nSecs;
    },
    []
  );

  return updateObject(state, {
    fullSurvey: { ...state.fullSurvey, questionSections: updatedSections },
    error: false,
    errorMessage: "",
  });
};

// ================== survey question =========================

const addQuestion = (state, action) => {
  let updateFullSurvey = state.fullSurvey;

  if (
    updateFullSurvey &&
    Number(updateFullSurvey.id) === Number(action.surveyId)
  ) {
    updateFullSurvey = {
      ...state.fullSurvey,
      questionSections: state.fullSurvey.questionSections.reduce(
        (newSecs, sec) => [
          ...newSecs,
          Number(sec.id) === Number(action.sectionId)
            ? { ...sec, questions: [...sec.questions, action.newQuestion] }
            : sec,
        ],
        []
      ),
    };
  }

  // return updateObject(state, {
  //   fullSurvey: updateFullSurvey,
  //   error: false,
  //   errorMessage: "",
  // });
  return { fullSurvey: updateFullSurvey };
};

const updateQuestion = (state, action) => {
  // sectionId
  // question
  const updatedSection = state.fullSurvey.questionSections.reduce(
    (newSecs, sec) => [
      ...newSecs,
      sec.id === action.sectionId
        ? {
            ...sec,
            questions: sec.questions.reduce(
              (newQs, q) => [
                ...newQs,
                q.id === action.question.id ? { ...action.question } : { ...q },
              ],
              []
            ),
          }
        : { ...sec },
    ],
    []
  );

  return updateObject(state, {
    fullSurvey: { ...state.fullSurvey, questionSections: updatedSection },
    error: false,
    errorMessage: "",
  });
};

const updateQuestionIndex = (state, action) => {
  const updatedSections = state.fullSurvey.questionSections.reduce(
    (newSec, sec) => [
      ...newSec,
      sec.id === Number(action.sectionId)
        ? {
            ...sec,
            questions: funcs
              .moveItemFromSource(
                sec.questions,
                action.oldIndex,
                action.newIndex
              )
              .reduce(
                (newQues, ques, index) => [
                  ...newQues,
                  { ...ques, questionIndex: index },
                ],
                []
              ),
          }
        : { ...sec },
    ],
    []
  );

  return {
    fullSurvey: { ...state.fullSurvey, questionSections: updatedSections },
  };
};

const deleteQuestion = (state, action) => {
  // section id
  // question id
  let deletedQuestionIndex = Number.MAX_SAFE_INTEGER;
  const updatedSection = state.fullSurvey.questionSections.reduce(
    (newSecs, sec) => [
      ...newSecs,
      sec.id === action.sectionId
        ? {
            ...sec,
            questions: sec.questions.reduce((newQuestions, question, index) => {
              if (question.id === action.questionId) {
                deletedQuestionIndex = index;
              }
              return question.id !== action.questionId
                ? [
                    ...newQuestions,
                    {
                      ...question,
                      questionIndex:
                        index > deletedQuestionIndex
                          ? question.questionIndex - 1
                          : question.questionIndex,
                    },
                  ]
                : newQuestions;
            }, []),
          }
        : { ...sec },
    ],
    []
  );

  return updateObject(state, {
    fullSurvey: { ...state.fullSurvey, questionSections: updatedSection },
    error: false,
    errorMessage: "",
  });
};

// ================== survey response =========================

const getResponses = (state, action) => {
  return updateObject(state, {
    responses: action.responses,
  });
};

const getResponse = (state, action) => {
  return updateObject(state, {
    response: action.response,
  });
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

const removeResponse = (state, action) => {
  const responses = state.responses ? state.responses : [];

  if (responses.length < 1) return state;

  const updatedResponses = responses.filter(
    (res) => Number(res.id) !== Number(action.responseId)
  );

  return updateObject(state, {
    responses: updatedResponses,
  });
};

// ================== error =========================

const fetchSurveysFailed = (state, action) => {
  return updateObject(state, {
    [`${exprInit.abbrInit.ERROR}`]: action[`${exprInit.abbrInit.ERROR}`],
  });
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

    case actionTypes.GET_OPEN_SURVEY_LIST:
      return getOpenSurvList(state, action);

    case actionTypes.GET_USER_SURVEY_LIST:
      return getUserSurveyList(state, action);
    case actionTypes.GET_FULL_SURVEY:
      return getFullSurvey(state, action);
    case actionTypes.ADD_SURVEY:
      return addSurvey(state, action);
    case actionTypes.UPDATE_SURVEY:
      return updateSurvey(state, action);
    case actionTypes.DELETE_SURVEY:
      return deleteSurvey(state, action);

    // survey > section

    case actionTypes.UPDATE_SECTION:
      return updateSection(state, action);
    case actionTypes.ADD_SECTION:
      return addSection(state, action);
    case actionTypes.UPDATE_SECTION_INDEX:
      return updateSectionIndex(state, action);
    case actionTypes.DELETE_SECTION:
      return deleteSection(state, action);

    // survey > section > question
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
    // Error
    case actionTypes.FETCH_SURVEYS_FAILED:
      return fetchSurveysFailed(state, action);

    // default
    default:
      return state;
  }
};

export default reducer;
