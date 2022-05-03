import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function CustomOverlayTrigger(props) {
  const { unitKey, title, children, defaultShow = false } = props;

  const mainDisplay = (
    <OverlayTrigger
      overlay={<Tooltip id={unitKey}>{title}</Tooltip>}
      key={unitKey}
      defaultShow={defaultShow}
    >
      {children}
    </OverlayTrigger>
  );

  return <>{mainDisplay}</>;
}

export default CustomOverlayTrigger;
