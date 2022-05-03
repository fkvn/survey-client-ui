import React from "react";
import HandleErrorBuilder from "../../Containers/HandleErrorBuilder.js/HandleErrorBuilder";
import Toolbar from "./../../Components/Navigation/Toolbar/Toolbar";

export default function Layout(props) {
  return (
    <>
      <Toolbar />
      <div className="m-4">
        <HandleErrorBuilder />
      </div>
      <main>{props.children}</main>
    </>
  );
}
