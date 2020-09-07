import React from "react";
import { useDispatch } from "react-redux";
import { Popover, Button, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import * as funcs from "../../../shared/utility";
import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import "../../../shared/fontawesome";

function CloseSurveyBuilder(props) {
  const { survey } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const handlerOnPublishSurvey = () => {
    const updatedSurvey = {
      closeDate: funcs.dateFormat(new Date()),
      closed: true,
    };

    dispatch(actionCreators.updateSurvey(survey.id, updatedSurvey)).then(() => {
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

  const closeSurvey = (
    <OverlayTrigger
      trigger="click"
      rootClose
      placement="right"
      overlay={popover}
    >
      <Button variant="danger" size="sm">
        Close
      </Button>
    </OverlayTrigger>
  );
  return <>{closeSurvey} </>;
}

export default CloseSurveyBuilder;
