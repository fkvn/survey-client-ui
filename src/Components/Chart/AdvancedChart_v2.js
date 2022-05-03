import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ColChart from "./ColChart";

function AdvancedChart_v2() {
  const resGroups = [
    {
      id: 555,
      name: "Group 1",
      groupType: "YEAR",
      groupBy: "surveyId;year",
      groupedValue: "1;2012",
      responses: [
        {
          id: 192,
          survey: 1,
          type: "ANONYMOUS",
          date: "2012-12-01 15:46:18",
          isDeleted: false,
          totalResposeGroups: 21,
        },
        {
          id: 228,
          survey: 1,
          type: "ANONYMOUS",
          date: "2012-12-01 15:48:31",
          isDeleted: false,
          totalResposeGroups: 21,
        },
      ],
    },
    {
      id: 556,
      name: "Group 1",
      groupType: "YEAR",
      groupBy: "surveyId;year",
      groupedValue: "1;2015",
      responses: [
        {
          id: 204,
          survey: 1,
          type: "ANONYMOUS",
          date: "2015-12-01 15:47:13",
          isDeleted: false,
          totalResposeGroups: 23,
        },
      ],
    },
    {
      id: 557,
      name: "Group 1",
      groupType: "YEAR",
      groupBy: "surveyId;year",
      groupedValue: "1;2020",
      responses: [
        {
          id: 216,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-01 15:47:43",
          isDeleted: false,
          totalResposeGroups: 19,
        },
        {
          id: 240,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-01 15:49:09",
          isDeleted: false,
          totalResposeGroups: 21,
        },
        {
          id: 252,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-01 15:49:37",
          isDeleted: false,
          totalResposeGroups: 21,
        },
        {
          id: 276,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-01 15:50:43",
          isDeleted: false,
          totalResposeGroups: 20,
        },
        {
          id: 300,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-01 15:51:47",
          isDeleted: false,
          totalResposeGroups: 23,
        },
        {
          id: 344,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-04 00:15:37",
          isDeleted: false,
          totalResposeGroups: 21,
        },
        {
          id: 356,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-04 00:16:09",
          isDeleted: false,
          totalResposeGroups: 20,
        },
        {
          id: 368,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-04 00:16:41",
          isDeleted: false,
          totalResposeGroups: 21,
        },
      ],
    },
    {
      id: 558,
      name: "Group 1",
      groupType: "YEAR",
      groupBy: "surveyId;year",
      groupedValue: "1;2022",
      responses: [
        {
          id: 264,
          survey: 1,
          type: "ANONYMOUS",
          date: "2022-12-01 15:50:12",
          isDeleted: false,
          totalResposeGroups: 20,
        },
        {
          id: 288,
          survey: 1,
          type: "ANONYMOUS",
          date: "2022-12-01 15:51:12",
          isDeleted: false,
          totalResposeGroups: 20,
        },
      ],
    },
    {
      id: 560,
      name: "Selection 1",
      groupType: "RESPONSE",
      groupBy: "surveyId;questionId;mulChoiceSelectionIndex",
      groupedValue: "1;4;0",
      responses: [
        {
          id: 356,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-04 00:16:09",
          isDeleted: false,
          totalResposeGroups: 20,
        },
        {
          id: 368,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-04 00:16:41",
          isDeleted: false,
          totalResposeGroups: 21,
        },
      ],
    },
    {
      id: 561,
      name: "Selection 2",
      groupType: "RESPONSE",
      groupBy: "surveyId;questionId;mulChoiceSelectionIndex",
      groupedValue: "1;4;1",
      responses: [
        {
          id: 192,
          survey: 1,
          type: "ANONYMOUS",
          date: "2012-12-01 15:46:18",
          isDeleted: false,
          totalResposeGroups: 21,
        },
        {
          id: 204,
          survey: 1,
          type: "ANONYMOUS",
          date: "2015-12-01 15:47:13",
          isDeleted: false,
          totalResposeGroups: 23,
        },
        {
          id: 228,
          survey: 1,
          type: "ANONYMOUS",
          date: "2012-12-01 15:48:31",
          isDeleted: false,
          totalResposeGroups: 21,
        },
        {
          id: 252,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-01 15:49:37",
          isDeleted: false,
          totalResposeGroups: 21,
        },
        {
          id: 264,
          survey: 1,
          type: "ANONYMOUS",
          date: "2022-12-01 15:50:12",
          isDeleted: false,
          totalResposeGroups: 20,
        },
        {
          id: 344,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-04 00:15:37",
          isDeleted: false,
          totalResposeGroups: 21,
        },
      ],
    },
    {
      id: 562,
      name: "Selection 3",
      groupType: "RESPONSE",
      groupBy: "surveyId;questionId;mulChoiceSelectionIndex",
      groupedValue: "1;4;2",
      responses: [
        {
          id: 216,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-01 15:47:43",
          isDeleted: false,
          totalResposeGroups: 19,
        },
        {
          id: 288,
          survey: 1,
          type: "ANONYMOUS",
          date: "2022-12-01 15:51:12",
          isDeleted: false,
          totalResposeGroups: 20,
        },
        {
          id: 300,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-01 15:51:47",
          isDeleted: false,
          totalResposeGroups: 23,
        },
      ],
    },
    {
      id: 563,
      name: "Selection 4",
      groupType: "RESPONSE",
      groupBy: "surveyId;questionId;mulChoiceSelectionIndex",
      groupedValue: "1;4;3",
      responses: [
        {
          id: 240,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-01 15:49:09",
          isDeleted: false,
          totalResposeGroups: 21,
        },
        {
          id: 276,
          survey: 1,
          type: "ANONYMOUS",
          date: "2020-12-01 15:50:43",
          isDeleted: false,
          totalResposeGroups: 20,
        },
      ],
    },
  ];

  const [request, setRequest] = useState({
    validated: false,
    loading: false,
    title: useRef(),
    categoryType: "YEAR",
    categories: [],
    series: [],
    selGroupRef: [],
    onUpdateSeries: [],
    showChart: false,
    chartInfo: {},
  });

  let selGroupRef = [React.createRef()];

  for (let index = 0; index < request.series.length; index++) {
    selGroupRef = [...selGroupRef, React.createRef()];
  }

  console.log(request.series);

  // series = [id, name]

  useEffect(() => {
    if (!request.loading) {
      setRequest({ ...request, loading: true });
    }
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setRequest({
        ...request,
        validated: true,
      });
    } else {
      let chartInfo = {};
      if (!request.showChart) {
        chartInfo = {
          title: request.title.current.value,
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
          series: [
            {
              data: ["NaN", "NaN", 4.0, "NaN"],
              name: request.series[0].split(",")[1],
              stack: 0,
              color: "black",
            },
            {
              data: [2.5, 7.0, 5.5, 5.0],
              name: request.series[1].split(",")[1],
              stack: 1,
              color: "#FDB348",
            },
            {
              data: ["NaN", "NaN", 4.0, 6.0],
              name: request.series[2].split(",")[1],
              stack: 2,
              color: "#79ADE8",
            },
            {
              data: ["NaN", "NaN", 4.0, "NaN"],
              name: request.series[3].split(",")[1],
              stack: 4,
              color: "#F36B78",
            },
          ],
          categories: [2012, 2015, 2020, 2022],
        };
      }

      setRequest({
        ...request,
        chartInfo: chartInfo,
        showChart: !request.showChart,
        validated: true,
      });
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const mainDisplay = (
    <>
      <Form
        noValidate
        validated={request.validated}
        onSubmit={handleSubmit}
        className="m-4"
      >
        <Form.Group as={Row} id="title">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Chart Title"
              ref={request.title}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} id="category">
          <Form.Label column sm={2}>
            Category
          </Form.Label>
          <Col sm={10}>
            <Form.Control size="sm" readOnly value={request.categoryType} />
          </Col>
        </Form.Group>

        <fieldset id="series">
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Series
            </Form.Label>
            <Col sm={10}>
              <Form.Text muted>
                Series is selected based on the exist Response Group of the
                survey.
              </Form.Text>
              <Form.Group as={Row} id="selectResGroup">
                <Col sm={7}>
                  <Form.Control
                    as="select"
                    className="mr-sm-2"
                    ref={selGroupRef[0]}
                    size="sm"
                  >
                    <option value="">Choose....</option>
                    {resGroups.map((res, index) => (
                      <option value={[res.id, res.name]} key={index}>
                        {res.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col sm={5}>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      // console.log(selGroupRef.current[0]);
                      if (
                        selGroupRef[0].current &&
                        selGroupRef[0].current.value
                      ) {
                        setRequest({
                          ...request,
                          series: [
                            ...request.series,
                            selGroupRef[0].current.value,
                          ],
                        });
                      }
                    }}
                  >
                    Add
                  </Button>
                </Col>
              </Form.Group>

              {/* seriesGroup */}
              {request.series.map((serie, index) => (
                <Form.Group as={Row} key={index}>
                  <Col sm={2}>
                    <Form.Label>Series {index + 1}: </Form.Label>
                  </Col>
                  <Col sm={5}>
                    <Form.Control
                      as="select"
                      className="mr-sm-2"
                      size="sm"
                      disabled
                      ref={selGroupRef[index + 1]}
                      value={serie}
                      onChange={(key) => {
                        const updatedSeries = [...request.series];
                        updatedSeries[`${index}`] = key.target.value;

                        setRequest({
                          ...request,
                          series: updatedSeries,
                        });
                      }}
                    >
                      {resGroups.map((res, index) => (
                        <option value={[res.id, res.name]} key={index}>
                          {res.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col sm={5}>
                    {!request.onUpdateSeries.includes(index) ? (
                      <>
                        <Button
                          variant={"warning"}
                          size="sm"
                          className="mr-4"
                          onClick={() => {
                            selGroupRef[index + 1].current.disabled = false;
                            setRequest({
                              ...request,
                              onUpdateSeries: [
                                ...request.onUpdateSeries,
                                index,
                              ],
                            });
                          }}
                        >
                          Change
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setRequest({
                              ...request,
                              series: request.series.filter(
                                (_, i) => i !== index
                              ),
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => {
                            selGroupRef[index + 1].current.disabled = true;

                            setRequest({
                              ...request,
                              onUpdateSeries: request.onUpdateSeries.filter(
                                (i) => i !== index
                              ),
                            });
                          }}
                        >
                          Done
                        </Button>{" "}
                      </>
                    )}
                  </Col>
                </Form.Group>
              ))}
            </Col>
          </Form.Group>
        </fieldset>

        <Form.Group as={Row}>
          <Col lg="6">
            <Button
              variant="primary"
              type="submit"
              onClick={() => setRequest({ ...request, test: true })}
            >
              Generate Chart
            </Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col>
            {request.showChart && <ColChart chartInfo={request.chartInfo} />}
          </Col>
        </Form.Group>
      </Form>
    </>
  );

  return <>{request.loading && mainDisplay} </>;
}

export default AdvancedChart_v2;
