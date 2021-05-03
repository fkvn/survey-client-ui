import React from "react";
import { useDispatch } from "react-redux";
import { Popover, Button, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import * as funcs from "../../../shared/utility";
import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import "../../../shared/fontawesome";

import * as exprt from "../../../shared/export";

function CloseSurveyBuilder(props) {
  const { survey = exprt.db.initDb.FULL_SURVEY_INIT } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const handlerOnCloseSurvey = () => {
    const updatedFields = {
      [`${exprt.props.SURVEY_CLOSED_DATE}`]: funcs.dateFormat(new Date()),
      [`${exprt.props.SURVEY_IS_CLOSED}`]: true,
    };

    if (survey[`${exprt.props.SURVEY_ID}`] > -1) {
      dispatch(actionCreators.closeSurvey(survey, updatedFields)).then(() => {
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
            onClick={handlerOnCloseSurvey}
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
