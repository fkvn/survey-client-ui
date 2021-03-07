import React from "react";
import { AuthProvider, useAuth } from "oidc-react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TestOIDCHook from "./TestOICDHook";

function OIDCHandler() {
  const auth = useAuth();
  const history = useHistory();

  const oidcConfig = {
    onSignIn: async (user) => {
      // the `user` prop is actually the data the app received from `/userinfo` endpoint.
      // window.location.hash = "";
      // window.location.reload(false);
      // window.history.back();
      window.history.go(-3);
    },
    authority: "https://identity.cysun.org",
    clientId: "alice-survey-service-spa",
    responseType: "code",
    scope: "openid profile email alice-survey-service-api",
    // redirectUri: 'https://alice.cysun.org/tlan/#/auth'
    redirectUri: "http://localhost:3000/#/auth",
    // post_logout_redirect_uri: "http://localhost:3000/#",
  };
  return (
    <AuthProvider {...oidcConfig}>
      {/* <TestOIDCHook /> */}
      <div className="App">
        <header className="App-header">
          <Button variant="info" href="/">
            Back
          </Button>
          <Button
            variant="info"
            // onClick={() => auth.signOut()}
          >
            Log out
          </Button>
        </header>
      </div>
    </AuthProvider>
  );
}

export default OIDCHandler;
