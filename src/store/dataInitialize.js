import * as exprInit from "../export/exportInit";

export const USER_SURVEY_LIST_INIT = {
  [`${exprInit.abbrInit.FETCHING_DATE}`]: "",
  [`${exprInit.abbrInit.IS_FETCHED}`]: false,
  [`${exprInit.abbrInit.SURVEY_LIST}`]: [],
};

export const OPEN_SURVEY_LIST_INIT = {
  [`${exprInit.abbrInit.FETCHING_DATE}`]: null,
  [`${exprInit.abbrInit.IS_FETCHED}`]: false,
  [`${exprInit.abbrInit.SURVEY_COUNT}`]: 0,
  [`${exprInit.abbrInit.SURVEY_LIST}`]: [],
};

export const SURVEY_INIT = {
  [`${exprInit.abbrInit.FETCHING_DATE}`]: null,
  [`${exprInit.abbrInit.IS_FETCHED}`]: false,
  [`${exprInit.abbrInit.SURVEY_ID}`]: -1,
  [`${exprInit.abbrInit.SURVEY_AUTHOR}`]: "",
  [`${exprInit.abbrInit.SURVEY_NAME}`]: "",
  [`${exprInit.abbrInit.SURVEY_TYPE}`]: "",
  [`${exprInit.abbrInit.SURVEY_DESCRIPTION}`]: "",
  [`${exprInit.abbrInit.SURVEY_DATE_CREATED}`]: "",
  [`${exprInit.abbrInit.SURVEY_DATE_PUBLISHED}`]: "",
  [`${exprInit.abbrInit.SURVEY_IS_ARCHIVED}`]: false,
  [`${exprInit.abbrInit.SURVEY_SECTION_COUNT}`]: 0,
  [`${exprInit.abbrInit.SURVEY_SECTION_LIST}`]: [],
  [`${exprInit.abbrInit.SURVEY_RESPONSE_COUNT}`]: 0,
  [`${exprInit.abbrInit.SURVEY_RESPONSE_LIST}`]: [],
};

export const SECTION_INIT = {
  [`${exprInit.abbrInit.FETCHING_DATE}`]: null,
  [`${exprInit.abbrInit.IS_FETCHED}`]: false,
  [`${exprInit.abbrInit.SURVEY_ID}`]: -1,
  [`${exprInit.abbrInit.SECTION_ID}`]: -1,
  [`${exprInit.abbrInit.SECTION_DESCRIPTION}`]: "",
  [`${exprInit.abbrInit.SECTION_INDEX}`]: -1,
  [`${exprInit.abbrInit.SECTION_QUESTION_LIST}`]: [],
};

export const ERROR_TYPE = {
  [`${exprInit.abbrInit.FETCHING_ERROR}`]: "FETCHING_ERROR",
  [`${exprInit.abbrInit.VALIDATION_ERROR}`]: "VALIDATING_ERROR",
};

export const ERROR_INIT = {
  [`${exprInit.abbrInit.IS_ERROR}`]: false,
  [`${exprInit.abbrInit.ERROR_TYPE}`]: "",
  [`${exprInit.abbrInit.ERROR_MESSAGE}`]: "",
};
