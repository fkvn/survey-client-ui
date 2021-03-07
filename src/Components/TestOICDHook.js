import React from "react";
import { useAuth } from "oidc-react";
import { Button } from "react-bootstrap";

function TestOIDCHook(props) {
  const auth = useAuth();
  console.log(auth);

  return (
    <>
      TestOIDCHook{" "}
      <Button variant="info" onClick={() => auth.signOut()}>
        Log out
      </Button>
    </>
  );
}

export default TestOIDCHook;
