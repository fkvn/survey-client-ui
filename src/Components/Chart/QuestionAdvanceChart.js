import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ColChart from "./ColChart";

import * as exprt from "../../shared/export";
import GenerateAdvanceChartBuilder from "../../Containers/AdvanceChartsBuilder/GenerateAdvanceChartBuilder";

function QuestionAdvanceChart(props) {
  // resGroups = [
  //   {
  //     id: 200,
  //     name: "Faculty",
  //   },
  //   {
  //     id: 201,
  //     name: "Student",
  //   },
  //   {
  //     id: 202,
  //     name: "Alumni",
  //   },
  // ],

  // ================================= functions =========================

  const getChartIndexById = (charts = [], id = -1) => {
    return charts
      .map(function (c) {
        return c.id;
      })
      .indexOf(id);
  };

  const getSerieIndicesFromResGroupIds = (resGroupIds = [], resGroups = []) => {
    if (resGroupIds.length < 1 || resGroups.length < 1) return [];

    const indicesMapIdObject = resGroups.reduce((result, res, index) => {
      return { ...result, [res.id]: index };
    }, {});

    const serieIndices = resGroupIds.reduce(
      (serieIndices, id) => [...serieIndices, indicesMapIdObject[id]],
      []
    );

    return serieIndices;
  };

  const getChartNameFromRef = (ref) => {
    if (ref.current) {
      return curChartNameRef.current.value;
    }
    return "Custom Chart";
  };

  const addSerieIndexFromRef = (ref) => {
    if (ref.current && ref.current.value) {
      const newSerrieId = Number(ref.current.value);
      let updatedSeriesId = [...request.curSelectSerrieIndices];

      if (!updatedSeriesId.includes(newSerrieId)) {
        updatedSeriesId = [...updatedSeriesId, newSerrieId];
      }

      setRequest({
        ...request,
        curSelectSerrieIndices: updatedSeriesId,
        generateChart: false
      });
    }
  };

  const updateSerieIndices = (
    curSerieIndices = [],
    curIndex = -1,
    newSerieIndex = -1
  ) => {
    // doing nothing
    if (
      curSerieIndices.length < 1 ||
      curIndex < 0 ||
      newSerieIndex < 0 ||
      newSerieIndex <= curIndex
    ) {
    }

    // updating
    let updateSerieIndices = [...curSerieIndices];

    // update curIndex with newSerieIndex
    updateSerieIndices[curIndex] = newSerieIndex;

    // eleminate all duplicate serieIndex

    updateSerieIndices = updateSerieIndices.filter(
      (serieIndex, index) =>
        // if it is the curIndex, keep
        index === curIndex ||
        //  if not, value has to !== newSerieIndex
        (index !== curIndex && serieIndex !== newSerieIndex)
    );

    setRequest({ ...request, curSelectSerrieIndices: updateSerieIndices,  generateChart: false });
  };

  const deleteSerieIndex = (curSerieIndices = [], delSerieIndex = -1) => {
    // doing nothing
    if (curSerieIndices.length < 1 || delSerieIndex < 0) {
    }

    // updating
    let updateSerieIndices = [...curSerieIndices];

    // eleminate the delIndex
    updateSerieIndices = updateSerieIndices.filter(
      (serieIndex) => serieIndex !== delSerieIndex
    );

    setRequest({ ...request, curSelectSerrieIndices: updateSerieIndices,  generateChart: false });
  };

  const handleSubmit = () => {
    const chartName = getChartNameFromRef(curChartNameRef);
    const chartInfo = { ...request.currentChart };

    let resGroupIds = [];

    if (resGroups.length > 0) {
      resGroupIds = request.curSelectSerrieIndices.reduce(
        (resGroupIds, resIndex) => [...resGroupIds, resGroups[resIndex].id],
        []
      );
    }

    const submitChart = {
      ...chartInfo,
      name: chartName,
      resGroups: resGroupIds,
    };

    setRequest({
      ...request,
      currentChart: submitChart,
      generateChart: true,
    });

    // const generateChart = submitChart.name !== "";

    // if (id > -1) {
    //   console.log("update current chart");
    // } else {
    //   console.log("Add new chart");
    // }

    // console.log(submitChart);
  };

  // ================================= init =========================
  const {
    question = { id: -1 },
    resGroups = [],
    charts = [],
    defaultChart = { id: -1 },
  } = props;

  const DEFAULT_CHART = {
    id: -1,
    type: "YEAR",
    name: "",
    resGroups: [],
    ...defaultChart,
    // ...resGroups[0],
    index: getChartIndexById(charts, defaultChart.id),
  };

  const [request, setRequest] = useState({
    updatingChart: false,
    currentChart: DEFAULT_CHART,
    curSelectSerrieIndices: getSerieIndicesFromResGroupIds(
      DEFAULT_CHART.resGroups,
      resGroups
    ),
    lastSubmitChart: {},
    validated: false,
    generateChart: false,
  });

  const curChartNameRef = useRef(request.currentChart.name);
  const curChartNewSerieRef = useRef(-1);

  // ================================= hooks =========================

  useEffect(() => {
    if (curChartNameRef.current) {
      let updatedName = request.currentChart.name;
      updatedName = updatedName ? updatedName : "";
      curChartNameRef.current.value = updatedName;
    }
  }, [request.currentChart.name]);

  useEffect(() => {
    setRequest({ ...request});
  }, [request.currentChart, request.curSelectSerrieIndices]);

  // ================================= sub-components =======================

  console.log(request.currentChart);
  const selectChartControl = (
    <Form.Group controlId="exampleForm.SelectCustomSizeSm">
      <Form.Label>Chart list</Form.Label>
      <Form.Control
        as="select"
        size="sm"
        className="border border-info"
        value={request.currentChart.index}
        onChange={(event) => {
          const selectChartIndex = event.target.value;
          const selectChart =
            selectChartIndex > -1
              ? { ...charts[selectChartIndex] }
              : { ...DEFAULT_CHART };

          const responsesIndices = getSerieIndicesFromResGroupIds(
            selectChartIndex > -1 ? charts[selectChartIndex].resGroups : [],
            resGroups
          );

          setRequest({
            ...request,
            currentChart: selectChart,
            curSelectSerrieIndices: responsesIndices,
            generateChart: false
          });
        }}
        custom
      >
        <option value={-1}>Custom Chart</option>
        {charts.map((chart, index) => (
          <option value={index} key={index}>
            {chart.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );

  const curChartNameControl = (
    <Form.Group as={Row} id="title">
      <Form.Label column sm={2}>
        Name
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          size="sm"
          type="text"
          // defaultValue={"Custom Chart"}
          placeholder="Custom Chart"
          ref={curChartNameRef}
        />
      </Col>
    </Form.Group>
  );

  const curChartCategoryControl = (
    <Form.Group as={Row} id="category">
      <Form.Label column sm={2}>
        Category
      </Form.Label>
      <Col sm={10}>
        <Form.Control size="sm" readOnly value="YEAR" />
      </Col>
    </Form.Group>
  );

  const curChartNewSerieControl = (
    <>
      <Form.Text muted>
        Series is selected based on the exist Response Group of the survey.
      </Form.Text>
      <Form.Group as={Row} id="selectResGroup">
        <Col sm={7}>
          <Form.Control
            as="select"
            className="mr-sm-2"
            size="sm"
            ref={curChartNewSerieRef}
          >
            <option value={-1}>Choose....</option>
            {resGroups.map((res, index) => (
              <option value={index} key={index}>
                {res.name}
              </option>
            ))}
          </Form.Control>
        </Col>
        {request.curSelectSerrieIndices.length < resGroups.length && (
          <Col sm={5}>
            <Button
              variant="success"
              size="sm"
              onClick={() => addSerieIndexFromRef(curChartNewSerieRef)}
            >
              Add
            </Button>
          </Col>
        )}
      </Form.Group>
    </>
  );

  const curChartSeriesGroupControl = request.curSelectSerrieIndices.map(
    (serieIndex, index) => (
      <Form.Group as={Row} key={index}>
        <Col sm={2}>
          <Form.Label>Series {index + 1}: </Form.Label>
        </Col>
        <Col sm={5}>
          <Form.Control
            as="select"
            id={serieIndex}
            className="mr-sm-2"
            size="sm"
            value={serieIndex}
            onChange={(event) => {
              const curIndex = index;
              const newSerieIndex = Number(event.target.value);

              updateSerieIndices(
                request.curSelectSerrieIndices,
                curIndex,
                newSerieIndex
              );
            }}
            custom
          >
            {resGroups.map((res, resIndex) => (
              <option value={resIndex} key={resIndex}>
                {res.name}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col sm={5}>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              const delSerieIndex = Number(serieIndex);
              deleteSerieIndex(request.curSelectSerrieIndices, delSerieIndex);
            }}
          >
            Delete
          </Button>
        </Col>
      </Form.Group>
    )
  );

  const curChartSeriesControl = (
    <Form.Group as={Row}>
      <Form.Label as="legend" column sm={2}>
        Series
      </Form.Label>
      <Col sm={10}>
        {curChartNewSerieControl} {curChartSeriesGroupControl}
      </Col>
    </Form.Group>
  );

  const submitChartForm = (
    // <Form
    //   noValidate
    //   validated={request.validated}
    //   onSubmit={handleSubmit}
    //   className="m-4"
    // >
    <div>
      {selectChartControl}
      {curChartNameControl}
      {curChartCategoryControl}
      {curChartSeriesControl}
      <Form.Group as={Row}>
        <Col lg="6">
          <Button variant="primary" onClick={() => handleSubmit()}>
            Generate Chart
          </Button>
        </Col>
      </Form.Group>
    </div>
    // </Form>
  );

  const returnRender = (
    <div className="m-2">
      <div className="m-2">{submitChartForm} </div>
      {request.generateChart && (
        <GenerateAdvanceChartBuilder
          question={question}
          chart={request.currentChart}
        />
      )}{" "}
    </div>
  );

  return returnRender;
}

export default QuestionAdvanceChart;
