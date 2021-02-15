import React from "react";
import Toolbar from "./../../Components/Navigation/Toolbar/Toolbar";

import * as exprInit from "../../export/exportInit";
import { useSelector } from "react-redux";
import AlertDismissible from "../../Components/Alert/AlertDismissible";

export default function Layout(props) {
  const error = useSelector(
    (state) => state.surveyBuilder[`${exprInit.abbrInit.ERROR}`]
  );

  const siteMsgComp = error[`${exprInit.abbrInit.IS_ERROR}`] ? (
    <AlertDismissible
      type="danger"
      heading={`"Oh snap! You got ${
        error[`${exprInit.abbrInit.ERROR_TYPE}`]
      } message!"`}
      msg={error[`${exprInit.abbrInit.ERROR_MESSAGE}`]}
    ></AlertDismissible>
  ) : null;

  return (
    <>
      <Toolbar />
      <div className="m-4">{siteMsgComp}</div>
      <main>{props.children}</main>
    </>
  );
}
