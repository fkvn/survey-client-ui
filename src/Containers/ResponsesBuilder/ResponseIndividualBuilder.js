import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ReactLoading from "react-loading";

import * as funcs from "../../shared/utility";
import * as actionCreators from "../../store/actionCreators/Surveys/index";
import IndividualResponse from "../../Components/Responses/IndividualResponseResult/IndividualResponse";
import { Card, Form } from "react-bootstrap";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb/CustomBreadcrumb";
import IconButton from "../../Components/CustomButton/IconButton";

function ResponseIndividualBuilder(props) {
  const { survey = {} } = props;
  const { sId, resId } = useParams();
  const surveyId = Number(sId);
  const responseId = Number(resId);

  const history = useHistory();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.surveyBuilder.response);

  const ReponseOption = () => {
    const questionSummary = {
      type: "Summary Result",
      title: "Question summary",
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/survey/${survey.id}/responses/questionSummary`
        ),
    };

    const allowedOptions = [{ ...questionSummary }];

    return (
      <>
        {allowedOptions.map((op, i) => (
          <IconButton
            type={op.type}
            title={op.title}
            onClickHandler={op.onClick}
            key={i}
            index={i}
            btnClassName="m-0 p-2"
            disabled={op.disabled ? true : false}
          />
        ))}
      </>
    );
  };

  let breadcumbItems = [
    {
      title: "My Surveys",
      onClick: () => history.push(`/dashboard/mysurveys`),
    },

    {
      title: survey && survey.name ? survey.name : "[Unknown Survey Name]",
      onClick: () =>
        history.push(`/dashboard/mysurveys/survey?sId=${survey && survey.id}`),
    },
    {
      title: "responses",
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/survey/${survey && survey.id}/responses`
        ),
    },
  ];

  const Breadcrumb = ({ breadcumbItems = [] }) => (
    <>
      {breadcumbItems.length > 0 && (
        <Form.Group controlId="titleNavBar">
          <Card.Header className="p-0">
            <CustomBreadcrumb items={breadcumbItems} iconClassname="ml-1" />
            <div className="float-right">
              <ReponseOption />
            </div>
          </Card.Header>
        </Form.Group>
      )}
    </>
  );

  useEffect(() => {
    if (surveyId && funcs.isEmpty(survey)) {
      dispatch(actionCreators.initFullSurvey(sId));
    }

    if (
      responseId &&
      (funcs.isEmpty(response) || Number(responseId) !== Number(response.id))
    ) {
      dispatch(actionCreators.getResponse(surveyId, responseId));
    }
  });

  if (
    responseId &&
    !funcs.isEmpty(response) &&
    Number(responseId) === Number(response.id) &&
    breadcumbItems.length !== 4
  ) {
    const title = `${funcs.toSentenceCase(
      response.type
    )} <span class="text-dark"> (${response.date})</span>`;

    breadcumbItems = [...breadcumbItems, { title: title }];
  }

  return (
    <>
      <Breadcrumb breadcumbItems={breadcumbItems} />
      {!funcs.isEmpty(response) && !funcs.isEmpty(survey) ? (
        <IndividualResponse survey={survey} response={response} />
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}{" "}
    </>
  );
}

export default ResponseIndividualBuilder;
