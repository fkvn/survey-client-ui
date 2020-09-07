import React from "react";
import { Nav, Button } from "react-bootstrap";
import SearchForm from "./../../SearchForm/SearchForm";
import { Switch, Route } from "react-router-dom";
import NavLinks from "./NavLinks/NavLinks";

export default function navItems(props) {
  return (
    <>
      <Nav className="mr-auto w-100">
        <div className="w-100 mx-md-5 pl-md-5 py-2 py-md-0">
          <Switch>
            <Route path="/dashboard" component={NavLinks}></Route>
            <Route path="/" component={SearchForm}></Route>
          </Switch>
        </div>
      </Nav>
      <div className="mr-sm-2">
        <Switch>
          <Route path="/dashboard">
            <Button variant="outline-success">Logout</Button>
          </Route>
          <Route path="/">
            <Button variant="outline-success">Login</Button>
          </Route>
        </Switch>
      </div>
    </>
  );
}
