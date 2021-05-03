import React from "react";
import { AuthProvider } from "oidc-react";

function OIDCHandler() {
  const oidcConfig = {
    onSignIn: async (user) => {
      let redirectURL = "/dashboard";

      if (window.sessionStorage.getItem("redirectURL")) {
        redirectURL = window.sessionStorage.getItem("redirectURL");
      }

      // redirect after login
      window.location.hash = redirectURL;
      window.location.reload(false);
    },
    authority: "https://identity.cysun.org",
    clientId: "alice-survey-service-spa",
    responseType: "code",
    scope: "openid profile email alice-survey-service-api",
    // redirectUri: 'https://alice.cysun.org/tlan/#/auth'
    redirectUri: "http://localhost:3000/#/auth",
    // post_logout_redirect_uri: "http://localhost:3000/#",
  };
  return <AuthProvider {...oidcConfig} />;
}

export default OIDCHandler;
