import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../shared/fontawesome";
import { useDispatch } from "react-redux";
import * as actionCreators from "../../../store/actionCreators/Surveys/index";
import { useHistory } from "react-router-dom";

function DeleteResponseGroupBuilder(props) {
  const { survey = {}, resGroup = {} } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const handlerOnPublishSurvey = () => {
    try {
      if (resGroup.id > -1 && survey.id > -1) {
        dispatch(actionCreators.deleteResponseGroup(resGroup.id)).then(() => {
          const returnURL = `/dashboard/mysurveys/survey/${survey.id}/responses/groups`;

          if (history.location.pathname !== returnURL) {
            // console.log("redirecting");
            history.push(returnURL);
          } else {
            window.location.reload();
          }
        });
      }
    } catch (error) {
      window.location.reload();
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

  const deleteResGroup = (
    <OverlayTrigger
      trigger="click"
      rootClose
      placement="right"
      overlay={popover}
    >
      {props.children}
    </OverlayTrigger>
  );

  return <>{deleteResGroup} </>;
}

export default DeleteResponseGroupBuilder;
