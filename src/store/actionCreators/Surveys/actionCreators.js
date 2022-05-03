/* eslint-disable key-spacing */
/* eslint-disable object-curly-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable quote-props */
import axios from "../../../axios-surveyservice";
import * as actions from "./actions";
import * as exprt from "../../../shared/export";

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

export const initOpenSurveys = () => {
	return (dispatch) => {
		// dispatch(actions.getOpenSurvyes(exprt.db.sampleDb.SAMPLE_SURVEY_LIST));
		axios
			.get("/surveys/open")
			.then((response) => {
				dispatch(actions.getOpenSurvyes(response.data));
			})
			.catch((error) => {
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				);
			});
	};
};

export const initUserSurveys = () => {
	return (dispatch) => {
		// dispatch(actions.getUserSurveys(exprt.db.sampleDb.SAMPLE_SURVEY_LIST));
		axios
			.get("/surveys")
			.then((response) => {
				dispatch(actions.getUserSurveys(response.data));
			})
			.catch((error) => {
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				);
			});
	};
};

export const initFullSurvey = (surveyId) => {
	return (dispatch) => {
		// dispatch(actions.getFullSurvey(exprt.db.sampleDb.SAMPLE_FULL_SURVEY));
		axios
			.get("/surveys/" + surveyId)
			.then((response) => {
				dispatch(actions.getFullSurvey(response.data));
			})
			.catch((error) => {
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				);
			});
	};
};

export const addSurvey = (newSurvey) => {
	return async (dispatch) => {
		let newSurveyID = await axios
			.post(`/surveys`, { ...newSurvey })
			.catch((error) => {
				dispatch(actions.dispatchError(error));
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
						actions.dispatchError({
							message: "Uncessfully created survey.",
						})
					)
				);
			});

			if (addSectionSucess) {
				const createdSurvey = {
					[`${exprt.props.SURVEY_ID}`]: newSurveyID,
					...exprt.db.initDb.FULL_SURVEY_INIT,
					...newSurvey,
				};
				dispatch(actions.addSurvey(createdSurvey));
				return newSurveyID;
			}
		}
	};
};

export const updateSurvey = (survey, fields) => {
	return (dispatch) => {
		// dispatch(actions.updateSurvey(updatedSurvey));
		axios
			.patch(`/surveys/${survey[`${exprt.props.SURVEY_ID}`]}`, { ...fields })
			.then(() => {
				const updatedSurvey = {
					...survey,
					...fields,
				};
				dispatch(actions.updateSurvey(updatedSurvey));
			})
			.catch((error) => {
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				);
			});
	};
};

export const publishSurvey = (survey, fields) => {
	return async (dispatch) => {
		// dispatch(actions.publishSurvey());
		axios
			.patch(`/surveys/${survey[`${exprt.props.SURVEY_ID}`]}`, { ...fields })
			.then(() => {
				dispatch(actions.publishSurvey());
			})
			.catch((error) => {
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				);
			});
	};
};

export const closeSurvey = (survey, fields) => {
	return async (dispatch) => {
		// dispatch(actions.closeSurvey());
		axios
			.patch(`/surveys/${survey[`${exprt.props.SURVEY_ID}`]}`, { ...fields })
			.then(() => {
				dispatch(actions.closeSurvey());
			})
			.catch((error) => {
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				);
			});
	};
};

export const deleteSurvey = (surveyId) => {
	return async (dispatch) => {
		// dispatch(actions.deleteSurvey());
		axios
			.delete(`/surveys/${surveyId}`)
			.then(() => {
				dispatch(actions.deleteSurvey());
			})
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

// =============== survey > section ===============

export const setActiveSection = (section) => {
	return (dispatch) => {
		dispatch(actions.setActiveSection(section));
	};
};

export const addSection = (surveyId, newSection) => {
	return (dispatch) => {
		// const returnID = Math.floor(Math.random() * 100);

		// const createdSection = {
		//   ...exprt.db.initDb.SECTION_INIT,
		//   [`${exprt.props.SECTION_ID}`]: returnID,
		//   ...newSection,
		// };

		// dispatch(actions.addSection(createdSection));

		return axios
			.post(`/surveys/${surveyId}/sections`, { ...newSection })
			.then(async (res) => {
				const createdSection = {
					...exprt.db.initDb.SECTION_INIT,
					[`${exprt.props.SECTION_ID}`]: res.data,
					...newSection,
				};

				dispatch(actions.addSection(createdSection));
			})
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

export const updateSection = (surveyId, section, fields) => {
	return (dispatch) => {
		// const updatedSection = {
		//   ...section,
		//   ...fields,
		// };

		// dispatch(actions.updateSection(updatedSection));

		return axios
			.patch(
				`/surveys/${surveyId}/sections/${section[`${exprt.props.SECTION_ID}`]}`,
				{ ...fields }
			)
			.then((res) => {
				const updatedSection = {
					...section,
					[`${exprt.props.SECTION_ID}`]: res.data,
					...fields,
				};
				dispatch(actions.updateSection(updatedSection));
			})
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

export const updateSectionIndex = (surveyId, sectionId, oldIndex, newIndex) => {
	return (dispatch) => {
		// console.log("update Index");
		// console.log(oldIndex);
		// console.log(newIndex);

		// dispatch(actions.updateSectionIndex(surveyId, oldIndex, newIndex));

		axios
			.put(`/surveys/${surveyId}/sections/${sectionId}/index`, {
				index: newIndex,
			})
			.then(() =>
				dispatch(actions.updateSectionIndex(surveyId, oldIndex, newIndex))
			)
			.catch((error) => dispatch(actions.dispatchError(error)));
	};
};

export const deleteSection = (surveyId, sectionId) => {
	return (dispatch) => {
		// dispatch(actions.deleteSection(sectionId));
		axios
			.delete(`/surveys/${surveyId}/sections/${sectionId}`)
			.then(() => dispatch(actions.deleteSection(sectionId)))
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

// =============== survey > section > question ===============

export const setActiveQuestion = (question) => {
	return (dispatch) => {
		dispatch(actions.setActiveQuestion(question));
	};
};

export const addQuestion = (surveyId, section, newQuestion, files) => {
	return async (dispatch) => {
		// const id = Math.floor(Math.random() * 100);
		// dispatch(actions.addQuestion(section, updatedQuestion));

		const formData = new FormData();
		formData.append("question", JSON.stringify(newQuestion));

		for (let i = 0; i < files.length; i++) {
			formData.append("files", files[i]);
		}

		const sectionId = section[`${exprt.props.SECTION_ID}`];

		let newQuestionId = await axios({
			url: `surveys/${surveyId}/sections/${sectionId}/questions`,
			method: "post",
			data: formData,
			headers: {
				"Content-Type": "multipart/form-data;",
			},
		}).catch((error) => {
			dispatch(
				actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
			);
		});

		if (newQuestionId) {
			newQuestionId = newQuestionId.data;
			axios
				.get(
					`surveys/${surveyId}/sections/${sectionId}/questions/${newQuestionId}`
				)
				.then((newQuestion) => {
					const updatedQuestion = {
						...exprt.db.initDb.QUESTION_INIT,
						...newQuestion.data,
					};
					dispatch(actions.addQuestion(section, updatedQuestion));
				})
				.catch((error) =>
					dispatch(
						actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
					)
				);
		}
	};
};

export const updateQuestion = (
	surveyId,
	sectionId,
	questionId,
	updatedFields,
	files
) => {
	return (dispatch) => {
		// const updatedQuestion = {
		//   ...exprt.db.initDb.QUESTION_INIT,
		//   [`${exprt.props.QUESTION_ID}`]: questionId,
		//   ...updatedFields,
		// };

		// dispatch(actions.updateQuestion(sectionId, updatedQuestion));

		const formData = new FormData();
		formData.append("question", JSON.stringify(updatedFields));

		for (let i = 0; i < files.length; i++) {
			formData.append("files", files[i]);
		}

		axios({
			url: `/surveys/${surveyId}/sections/${sectionId}/questions/${questionId}`,
			method: "put",
			data: formData,
			headers: {
				"Content-Type": "multipart/form-data;",
			},
		})
			.then((response) => {
				axios
					.get(
						`/surveys/${surveyId}/sections/${sectionId}/questions/${response.data}`
					)
					.then((res) => {
						const updatedQuestion = {
							...exprt.db.initDb.QUESTION_INIT,
							...res.data,
						};
						dispatch(actions.updateQuestion(sectionId, updatedQuestion));
					})
					.catch((error) =>
						dispatch(
							actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
						)
					);
			})
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

export const updateQuestionIndex = (
	surveyId,
	sectionId,
	questionId,
	oldIndex,
	newIndex
) => {
	return async (dispatch) => {
		// return dispatch(actions.updateQuestionIndex(sectionId, oldIndex, newIndex));
		axios
			.put(
				`/surveys/${surveyId}/sections/${sectionId}/questions/${questionId}/index`,
				{ index: newIndex }
			)
			.then(() =>
				dispatch(actions.updateQuestionIndex(sectionId, oldIndex, newIndex))
			)
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

export const deleteQuestion = (surveyId, sectionId, questionId) => {
	return (dispatch) => {
		// dispatch(actions.deleteQuestion(questionId));

		axios
			.delete(
				`/surveys/${surveyId}/sections/${sectionId}/questions/${questionId}`
			)
			.then(() => dispatch(actions.deleteQuestion(questionId)))
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

// =============== survey > response ===============

export const getResponses = (surveyId) => {
	return (dispatch) => {
		// dispatch(actions.getResponses(exprt.db.sampleDb.SAMPLE_RESPONSE_LIST));
		axios
			.get(`surveys/${surveyId}/responses`)
			.then((responses) => dispatch(actions.getResponses(responses.data)))
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

export const getResponse = (surveyId, responseId) => {
	return (dispatch) => {
		// dispatch(actions.getResponse(exprt.db.sampleDb.SAMPLE_FULL_RESPONSE));

		return axios
			.get(`surveys/${surveyId}/responses/${responseId}`)
			.then((response) => {
				dispatch(actions.getResponse(response.data));
				return response.data;
			})
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

export const addResponse = (surveyId, response) => {
	return (dispatch) => {
		return axios
			.post(`surveys/${surveyId}/responses`, { ...response })
			.then(() => {
				return true;
			})
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

export const removeResponse = (surveyId, responseId) => {
	return async (dispatch) => {
		axios
			.delete(`surveys/${surveyId}/responses/${responseId}`)
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

// =============== response Groups ==================

export const initResponseGroups = (surveyId) => {
	return (dispatch) => {
		axios
			.get(`responseGroups/surveys/${surveyId}`)
			.then((resGroup) => dispatch(actions.initResponseGroups(resGroup.data)))
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

export const addResponseGroup = (resGroup) => {
	return (dispatch) => {
		axios
			.post(`responseGroups`, { ...resGroup })
			.then(() => {
				return true;
			})
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

export const addResponseGroupAutoYear = (surveyId, resGroup) => {
	return (dispatch) => {
		axios
			.post(`responseGroups/survey/${surveyId}/years`, { ...resGroup })
			.then(() => {
				return true;
			})
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

export const deleteResponseGroup = (resGroupId) => {
	return async (dispatch) => {
		axios
			.delete(`responseGroups/${resGroupId}`)
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

// =============== question Summaries ===============

export const initQuestionSummaries = (surveyId) => {
	return (dispatch) => {
		// dispatch(
		//   actions.initQuestionSummaries(exprt.db.sampleDb.SAMPLE_QUESTION_SUMMARY)
		// );
		axios
			.get(`surveys/${surveyId}/questionResultSummaries`)
			.then((qrs) => dispatch(actions.initQuestionSummaries(qrs.data)))
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

// =============== charts ===============

export const initQuestionAdvanceCharts = (questionId) => {
	return (dispatch) => {
		// dispatch(
		//   actions.initQuestionAdvanceCharts(
		//     exprt.db.sampleDb.SAMPLE_QUESTION_ADVANCE_CHARTS
		//   )
		// );
		axios
			.get(`questions/${questionId}/resGroups/charts`)
			.then((charts) =>
				dispatch(actions.initQuestionAdvanceCharts(charts.data))
			)
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

export const addChart = (questionId, chartInfo) => {
	return async (dispatch) => {
		return axios
			.post(`questions/${questionId}/resGroups/charts`, { ...chartInfo })
			.then((chartInfo) => {
				return chartInfo.data;
			})
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

export const updateChart = (questionId, chartId, chartInfo) => {
	return async (dispatch) => {
		return axios
			.put(`questions/${questionId}/resGroups/charts/${chartId}`, {
				...chartInfo,
			})
			.then((chartInfo) => {
				return chartInfo.data;
			})
			.catch((error) =>
				dispatch(
					actions.dispatchError(error.message, exprt.props.FETCHING_ERROR)
				)
			);
	};
};

// =============== others ===============
export const updateAttachmentObjects = (imgObject) => {
	return (dispatch) => {
		dispatch(actions.updateAttachmentObjects(imgObject));
	};
};

export const initError = (message, type) => {
	return (dispatch) => {
		dispatch(actions.dispatchError(message, type));
	};
};
