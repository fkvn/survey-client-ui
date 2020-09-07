import React from "react";
import Toolbar from "./../../Components/Navigation/Toolbar/Toolbar";

export default function Layout(props) {
  return (
    <>
      <Toolbar />
      <main>{props.children}</main>
    </>
  );
}
