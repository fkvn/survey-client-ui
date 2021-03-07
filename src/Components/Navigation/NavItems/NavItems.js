import React from "react";
import { Nav, Button } from "react-bootstrap";
import SearchForm from "./../../SearchForm/SearchForm";
import { Switch, Route } from "react-router-dom";
import NavLinks from "./NavLinks/NavLinks";
import axios from "axios";
import { useAuth } from "oidc-react";
const aliceLink =
  "oidc.user:https://identity.cysun.org:alice-survey-service-spa";

export default function NavItems(props) {
  const auth = useAuth();

  console.log(auth);

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
            <Button
              variant="outline-success"
              onClick={() => {
                axios
                  .get("https://identity.cysun.org/Account/Logout")
                  .then(() => {
                    window.sessionStorage.removeItem(aliceLink);
                    window.sessionStorage.removeItem("canvasToken");
                    window.location.reload(false);
                  });
              }}
            >
              Logout
            </Button>
          </Route>
          <Route path="/">
            <Button
              variant="outline-success"
              onClick={() => {
                console.log("log out");

                window.sessionStorage.removeItem(aliceLink);
                window.sessionStorage.removeItem("canvasToken");
                window.location.reload(false);
              }}
            >
              Login
            </Button>
          </Route>
        </Switch>
      </div>
    </>
  );
}
