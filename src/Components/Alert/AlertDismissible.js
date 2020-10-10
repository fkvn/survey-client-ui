import React from "react";

import { Alert } from "react-bootstrap";

function AlertDismissible(props) {
  const {
    onClose,
    type,
    heading,
    msg,
    alertClassName = "p-1 pl-3 font-weight-light",
    headingClassName = "p-1 font-italic",
  } = props;

  const alertDismissibleComp = (
    <Alert
      variant={type}
      className={alertClassName}
      onClose={onClose}
      dismissible={onClose ? true : false}
    >
      {heading ? (
        <Alert.Heading className={headingClassName}>
          <small>
            <strong>{heading}</strong>
          </small>
        </Alert.Heading>
      ) : null}
      {msg ? <p className="m-1 p-1">{msg}</p> : <></>}
    </Alert>
  );

  return alertDismissibleComp;
}

export default AlertDismissible;
