import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

function ColChart(props) {
  const {
    title = "",
    yAxis = {},
    categories = [],
    series = [],
    tooltip = {},
  } = props["chartInfo"];

  const options = {
    chart: {
      type: "column",
    },

    title: {
      text: title,
    },

    xAxis: {
      categories: [...categories],
    },

    yAxis: yAxis,

    // tooltip: {
    //   formatter: function () {
    //     return (
    //       "<b>" +
    //       this.x +
    //       "</b><br/>Series: " +
    //       this.series.name +
    //       // +
    //       // ": " +
    //       // this.y +
    //       "<br/>" +
    //       "Average: " +
    //       this.point.stackTotal
    //     );
    //   },
    // },
    tooltip: tooltip,

    plotOptions: {
      column: {
        stacking: "normal",
      },
    },

    series: [...series],
  };

  const Chart = () => (
    <HighchartsReact
      highcharts={Highcharts}
      // constructorType={"stockChart"}
      options={options}
    />
  );

  return (
    <>
      {" "}
      <Chart />{" "}
    </>
  );
}

export default ColChart;
