import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form } from "react-bootstrap";
import ReactLoading from "react-loading";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import ResponseSummary from "../../Components/Responses/ResponseSummary";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb/CustomBreadcrumb";
import IconButton from "../../Components/CustomButton/IconButton";

function ResponseSummaryBuilder(props) {
  const { survey = {} } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const responses = useSelector((state) => state.surveyBuilder.responses);

  useEffect(() => {
    if (survey && survey.id && !responses) {
      setTimeout(() => dispatch(actionCreators.getResponses(survey.id)), 500);
    }
  });

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

  const breadcumbItems = [
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

  return (
    <>
      <Breadcrumb breadcumbItems={breadcumbItems} />
      {survey.id && responses ? (
        <ResponseSummary responses={responses} survey={survey} />
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );
}

export default ResponseSummaryBuilder;
