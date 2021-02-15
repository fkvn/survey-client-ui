import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../shared/fontawesome";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as exprInit from "../../../export/exportInit";
// import * as funcs from "../../../shared/utility";
// import * as actionCreators from "../../../store/actionCreators/Surveys/index";

function PublishSurveyBuilder(props) {
  const { survey } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const handlerOnPublishSurvey = () => {
    const updatedSurvey = {
      [`${exprInit.serVarInit.SURVEY_DATE_PUBLISHED}`]: exprInit.funcs.dateFormat(
        new Date()
      ),
      [`${exprInit.serVarInit.SURVEY_IS_ARCHIVED}`]: false,
    };

    dispatch(
      exprInit.actionCreators.updateSurvey(survey.id, updatedSurvey)
    ).then(() => {
      if (
        history.location.pathname !== "/dashboard/mysurveys" &&
        history.location.pathname !== "/dashboard"
      ) {
        history.push(`/dashboard/mysurveys`);
      }
    });
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
