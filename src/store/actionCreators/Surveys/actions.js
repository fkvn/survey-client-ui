import * as actionTypes from "./actionTypes";

/* Description 

  This file implements all actions dispatched by Redux action creators.

  Redux actions are payload information that sent to the store by calling reducer. 

  How it is sent? -> using dispatch method from action creators.
  
  Detailed explanation: 
    Action creators will return a dispatch method which will be sent to the store via Redux reducer. Why we need action? 
    
    For example, assuming we have 1 action creator and 1 action as below: 

    1. Action Creator
      export const actionCreatorExample = () => {
        // function returned by an asynchronous action creator with Redux Thunk
        return (dispatch, getState) => {
          
          // dispatch method to call actions to redux store
          // dispatch an immediate synchronous action to the store by Redux Thunk
          dispatch(actions.someActions());

          // get current state
          console.log('current state:', getState());
        }
      }

    2. Action
      export const someActions = () => {
        return {
          type: actionType
          // data is the information you want to send to the store via reducer
          // to get data from reducer -> action.data
          data: actionData
        };
      }

    -> What is going on here if actionCreatorExample is called? 

    1. actions.someActions(): it will call someActions() and return a action  {type, ...payload} or {type, data} as example above

    2. dispatch(actions.someActions()) would be equal to:
       dispatch(action) or dispatch({type, data})
      -> the action creators will dispatch action ({type, data}) to Redux reducer to update the store.

    3. By using Redux Thunk, we are allowed to call dispatch({type, data}) to the store via reducer. In other words, reducer will receive "dispatch" function from action creators and update the store based on action type and payload.

    4. If we don't use Redux Thunk, it is impossible to run console.log('current state:', getState()) after dispatch.
      
    For example:
      export const actionCreatorExample = () => {
        return dispatch(actions.someActions();
      };

    In conclusion, we can define the usage of action creators and actions as below:
    
    1. Action Creators: Handling information (business logic or sending data to server, etc...) from user and Dispatch action to reducer.

    2. Actions: return action object {type, ...payload} information which would be sending to store by Action Creator.
*/

// =============== survey redux actions ===============

/* 
  @Usage: call redux reducer to update openedSurveys object in redux store
  @Param: openedSurveys from action called
  @Payload: action object with {
      key: openedSurveys
      value: openedSurveys param
  } -> same variable name, but one is from action called, one is to send to redux reducer
*/
export const getOpenedSurvyes = (openedSurveys) => {
  return {
    type: actionTypes.GET_OPENED_SURVEYS,
    openedSurveys: openedSurveys,
  };
};

export const getSurveys = (surveys) => {
  return {
    type: actionTypes.GET_SURVEYS,
    surveys: surveys,
  };
};

export const getFullSurvey = (survey) => {
  return {
    type: actionTypes.GET_FULL_SURVEY,
    fullSurvey: survey,
  };
};

export const addSurvey = () => {
  return {
    type: actionTypes.ADD_SURVEY,
  };
};

export const updateSurvey = (surveyId, fields) => {
  return {
    type: actionTypes.UPDATE_SURVEY,
    surveyId: surveyId,
    updatedFields: { ...fields },
  };
};

export const deleteSurvey = () => {
  return {
    type: actionTypes.DELETE_SURVEY,
  };
};

// =============== survey > section ===============

export const addSection = (section) => {
  return {
    type: actionTypes.ADD_SECTION,
    newSection: section,
  };
};

export const updateSection = (sectionId, fields) => {
  return {
    type: actionTypes.UPDATE_SECTION,
    section: {
      id: sectionId,
      updatedFields: { ...fields },
    },
  };
};

export const updateSectionIndex = (surveyId, oldIndex, newIndex) => {
  return {
    type: actionTypes.UPDATE_SECTION_INDEX,
    surveyId: surveyId,
    oldIndex: oldIndex,
    newIndex: newIndex,
  };
};

export const deleteSection = (sectionId) => {
  return {
    type: actionTypes.DELETE_SECTION,
    sectionId: sectionId,
  };
};

// =============== survey > section > question ===============

export const addQuestion = (surveyId, sectionId, newQuestion) => {
  return {
    type: actionTypes.ADD_QUESTION,
    surveyId: surveyId,
    sectionId: sectionId,
    newQuestion: newQuestion,
  };
};

export const updateQuestion = (sectionId, question) => {
  return {
    type: actionTypes.UPDATE_QUESTION,
    sectionId: sectionId,
    question: question,
  };
};

export const updateQuestionIndex = (sectionId, oldIndex, newIndex) => {
  return {
    type: actionTypes.UPDATE_QUESTION_INDEX,
    sectionId: sectionId,
    oldIndex: oldIndex,
    newIndex: newIndex,
  };
};

export const deleteQuestion = (sectionId, questionId) => {
  return {
    type: actionTypes.DELETE_QUESTION,
    sectionId: sectionId,
    questionId: questionId,
  };
};

// =============== survey > response ===============

export const getResponses = (responses) => {
  return {
    type: actionTypes.GET_RESPONSES,
    responses: responses,
  };
};

export const getResponse = (response) => {
  return {
    type: actionTypes.GET_RESPONSE,
    response: response,
  };
};

export const addResponse = (surveyId) => {
  return {
    type: actionTypes.ADD_RESPONSE,
    surveyId: surveyId,
  };
};

export const removeResponse = (surveyId, responseId) => {
  return {
    type: actionTypes.REMOVE_REPSONSE,
    surveyId: surveyId,
    responseId: responseId,
  };
};

// =============== errors ===============

export const fetchSurveysFailed = (error) => {
  return {
    type: actionTypes.FETCH_SURVEYS_FAILED,
    errMsg: error.message,
  };
};

// =============== attachment objects ===============

export const updateAttachmentObjects = (imgObject) => {
  return {
    type: actionTypes.UPDATE_ATTACHMENT_OBJECTS,
    imgObject: imgObject,
  };
};
