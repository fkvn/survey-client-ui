import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import ReactLoading from "react-loading";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import * as funcs from "../../shared/utility";

import AlertDismissible from "../../Components/Alert/AlertDismissible";
import NotFoundPage from "../../NotFoundPage";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb/CustomBreadcrumb";
import ResponseSummaryBuilder from "./ResponseSummaryBuilder";
import ResponseIndividualBuilder from "./ResponseIndividualBuilder";

function ResponseControllerBuilder() {
  const history = useHistory();
  const { sId, resId } = useParams();
  const surveyId = Number(sId);

  const dispatch = useDispatch();

  const survey = useSelector((state) => state.surveyBuilder.fullSurvey);

  const SURVEY_NOT_FOUND_ERROR = {
    type: "danger",
    heading: "Oop! Something has went wrong!",
    msg: "SURVEY NOT FOUND",
  };

  const INIT_BREADCUMB_ITEMS = [
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

  const [request, setRequest] = useState({
    breadcumbItems: [],
    showSiteMsg: false,

    siteMsg: {
      type: "info",
      heading: "",
      msg: "This is an alert message!",
    },
  });

  useEffect(() => {
    if (surveyId && !survey) {
      setTimeout(() => dispatch(actionCreators.initFullSurvey(surveyId), 50));
    }
  });

  if (
    survey &&
    (request.breadcumbItems.length === 0 ||
      (!Number(resId) &&
        request.breadcumbItems.length > INIT_BREADCUMB_ITEMS.length))
  ) {
    setRequest({ ...request, breadcumbItems: [...INIT_BREADCUMB_ITEMS] });
  }

  const resetMsg = () => {
    setRequest({
      ...request,
      showSiteMsg: false,

      siteMsg: {
        type: "info",
        heading: "",
        msg: "",
      },
    });
  };

  if (!surveyId || (surveyId && !survey)) {
    if (!request.showSiteMsg) {
      setRequest({
        ...request,
        showSiteMsg: true,
        siteMsg: { ...SURVEY_NOT_FOUND_ERROR },
      });
    }
  } else {
    if (
      request.showSiteMsg &&
      request.siteMsg.msg === SURVEY_NOT_FOUND_ERROR.msg
    ) {
      resetMsg();
    }
  }

  const siteMsgComp = request.showSiteMsg ? (
    <AlertDismissible
      // component will be re-render cuz state is upddated when user click close
      type={request.siteMsg.type}
      heading={request.siteMsg.heading}
      msg={request.siteMsg.msg}
    >
      {" "}
    </AlertDismissible>
  ) : null;

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

  return (
    <div className="m-5 ">
      {surveyId && !funcs.isEmpty(survey) && surveyId === Number(survey.id) ? (
        <>
          <Breadcrumb breadcumbItems={request.breadcumbItems} />
          {siteMsgComp}
          <Switch>
            <Route
              path="/dashboard/mysurveys/survey/:sId/responses"
              exact
              strict
            >
              <ResponseSummaryBuilder survey={survey} />
            </Route>
            <Route
              path="/dashboard/mysurveys/survey/:sId/responses/:resId"
              exact
              strict
            >
              <ResponseIndividualBuilder
                survey={survey}
                currentBreadcumbItems={request.breadcumbItems}
                updateBreadcumb={(item) =>
                  setRequest({
                    ...request,
                    breadcumbItems: [
                      ...request.breadcumbItems,
                      { title: item.title, onClick: item.onClick },
                    ],
                  })
                }
              />
            </Route>
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </>
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </div>
  );
}

export default ResponseControllerBuilder;
