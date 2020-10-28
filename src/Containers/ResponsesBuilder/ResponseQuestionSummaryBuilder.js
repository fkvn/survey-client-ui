import React from "react";
import { Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb/CustomBreadcrumb";

import * as funcs from "../../shared/utility";

function ResponseQuestionSummaryBuilder(props) {
  const { survey = {} } = props;

  const history = useHistory();

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
          </Card.Header>
        </Form.Group>
      )}
    </>
  );

  const MainDisplay = () => {
    return (
      <>
        <p>Question Summray</p>
      </>
    );
  };

  return (
    <>
      <Breadcrumb breadcumbItems={breadcumbItems} />
      {!funcs.isEmpty(survey) && <MainDisplay />}
    </>
  );
}

export default ResponseQuestionSummaryBuilder;
