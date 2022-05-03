import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Jumbotron, Button, Breadcrumb, Row, Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import ReactLoading from "react-loading";

import * as actionCreators from "../../store/actionCreators/Surveys/index";
import OpenSurveys from "../../Components/Surveys/OpenSurveys";

import * as exprt from "../../shared/export";

function SurveyBuilder() {
  // ================================= init ==============================
  const history = useHistory();

  // dispatch hook to call actions from redux reducer
  const dispatch = useDispatch();

  // retrieving data from redux store
  const openSurveys = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.STATE_OPEN_SURVEYS}`]
  );

  // component state
  const [request, setRequest] = useState({
    showBanner: true,
  });

  const loading = useRef(true);

  // ================================= functions ==============================

  const initOpenSurveys = () => {
    setTimeout(() => {
      // dispatch re-render request, but state is not updated
      dispatch(actionCreators.initOpenSurveys());
    }, 500);
  };

  // ================================= hooks ==============================
  useEffect(() => {
    if (loading.current) {
      loading.current = false;
      initOpenSurveys();
    }
  });

  /*  Differences between dispatch request and state request : 
        After calling dispatch, the component 'will be re-rendered immediately'.
        Instead of running rest of component and then re-render again.
        -> re-render immediately + state is not updated (useState won't be called)
        
        On the other hands, for state request (setRequest is called), the component won't be re-rendered right away. Instead, the component will keep rendering the rest of the code and then re-render component again 
        -> re-render at the end + state is updated (useState will be called again)
  */

  // ================================= sub-components =========================
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

  const returnRender = (
    <>
      <div className="m-4">
        {banner}
        {titleBar}
        {!loading.current && openSurveys[`${exprt.props.IS_FETCHED}`] ? (
          <OpenSurveys surveys={openSurveys[`${exprt.props.SURVEY_LIST}`]} />
        ) : (
          <ReactLoading type={"bars"} color={"black"} />
        )}
      </div>
    </>
  );

  return returnRender;
}

export default SurveyBuilder;
