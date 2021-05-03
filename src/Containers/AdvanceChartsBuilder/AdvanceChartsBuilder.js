import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import ReactLoading from "react-loading";

import * as exprt from "../../shared/export";
import QuestionAdvanceChartsBuilder from "./QuestionAdvanceChartsBuilder/QuestionAdvanceChartsBuilder";

function AdvanceChartsBuilder(props) {
  const { chartType = "", question = exprt.db.initDb.QUESTION_INIT } = props;

  let routes = <Alert variant="danger">Chart is failed to generate!</Alert>;
  let isRender = false;

  console.log("advabce chart");

  const [advancedChart, setAdvancedChart] = useState(false);

  switch (chartType) {
    case exprt.props.QUESTION_ADVANCE_CHART:
      {
        routes = advancedChart && (
          <QuestionAdvanceChartsBuilder question={question} />
        );
        isRender = true;
      }
      break;
    default:
      break;
  }

  if (question.id < 0) {
    isRender = false;
  }

  const returnRender = (
    <>
      <Button variant="link" onClick={() => setAdvancedChart(!advancedChart)}>
        Advanced Chart
      </Button>
      {advancedChart && routes}{" "}
    </>
  );

  return isRender ? (
    returnRender
  ) : (
    <div className="m-2">
      <ReactLoading type={"bars"} color={"black"} />
    </div>
  );
}

export default AdvanceChartsBuilder;
