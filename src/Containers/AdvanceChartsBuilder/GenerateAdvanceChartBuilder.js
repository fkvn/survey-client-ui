import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

import * as exprt from "../../shared/export";
import * as actionCreators from "../../store/actionCreators/Surveys/index";
import ColChart from "../../Components/Chart/ColChart";

function GenerateAdvanceChartBuilder(props) {
  // ================================= init =========================

  const {
    question = exprt.db.initDb.QUESTION_INIT,
    chart = { id: -1, resGroups: [] },
  } = props;

  console.log("generating chart builder");

  const dispatch = useDispatch();

  const DEFAULT_CHART_INFO = {
    loading: true,
    title: chart.name,
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Average Rating",
      },
    },
    tooltip: {
      headerFormat:
        '<div style="font-size:17px;">Average Rating: {point.key}</div><table>',
      pointFormat:
        '<tr style="margin: 0px 5px"><td style="color:{series.color};padding-right:10px">{series.name}: </td>' +
        '<td style=""><b>{point.y:1.f}</b></td></tr>' +
        "<tr><td></td><td></td> </tr>",

      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    series: [],
    categories: [],
  };

  const [chartInfo, setChartInfo] = useState({ ...DEFAULT_CHART_INFO });

  // const loading = useRef(true);
  let isRender = false;

  // ================================= functions =========================

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const updateSeries = (series = []) => {
    const updatedSeries = series.reduce(
      (newSeries, serie, index) => [
        ...newSeries,
        {
          data: serie.data,
          name: serie.name,
          stack: index,
          color: getRandomColor(),
        },
      ],
      []
    );
    return updatedSeries;
  };

  const generateChart = () => {
    const submitChart = {
      name: chart.name,
      resGroupIds: chart.resGroups,
    };

    setTimeout(() => {
      console.log(chart.id);

      // add chart
      if (chart.id === -1) {
        dispatch(actionCreators.addChart(question.id, submitChart)).then(
          (chart) => {
            const updatedChartInfo = {
              ...chartInfo,
              loading: false,
              series: updateSeries(chart.series),
              categories: chart.categories,
            };
            setChartInfo(updatedChartInfo);
          }
        );
      }
      // update chart
      else {
        dispatch(actionCreators.updateChart(question.id, chart.id, submitChart)).then(
          (chart) => {
            const updatedChartInfo = {
              ...chartInfo,
              loading: false,
              series: updateSeries(chart.series),
              categories: chart.categories,
            };
            setChartInfo(updatedChartInfo);
          }
        );
      }
    }, 500);
  };

  // // ================================= hooks =========================
  useEffect(() => {
    setChartInfo({ ...chartInfo, loading: true });
    generateChart();
  }, [chart.resGroups]);

  // // ================================= logic flows =========================
  if (!chartInfo.loading && question.id > -1) {
    isRender = true;
  }

  console.log(" ======== ");
  console.log(chartInfo);

  const returnRender = isRender && <ColChart chartInfo={chartInfo} />;

  return isRender ? (
    returnRender
  ) : (
    <div className="m-2">
      <ReactLoading type={"bars"} color={"black"} />
    </div>
  );
}

export default GenerateAdvanceChartBuilder;
