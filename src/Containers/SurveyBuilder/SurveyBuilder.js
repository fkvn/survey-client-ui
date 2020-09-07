import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Jumbotron, Button, Breadcrumb, Row, Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import ReactLoading from "react-loading";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import PublishedSurveys from "../../Components/Surveys/PublishedSurveys";
import AlertDismissible from "../../Components/Alert/AlertDismissible";

function SurveyBuilder() {
  const history = useHistory();

  // dispatch hook to call actions from redux reducer
  const dispatch = useDispatch();

  // retrieving data from redux store
  const openedSurveys = useSelector(
    (state) => state.surveyBuilder.openedSurveys
  );
  const err = useSelector((state) => state.surveyBuilder.err);
  const errMsg = useSelector((state) => state.surveyBuilder.errMsg);

  // component state
  const [request, setRequest] = useState({
    showBanner: true,
    showSiteMsg: false,
  });

  const loading = useRef(true);

  useEffect(() => {
    if (loading.current || !openedSurveys) {
      loading.current = false;
      setTimeout(() => {
        // dispatch re-render request, but state is not updated
        dispatch(actionCreators.initPublishedSurveys());
      }, 500);
    }
  });

  /*  Differences between dispatch request and state request : 
        After calling dispatch, the component 'will be re-rendered immediately'.
        Instead of running rest of component and then re-render again.
        -> re-render immediately + state is not updated (useState won't be called)
        
        On the other hands, for state request (setRequest is called), the component won't be re-rendered right away. Instead, the component will keep rendering the rest of the code and then re-render component again 
        -> re-render at the end + state is updated (useState will be called again)
  */

  const siteMsgComp = err ? (
    <AlertDismissible
      // component will be re-render cuz state is upddated when user click close
      onClose={() => setRequest({ ...request, showSiteMsg: false })}
      type="danger"
      heading="Oh snap! You got an error!"
      msg={errMsg}
    ></AlertDismissible>
  ) : null;

  const banner = request.showBanner ? (
    <Jumbotron className="mb-4 pb-1 pt-4">
      <Row>
        <Col xs={11}>
          <h1>Welcome !!!</h1>
          <p>
            This is a simple survey service, a simple service for creating
            surveys to featured purposes or information.
          </p>
          <p>
            <Button
              variant="primary"
              onClick={() => history.push(`/dashboard`)}
            >
              Dashboard
            </Button>
            <Button
              className="mx-5 my-2"
              variant="success"
              onClick={() => history.push(`/dashboard/mysurveys`)}
            >
              Create Survey
            </Button>
          </p>
        </Col>
        <Col xs={1}>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            // component will be re-render cuz state is upddated when user click close
            onClick={() =>
              setRequest({
                ...request,
                showBanner: false,
              })
            }
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Col>
      </Row>
    </Jumbotron>
  ) : null;

  const titleBar = (
    <Breadcrumb>
      <Breadcrumb.Item active>
        <Link to={"/"}>
          <strong>Open Surveys</strong>
        </Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );

  return (
    <>
      <div className="m-4">
        {siteMsgComp}
        {banner}
        {titleBar}
        {!loading.current && openedSurveys ? (
          <PublishedSurveys surveys={openedSurveys} />
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );
}

export default SurveyBuilder;
