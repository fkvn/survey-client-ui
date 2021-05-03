import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../shared/fontawesome";
import { useDispatch } from "react-redux";
import * as funcs from "../../../shared/utility";
import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import { Redirect, useHistory } from "react-router-dom";

import * as exprt from "../../../shared/export";

function PublishSurveyBuilder(props) {
  const { survey = exprt.db.initDb.FULL_SURVEY_INIT } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const handlerOnPublishSurvey = () => {
    const updatedFields = {
      [`${exprt.props.SURVEY_PUBLISHED_DATE}`]: funcs.dateFormat(new Date()),
      [`${exprt.props.SURVEY_IS_CLOSED}`]: false,
    };

    if (survey[`${exprt.props.SURVEY_ID}`] > -1) {
      dispatch(actionCreators.publishSurvey(survey, updatedFields)).then(() => {
        if (
          history.location.pathname !== "/dashboard/mysurveys" &&
          history.location.pathname !== "/dashboard"
        ) {
          // console.log("redirecting");
          history.push(`/dashboard/mysurveys`);
        } else {
          window.location.reload();
        }
      });
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">
        <Button className="p-0 m-0 mr-2" variant="link">
          <FontAwesomeIcon
            icon={["fas", "times"]}
            size="1x"
            className="text-secondary"
            onClick={() => document.body.click()}
          />
        </Button>
        <Button className="p-0 m-0" variant="link">
          <FontAwesomeIcon
            icon={["fas", "check-circle"]}
            size="1x"
            className="text-success"
            onClick={handlerOnPublishSurvey}
          />
        </Button>
      </Popover.Title>
    </Popover>
  );

  const publishSurvey = (
    <OverlayTrigger
      trigger="click"
      rootClose
      placement="right"
      overlay={popover}
    >
      {props.children}
    </OverlayTrigger>
  );

  return <>{publishSurvey} </>;
}

export default PublishSurveyBuilder;
