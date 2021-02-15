import React from "react";
import Layout from "./hoc/Layout/Layout";
import { Switch, Route, useHistory } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";
import NotFoundPage from "./NotFoundPage";

import SurveyBuilder from "./Containers/SurveyBuilder/SurveyBuilder";
import ControllerBuilder from "./Containers/DashboardBuilder/ControllerBuilder";
import SubmitSurveyBuilder from "./Containers/SurveyBuilder/SubmitSurveyBuilder";

function App() {
  const history = useHistory();

  return (
    <>
      <></>
      <>
        <Layout>
          <Switch>
            <Route path="/dashboard" component={ControllerBuilder}></Route>
            <Route path="/surveys/response/submit" exact>
              <SubmitSurveyBuilder />
            </Route>
            <Route path="/surveys/response/successful" exact>
              <Jumbotron className="pb-5 pt-5 m-5">
                <h1>Thank you for taking survey!</h1>
                <p> Your response has been submitted successfully.</p>
                <div className="p-0 mb-0 mt-5">
                  <Button
                    variant="primary mr-5"
                    onClick={() => history.push("/")}
                  >
                    More Surveys
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => history.push(`/dashboard/mysurveys`)}
                  >
                    Create Survey
                  </Button>
                </div>
              </Jumbotron>
            </Route>
            <Route path="/surveys/response/unsuccessful" exact>
              <Jumbotron className="pb-5 pt-5 m-5">
                <h1 className="text-danger">Oops! Something went wrong</h1>
                <p>
                  Your response has been submitted
                  <span className="text-danger"> unsuccessfully</span>.
                </p>
                <div className="p-0 mb-0 mt-5">
                  <Button
                    variant="primary mr-5"
                    onClick={() => history.push("/")}
                  >
                    More Surveys
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => history.push(`/dashboard/mysurveys`)}
                  >
                    Create Survey
                  </Button>
                </div>
              </Jumbotron>
            </Route>
            <Route path="/" exact component={SurveyBuilder}></Route>
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Layout>
      </>
    </>
  );
}

export default App;
