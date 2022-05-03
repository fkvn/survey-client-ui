import React from "react";
import { useSelector } from "react-redux";
import Error from "../../Components/Error/Error";
import * as exprt from "../../shared/export";

function HandleErrorBuilder() {
  const error = useSelector(
    (state) => state.surveyBuilder[`${exprt.props.ERROR}`]
  );

  const errorReturn = (
    <>
      <Error error={error} show={true} />{" "}
    </>
  );

  return <>{error[`${exprt.props.IS_ERROR}`] && errorReturn}</>;
}

export default HandleErrorBuilder;
