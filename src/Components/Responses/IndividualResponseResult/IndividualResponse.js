import React, { useState } from "react";
import { Card, Nav, Tab } from "react-bootstrap";

import * as funcs from "../../../shared/utility";
import InvQuestionDisplay from "./InvQuestionDisplay";

import * as exprt from "../../../shared/export";
import { useHistory } from "react-router";
import CustomBreadcrumb from "../../CustomBreadcrumb/CustomBreadcrumb";
import IconButton from "../../CustomButton/IconButton";
import DescriptionDisplay from "../../DescriptionDisplay/DescriptionDisplay";
import ReactLoading from "react-loading";

function IndividualResponse(props) {
  const {
    survey = exprt.db.initDb.FULL_SURVEY_INIT,
    response = exprt.db.initDb.FULL_RESPONSE_INIT,
  } = props;

  const [request, setRequest] = useState({
    activeSectionIndex: 0,
  });

  const history = useHistory();
  let isRender = false;

  const breadcumbItems = [
    {
      title: "My Surveys",
      onClick: () => history.push(`/dashboard/mysurveys`),
    },

    {
      title: survey[`${exprt.props.SURVEY_NAME}`],
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/survey?sId=${
            survey[`${exprt.props.SURVEY_ID}`]
          }`
        ),
    },
    {
      title: "responses",
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/survey/${
            survey[`${exprt.props.SURVEY_ID}`]
          }/responses`
        ),
    },
    {
      title: `${funcs.toSentenceCase(response[`${exprt.props.RESPONSE_TYPE}`])} 
              <span class="text-dark"> (${
                response[`${exprt.props.RESPONSE_DATE}`]
              })</span>`,
      onClick: () => window.location.reload(),
    },
  ];

  // ================================= logic flow =========================

  if (
    survey[`${exprt.props.SURVEY_ID}`] > -1 &&
    response[`${exprt.props.RESPONSE_SURVEY_ID}`] ===
      survey[`${exprt.props.SURVEY_ID}`] &&
    response[`${exprt.props.RESPONSE_ID}`] > -1
  ) {
    isRender = true;
  }

  // ================================= sub-components =========================

  const ReponseOption = () => {
    const questionSummary = {
      type: "Summary Result",
      title: "Question summary",
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/survey/${
            survey[`${exprt.props.SURVEY_ID}`]
          }/responses/questionSummary`
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

  const breadcrumb = (
    <CustomBreadcrumb items={breadcumbItems} iconClassname="ml-1">
      <ReponseOption />
    </CustomBreadcrumb>
  );

  const responseSummary = (
    <>
      <Card
        as={Tab.Container}
        className="border-0"
        // defaultActiveKey={0}
        activeKey={request.activeSectionIndex}
        onSelect={(key) => setRequest({ ...request, activeSectionIndex: key })}
        transition={false}
      >
        <Card.Header
          as={Nav}
          variant="tabs"
          className="mx-2 mt-5 p-0 border-bottom"
        >
          {response[`${exprt.props.RESPONSE_SECTION_LIST}`].map((_, index) => (
            <Nav.Item key={index}>
              <Nav.Link eventKey={index}>Section {index + 1}</Nav.Link>
            </Nav.Item>
          ))}
        </Card.Header>
        {/* render content based on request.activeSectionIndex */}
        <Card.Body as={Tab.Content} className="">
          <Tab.Pane eventKey={request.activeSectionIndex}>
            <DescriptionDisplay
              description={
                response[`${exprt.props.RESPONSE_SECTION_LIST}`][
                  request.activeSectionIndex
                ][`${exprt.props.RESPONSE_SECTION_DESCRIPTION}`]
              }
              title="section"
            />
            <div className="m-4 mt-5">
              <InvQuestionDisplay
                questions={
                  survey[`${exprt.props.SECTION_LIST}`][
                    request.activeSectionIndex
                  ][`${exprt.props.QUESTION_LIST}`]
                }
                answers={
                  response[`${exprt.props.RESPONSE_SECTION_LIST}`][
                    request.activeSectionIndex
                  ][`${exprt.props.ANSWER_LIST}`]
                }
              />
            </div>
          </Tab.Pane>
        </Card.Body>
      </Card>
    </>
  );

  const returnRender = (
    <>
      {breadcrumb}
      {response[`${exprt.props.RESPONSE_SECTION_LIST}`].length > 0 ? (
        responseSummary
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );

  return isRender && returnRender;
}

export default IndividualResponse;
