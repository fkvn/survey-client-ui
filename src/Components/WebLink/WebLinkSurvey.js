import React, { useState } from "react";
import { Button, OverlayTrigger, Popover, Badge } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Link } from "react-router-dom";

function WebLinkSurvey(props) {
  const { survey } = props;

  const url = `/#/surveys/response/submit?sId=${survey.id}`;
  const fullUrl = `${window.location.origin}${url}`;

  const [msg, setMsg] = useState("");

  if (msg) {
    setTimeout(() => setMsg(""), 3000);
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" className="p-2">
        Web Link
      </Popover.Title>
      <Popover.Content>
        <div>
          <p>
            <Link to={url}>{fullUrl}</Link>
          </p>
          <p className="text-danger">{msg}</p>
        </div>
        <div className="float-right mb-2">
          <Button
            className="mr-2"
            size="sm"
            variant="secondary"
            onClick={() => document.body.click()}
          >
            Close
          </Button>
          <CopyToClipboard
            text={fullUrl}
            onCopy={(_, result) =>
              setMsg(result ? "The url is copied!" : "Unsuccessful copied!!!")
            }
          >
            <Button className="" size="sm" variant="primary">
              Copy
            </Button>
          </CopyToClipboard>
        </div>
      </Popover.Content>
    </Popover>
  );

  const publishSurvey = (
    <OverlayTrigger trigger="click" rootClose placement="top" overlay={popover}>
      <Badge as="button" className="border-0" variant="info">
        Get Link
      </Badge>
    </OverlayTrigger>
  );

  return <>{survey && publishSurvey} </>;
}

export default WebLinkSurvey;
