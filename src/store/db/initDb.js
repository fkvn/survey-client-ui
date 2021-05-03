import * as exprt from "../../shared/export";

export const ERROR_INIT = {
  [`${exprt.props.IS_ERROR}`]: false,
  [`${exprt.props.ERROR_MESSAGE}`]: "",
  [`${exprt.props.ERROR_TYPE}`]: "",
};

export const OPEN_SURVEYS_INIT = {
  [`${exprt.props.IS_FETCHED}`]: false,
  [`${exprt.props.SURVEY_LIST}`]: [],
};

export const USER_SURVEYS_INIT = {
  [`${exprt.props.IS_FETCHED}`]: false,
  [`${exprt.props.SURVEY_LIST}`]: [],
};

export const FULL_SURVEY_INIT = {
  [`${exprt.props.IS_FETCHED}`]: false,

  [`${exprt.props.SURVEY_ID}`]: -1,
  [`${exprt.props.SURVEY_NAME}`]: "",
  [`${exprt.props.SURVEY_TYPE}`]: "ANONYMOUS",
  [`${exprt.props.SURVEY_DESCRIPTION}`]: "",

  [`${exprt.props.SURVEY_CREATED_DATE}`]: exprt.funcs.dateFormat(new Date()),
  [`${exprt.props.SURVEY_PUBLISHED_DATE}`]: "",
  [`${exprt.props.SURVEY_CLOSED_DATE}`]: "",
  [`${exprt.props.SURVEY_IS_CLOSED}`]: true,

  [`${exprt.props.SECTION_LIST}`]: [],
  [`${exprt.props.RESPONSE_LIST}`]: [],
};

export const SECTION_INIT = {
  [`${exprt.props.SECTION_ID}`]: -1,
  [`${exprt.props.SECTION_NAME}`]: "",
  [`${exprt.props.SECTION_DESCRIPTION}`]: "",
  [`${exprt.props.SECTION_INDEX}`]: -1,

  [`${exprt.props.QUESTION_LIST}`]: [],
};

export const QUESTION_INIT = {
  [`${exprt.props.QUESTION_ID}`]: -1,
  [`${exprt.props.QUESTION_TYPE}`]: "",

  [`${exprt.props.QUESTION_DESCRIPTION}`]: "",
  [`${exprt.props.QUESTION_ATTACHMENTS}`]: [],
};

export const MC_PROPS_INIT = {
  [`${exprt.props.MC_ANSWERS}`]: [],
  [`${exprt.props.SHOW_ADVANCE_OPTIONS}`]: false,
  [`${exprt.props.MC_MIN_SEL}`]: 0,
  [`${exprt.props.MC_MAX_SEL}`]: 0,
};

export const RK_PROPS_INIT = {
  [`${exprt.props.RK_ANSWERS}`]: [],
};

export const RT_PROPS_INIT = {
  [`${exprt.props.RT_SCALE}`]: 5,
};

export const TXT_PROPS_INIT = {
  [`${exprt.props.TXT_LENGTH}`]: -1,
};

export const SURVEY_RESPONSES_INIT = {
  [`${exprt.props.IS_FETCHED}`]: false,
  [`${exprt.props.RESPONSE_LIST}`]: [],
};

export const RESPONSE_SECTION_INIT = {
  [`${exprt.props.IS_FETCHED}`]: false,

  [`${exprt.props.ANSWER_LIST}`]: [],
};

export const FULL_RESPONSE_INIT = {
  [`${exprt.props.IS_FETCHED}`]: false,

  [`${exprt.props.RESPONSE_SURVEY_ID}`]: -1,
  [`${exprt.props.RESPONSE_ID}`]: -1,
  [`${exprt.props.RESPONSE_TYPE}`]: "ANONYMOUS",
  [`${exprt.props.RESPONSE_DATE}`]: "",
  [`${exprt.props.IS_ARCHIVED}`]: true,

  [`${exprt.props.RESPONSE_SECTION_LIST}`]: [],
};

export const ANSWER_INIT = {
  [`${exprt.props.ANSWER_SECTION_ID}`]: -1,

  [`${exprt.props.ANSWER_ID}`]: -1,
  [`${exprt.props.ANSWER_DESCRIPTION}`]: "",
  [`${exprt.props.ANSWER_TYPE}`]: "",
  [`${exprt.props.ANSWER_ATTACHMENTS}`]: [],
};

export const ANSWER_MC_PROPS_INIT = {
  [`${exprt.props.ANSWER_MC_ANSWERS}`]: [],
};

export const QUESTION_SUMMARIES_INIT = {
  [`${exprt.props.IS_FETCHED}`]: false,
  [`${exprt.props.QUESTION_SUMMARIES}`]: {},
};

export const RESPONSE_GROUPS_INIT = {
  [`${exprt.props.IS_FETCHED}`]: false,
  [`${exprt.props.RESPONSE_GROUP_LIST}`]: [],
};

export const ADVANCE_CHARTS = {
  [`${exprt.props.IS_FETCHED}`]: false,
  [`${exprt.props.CHART_LIST}`]: [],
};
