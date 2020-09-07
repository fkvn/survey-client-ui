import React from "react";
import { Navbar } from "react-bootstrap";
import NavItems from "./../NavItems/NavItems";

export default function toolBar() {
  return (
    <>
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="/" className="text-primary">
          Survey Service
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavItems />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
