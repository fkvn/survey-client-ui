import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import { Card, Form } from "react-bootstrap";

import AlertDismissible from "../../Components/Alert/AlertDismissible";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb/CustomBreadcrumb";
import ResponseSummaryBuilder from "../ResponseBuilder_v2/ResponseSummaryBuilder";
import IconButton from "../../Components/CustomButton/IconButton";
import NotFoundPage from "../../NotFoundPage";
import IndividualResponse from "../../Components/Responses/IndividualResponseResult/IndividualResponse";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import * as funcs from "../../shared/utility";
import QuestionSummaryBuilder from "./QuestionSummaryBuilder";
import ResponseGroupBuilder from "./ResponseGroupBuilder";

function ResponseControllerBuilder() {
  console.log("response builder");

  // ====================== default variables ==========================
  const defaultMessage = {
    type: "info",
    heading: "",
    msg: "This is an alert message!",
  };

  const dangerMessage = {
    type: "danger",
    heading: "Opps! Something has went wrong",
    msg: "",
  };

  const { sId, resId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // ====================== redux store variables ==========================
  const survey = useSelector((state) => state.surveyBuilder.fullSurvey);
  const response = useSelector((state) => state.surveyBuilder.response);
  const hasError = useSelector((state) => state.surveyBuilder.err);
  const errMsg = useSelector((state) => state.surveyBuilder.errMsg);

  // ====================== declared variables ==========================

  let breadcumbItems = [
    {
      title: "My Surveys",
      onClick: () => history.push(`/dashboard/mysurveys`),
    },
  ];

  // ====================== init hook functions =====================

  const initSurvey = (sId) =>
    dispatch(actionCreators.initFullSurvey(Number(sId)));
  const initResponse = (sId, resId) =>
    dispatch(actionCreators.getResponse(Number(sId), Number(resId)));

  // ====================== hooks ==================================

  useEffect(() => {
    if (
      !survey ||
      (survey && Number(survey.id) !== Number(sId)) ||
      (survey && funcs.isEmpty(survey))
    ) {
      initSurvey(sId);
    } else if (
      resId &&
      resId !== "questionSummary" &&
      resId !== "groups" &&
      (!response ||
        (response && Number(resId) !== Number(response.id)) ||
        (response && funcs.isEmpty(response)))
    ) {
      initResponse(sId, resId);
    }
  });

  // ====================== updating breadcumbItems ======================

  if (survey && survey.id && survey.name) {
    breadcumbItems = [
      ...breadcumbItems,
      {
        title: survey.name,
        onClick: () =>
          history.push(
            `/dashboard/mysurveys/survey?sId=${survey && survey.id}`
          ),
      },
      {
        title: "responses",
        onClick: () =>
          history.push(
            `/dashboard/mysurveys/survey/${survey && survey.id}/responses`
          ),
      },
    ];
  }

  if (
    resId &&
    resId !== "questionSummary" &&
    resId !== "groups" &&
    response &&
    response.id &&
    response.type
  ) {
    const title = `${funcs.toSentenceCase(
      response.type
    )} <span class="text-dark"> (${response.date})</span>`;

    breadcumbItems = [...breadcumbItems, { title: title }];
  }

  if (resId === "questionSummary") {
    breadcumbItems = [
      ...breadcumbItems,
      {
        title: "question summary",
      },
    ];
  }

  // ====================== components ==============================

  const SiteAlert = () => {
    let show = false;

    let type = defaultMessage.type;
    let heading = defaultMessage.heading;
    let msg = defaultMessage.msg;

    if (hasError) {
      show = true;
      type = dangerMessage.type;
      heading = dangerMessage.heading;

      if (errMsg) {
        switch (errMsg) {
          case "Request failed with status code 400":
            msg = "The request is either invalid or unavailable!!!";
            break;

          default:
            msg = errMsg;
            break;
        }
      }
    }

    return (
      <>
        {show && <AlertDismissible type={type} heading={heading} msg={msg} />}
      </>
    );
  };

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

  // =========================== Display ============================

  const MainDisplay = () => {
    return (
      <>
        <SiteAlert />
        <Breadcrumb breadcumbItems={breadcumbItems} />

        <Switch>
          <Route path="/dashboard/mysurveys/survey/:sId/responses" exact strict>
            <ResponseSummaryBuilder survey={survey} />
          </Route>
          <Route
            path="/dashboard/mysurveys/survey/:sId/responses/groups"
            exact
            strict
          >
            <ResponseGroupBuilder survey={survey} />
          </Route>
          <Route
            path="/dashboard/mysurveys/survey/:sId/responses/questionSummary"
            exact
            strict
          >
            {survey && <QuestionSummaryBuilder survey={survey} />}
          </Route>
          <Route
            path="/dashboard/mysurveys/survey/:sId/responses/:resId"
            exact
            strict
          >
            <IndividualResponse survey={survey} response={response} />
            {/* {!funcs.isEmpty(response) && !funcs.isEmpty(survey) ? (
              <IndividualResponse survey={survey} response={response} />
            ) : (
              <NotFoundPage />
            )} */}
          </Route>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </>
      // ) : (
      //   <>
      //     <ReactLoading type={"bars"} color={"black"} />
      //   </>
      // )}
      // </>
    );
  };

  return (
    <div className="m-5">
      <MainDisplay />
    </div>
  );
}

export default ResponseControllerBuilder;
