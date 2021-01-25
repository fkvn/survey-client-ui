import React from "react";
import AddNewResGroupForm from "../../../Components/Form/ResponseGroupForm/AddNewResGroupForm";

import * as funcs from "../../../shared/utility";

function NewResponseGroupBuilder(props) {
  console.log("NewResGroup Builder");

  const { survey = {}, show, onHide } = props;

  const addNewGroupForm = <AddNewResGroupForm show={show} onHide={onHide} />;

  const MainDisplay = () => {
    return <>{addNewGroupForm} </>;
  };

  return <>{!funcs.isEmpty(survey) && <MainDisplay />}</>;
}

export default NewResponseGroupBuilder;
