import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import ReactLoading from "react-loading";
import ColChart from "../../Components/Chart/ColChart";

import * as exprt from "../../shared/export";

function SummaryChartsBuilder(props) {
  const {
    chartType = "",
    question = exprt.db.initDb.QUESTION_INIT,
    questionQRS = {},
  } = props;

  let routes = <Alert variant="danger">Chart is failed to generate!</Alert>;
  let isRender = false;

  console.log("advabce chart");

  const [summChart, setSummChart] = useState(false);

  let summaryChartInfo = {
    title: "Summary Chart",
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Number of responses",
      },
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:20px">Rate: {point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">Series: </td>' +
        '<td style="padding:0"><b>{series.name}</b></td></tr>' +
        '<tr><td style="color:{series.color};padding:0">#Reponses: </td>' +
        '<td style="padding:0"><b>{point.y:1.f}</b></td></tr>',

      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    categories: [],
    series: [],
  };

  // ================================= logic flows =========================

  // update categories and series
  try {
    summaryChartInfo = {
      ...summaryChartInfo,
      categories: [
        ...Object.keys(questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`]),
      ],
      series: [
        {
          name: "Anonymous",
          // data: [],
          data: Object.keys(
            questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`]
          ).reduce(
            (data, key) => [
              ...data,
              questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`][key][
                `${exprt.props.RESPONSE_LIST}`
              ].length,
            ],
            []
          ),
        },
      ],
    };
  } catch (error) {}

  switch (chartType) {
    case exprt.props.QUESTION_SUMMARY_CHART:
      {
        routes = summChart && <ColChart chartInfo={summaryChartInfo} />;
        isRender = true;
      }
      break;
    default:
      break;
  }

  if (question[`${exprt.props.QUESTION_ID}`] < 0) {
    isRender = false;
  }

  const returnRender = (
    <>
      <Button variant="link" onClick={() => setSummChart(!summChart)}>
        Show Summary Chart
      </Button>
      {summChart && routes}{" "}
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

export default SummaryChartsBuilder;
