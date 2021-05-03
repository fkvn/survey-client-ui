import * as actionTypes from "./actionTypes";
import * as exprt from "../../../shared/export";
import { QUESTION_SUMMARIES } from "../../../shared/properties";

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
export const getOpenSurvyes = (openSurveys) => {
  return {
    type: actionTypes.GET_OPEN_SURVEYS,
    [`${exprt.props.SURVEY_LIST}`]: openSurveys,
  };
};

export const getUserSurveys = (userSurveys) => {
  return {
    type: actionTypes.GET_USER_SURVEYS,
    [`${exprt.props.SURVEY_LIST}`]: userSurveys,
  };
};

export const getFullSurvey = (fullSurvey) => {
  return {
    type: actionTypes.GET_FULL_SURVEY,
    [`${exprt.props.SURVEY}`]: fullSurvey,
  };
};

export const addSurvey = (createdSurvey) => {
  return {
    type: actionTypes.ADD_SURVEY,
    [`${exprt.props.SURVEY}`]: createdSurvey,
  };
};

export const updateSurvey = (updatedSurvey) => {
  return {
    type: actionTypes.UPDATE_SURVEY,
    [`${exprt.props.SURVEY}`]: updatedSurvey,
  };
};

export const publishSurvey = () => {
  return {
    type: actionTypes.PUBLISH_SURVEY,
  };
};

export const closeSurvey = () => {
  return {
    type: actionTypes.CLOSE_SURVEY,
  };
};

export const deleteSurvey = () => {
  return {
    type: actionTypes.DELETE_SURVEY,
  };
};

// =============== survey > section ===============

export const setActiveSection = (section) => {
  return {
    type: actionTypes.SET_ACTIVE_SECTION,
    [`${exprt.props.SECTION}`]: section,
  };
};

export const addSection = (createdSection) => {
  return {
    type: actionTypes.ADD_SECTION,
    [`${exprt.props.SECTION}`]: createdSection,
  };
};

export const updateSection = (updatedSection) => {
  return {
    type: actionTypes.UPDATE_SECTION,
    [`${exprt.props.SECTION}`]: updatedSection,
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
    [`${exprt.props.SECTION_ID}`]: sectionId,
  };
};

// =============== survey > section > question ===============

export const setActiveQuestion = (question) => {
  return {
    type: actionTypes.SET_ACTIVE_QUESTION,
    [`${exprt.props.QUESTION}`]: question,
  };
};

export const addQuestion = (section, newQuestion) => {
  return {
    type: actionTypes.ADD_QUESTION,
    [`${exprt.props.SECTION}`]: section,
    [`${exprt.props.QUESTION}`]: newQuestion,
  };
};

export const updateQuestion = (sectionId, updatedQuestion) => {
  return {
    type: actionTypes.UPDATE_QUESTION,
    [`${exprt.props.SECTION_ID}`]: sectionId,
    [`${exprt.props.QUESTION}`]: updatedQuestion,
  };
};

export const updateQuestionIndex = (sectionId, oldIndex, newIndex) => {
  return {
    type: actionTypes.UPDATE_QUESTION_INDEX,
    [`${exprt.props.SECTION_ID}`]: sectionId,
    oldIndex: oldIndex,
    newIndex: newIndex,
  };
};

export const deleteQuestion = (questionId) => {
  return {
    type: actionTypes.DELETE_QUESTION,
    [`${exprt.props.QUESTION_ID}`]: questionId,
  };
};

// =============== survey > response ===============

export const getResponses = (responses) => {
  return {
    type: actionTypes.GET_RESPONSES,
    [`${exprt.props.RESPONSE_LIST}`]: responses,
  };
};

export const getResponse = (response) => {
  return {
    type: actionTypes.GET_RESPONSE,
    [`${exprt.props.RESPONSE}`]: response,
  };
};

export const addResponse = (surveyId) => {
  return {
    type: actionTypes.ADD_RESPONSE,
    surveyId: surveyId,
  };
};

export const removeResponse = () => {
  return {
    type: actionTypes.REMOVE_REPSONSE,
  };
};

// =============== response groups ===============

export const initResponseGroups = (resGroups) => {
  return {
    type: actionTypes.GET_RESPONSE_GROUPS,
    [`${exprt.props.RESPONSE_GROUP_LIST}`]: resGroups,
  };
};

// =============== question Summaries ===============

export const initQuestionSummaries = (questionSummaries) => {
  return {
    type: actionTypes.GET_QUESTION_SUMMARIES,
    [`${exprt.props.QUESTION_SUMMARIES}`]: questionSummaries,
  };
};

// =============== charts ===============

export const initQuestionAdvanceCharts = (charts) => {
  return {
    type: actionTypes.GET_QUESTION_ADVANCE_CHARTS,
    [`${exprt.props.CHART_LIST}`]: charts,
  };
};

// =============== errors ===============

export const dispatchError = (errMessage, errType) => {
  let message = errMessage;

  if (errMessage === "Network Error") {
    message = "Network Error. Server is not connecting!!!";
  }

  return {
    type: actionTypes.DISPATCH_ERROR,
    [`${exprt.props.ERROR_MESSAGE}`]: message,
    [`${exprt.props.ERROR_TYPE}`]: errType,
  };
};

// =============== attachment objects ===============

export const updateAttachmentObjects = (imgObject) => {
  return {
    type: actionTypes.UPDATE_ATTACHMENT_OBJECTS,
    imgObject: imgObject,
  };
};
