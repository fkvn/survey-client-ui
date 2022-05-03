import React from "react";
import { Alert } from "react-bootstrap";
import * as exprt from "../../shared/export";

function Error(props) {
  const { error = {}, show = false } = props;

  const errorReturn = (
    <Alert show={show} variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{error[`${exprt.props.ERROR_MESSAGE}`]}</p>
    </Alert>
  );

  return <>{errorReturn} </>;
}

export default Error;
