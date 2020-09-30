/* eslint-disable key-spacing */
/* eslint-disable object-curly-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable quote-props */
import axios from "../../../axios-surveyservice";
import * as actions from "./actions";

/* Description
   
  This file implements asynchronous action creators with Redux Thunk

  Those action creators will return function with:
    1. Dispatch method from the state
    2. getState method -> current stores value can be read
   
  For example:
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
*/

// =============== survey redux action creators ===============

export const initPublishedSurveys = () => {
  return (dispatch) => {
    axios
      .get("/surveys/opened")
      .then((response) => {
        dispatch(actions.getOpenedSurvyes(response.data ? response.data : []));
      })
      .catch((error) => {
        dispatch(actions.fetchSurveysFailed(error));
      });
  };
};

// need authorization
export const initSurveys = () => {
  return (dispatch) => {
    axios
      .get("/surveys")
      .then((response) => {
        dispatch(actions.getSurveys(response.data));
      })
      .catch((error) => {
        dispatch(actions.fetchSurveysFailed(error));
      });
  };
};

export const initFullSurvey = (surveyId) => {
  return async (dispatch) => {
    const fullSurvey = await axios
      .get("/surveys/" + surveyId)
      .catch((error) => {
        dispatch(actions.fetchSurveysFailed(error));
      });

    if (fullSurvey) {
      dispatch(actions.getFullSurvey(fullSurvey.data));
    }
  };
};

export const addSurvey = (newSurvey) => {
  return async (dispatch) => {
    let newSurveyID = await axios
      .post(`/surveys`, { ...newSurvey })
      .catch((error) => {
        dispatch(actions.fetchSurveysFailed(error));
      });

    if (newSurveyID) {
      newSurveyID = newSurveyID.data;

      const addSectionRequests = new Array(newSurvey.numberOfSections);

      let addSectionSucess = true;

      for (let i = 0; i < addSectionRequests.length; i++) {
        addSectionRequests[i] = await axios.post(
          `surveys/${newSurveyID}/sections`,
          {
            description: "",
          }
        );
      }

      await Promise.all(addSectionRequests).catch(() => {
        addSectionSucess = false;
        axios.delete(`/surveys/${newSurveyID}`).then(() =>
          dispatch(
            actions.fetchSurveysFailed({
              message: "Uncessfully created survey.",
            })
          )
        );
      });

      if (addSectionSucess) {
        dispatch(actions.addSurvey());
        return newSurveyID;
      }
    }
  };
};

export const updateSurvey = (surveyId, fields) => {
  return (dispatch) => {
    return axios
      .patch(`/surveys/${surveyId}`, { ...fields })
      .then((id) => {
        dispatch(actions.updateSurvey(surveyId, fields));
        return id.data;
      })
      .catch((error) => {
        dispatch(actions.fetchSurveysFailed(error));
      });
  };
};

export const deleteSurvey = (surveyId) => {
  return (dispatch) => {
    return axios
      .delete(`/surveys/${surveyId}`)
      .then(() => {
        dispatch(actions.deleteSurvey());
      })
      .catch((error) => dispatch(actions.fetchSurveysFailed(error)));
  };
};

// =============== survey > section ===============

export const addSection = (surveyId, newSection) => {
  return (dispatch) => {
    return axios
      .post(`/surveys/${surveyId}/sections`, { ...newSection })
      .then(async (id) => {
        return axios
          .get(`/surveys/${surveyId}/sections/${id.data}`)
          .then(async (section) => {
            dispatch(actions.addSection(section.data));
            return section.data;
          })
          .catch((error) => dispatch(actions.fetchSurveysFailed(error)));
      })
      .catch((error) => dispatch(actions.fetchSurveysFailed(error)));
  };
};

export const updateSection = (surveyId, sectionId, fields) => {
  return (dispatch) => {
    return axios
      .patch(`/surveys/${surveyId}/sections/${sectionId}`, { ...fields })
      .then(() => dispatch(actions.updateSection(sectionId, fields)))
      .catch((error) => dispatch(actions.fetchSurveysFailed(error)));
  };
};

export const deleteSection = (surveyId, sectionId) => {
  return (dispatch) => {
    return axios
      .delete(`/surveys/${surveyId}/sections/${sectionId}`)
      .then(() => dispatch(actions.deleteSection(sectionId)))
      .catch((error) => dispatch(actions.fetchSurveysFailed(error)));
  };
};

// =============== survey > section > question ===============

export const addQuestion = (surveyId, sectionId, newQuestion, files) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("question", JSON.stringify(newQuestion));

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    let newQuestionId = await axios({
      url: `surveys/${surveyId}/sections/${sectionId}/questions`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    }).catch((error) => {
      dispatch(actions.fetchSurveysFailed(error));
    });

    if (newQuestionId) {
      newQuestionId = newQuestionId.data;
      return axios
        .get(
          `surveys/${surveyId}/sections/${sectionId}/questions/${newQuestionId}`
        )
        .then((newQuestion) => {
          dispatch(actions.addQuestion(surveyId, sectionId, newQuestion.data));
          return newQuestion.data;
        })
        .catch((error) => dispatch(actions.fetchSurveysFailed(error)));
    }
  };
};

export const updateQuestion = (
  surveyId,
  sectionId,
  questionId,
  question,
  files
) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append("question", JSON.stringify(question));

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    return axios({
      url: `/surveys/${surveyId}/sections/${sectionId}/questions/${questionId}`,
      method: "put",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    })
      .then((response) => {
        return axios
          .get(
            `/surveys/${surveyId}/sections/${sectionId}/questions/${response.data}`
          )
          .then((updatedQuestion) => {
            dispatch(actions.updateQuestion(sectionId, updatedQuestion.data));

            return updatedQuestion.data;
          })
          .catch((error) => dispatch(actions.fetchSurveysFailed(error)));
      })
      .catch((error) => dispatch(actions.fetchSurveysFailed(error)));
  };
};

export const updateQuestionIndex = (
  surveyId,
  sectionId,
  questionId,
  oldIndex,
  newIndex
) => {
  return (dispatch) => {
    axios
      .put(
        `/surveys/${surveyId}/sections/${sectionId}/questions/${questionId}/index`,
        { index: newIndex }
      )
      .then(() =>
        dispatch(
          actions.updateQuestionIndex(sectionId, questionId, oldIndex, newIndex)
        )
      )
      .catch((error) => dispatch(actions.fetchSurveysFailed(error)));
  };
};

export const deleteQuestion = (surveyId, sectionId, questionId) => {
  return (dispatch) => {
    return axios
      .delete(
        `/surveys/${surveyId}/sections/${sectionId}/questions/${questionId}`
      )
      .then(() => dispatch(actions.deleteQuestion(sectionId, questionId)))
      .catch((error) => dispatch(actions.fetchSurveysFailed(error)));
  };
};

// =============== survey > response ===============

export const addResponse = (surveyId, response) => {
  return async (dispatch) => {
    const newResponse = await axios
      .post(`surveys/${surveyId}/responses`, { ...response })
      .catch((error) => dispatch(actions.fetchSurveysFailed(error)));

    if (newResponse) {
      dispatch(actions.addResponse(surveyId));
    }

    return newResponse.data;
  };
};

export const updateAttachmentObjects = (imgObject) => {
  return (dispatch) => {
    dispatch(actions.updateAttachmentObjects(imgObject));
  };
};
