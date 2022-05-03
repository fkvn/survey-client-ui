import React from "react";
import { Nav } from "react-bootstrap";
// import NavLink from "./NavLink/NavLink";
import { NavLink } from "react-router-dom";

export default function navLinks() {
  return (
    <Nav className="mr-auto">
      <Nav.Link as={NavLink} to="/dashboard" exact>
        Dashboard
      </Nav.Link>
      <Nav.Link as={NavLink} to="/dashboard/mysurveys">
        My Surveys
      </Nav.Link>
    </Nav>
  );
}
