import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionContext,
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Row,
  Table,
  useAccordionToggle,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomOverlayTrigger from "../../../../CustomOverlayTrigger/CustomOverlayTrigger";

import * as funcs from "../../../../../shared/utility";
import * as exprt from "../../../../../shared/export";
import ColChart from "../../../../Chart/ColChart";
// import AdvancedChart from "../../../../Chart/QuestionAdvanceChart";
import AdvanceChartsBuilder from "../../../../../Containers/AdvanceChartsBuilder/AdvanceChartsBuilder";
import SummaryChartsBuilder from "../../../../../Containers/SummaryChartsBuilder/SummaryChartsBuilder";

function RatingQRS(props) {
  const { question = {}, questionQRS = {} } = props;

  const isValidatedComponent =
    question[`${exprt.props.QUESTION_TYPE}`] === exprt.props.RT_TYPE &&
    question[`${exprt.props.QUESTION_ID}`] ===
      questionQRS[`${exprt.props.QUESTION_QRS_ID}`] &&
    question[`${exprt.props.RT_SCALE}`] ===
      Object.keys(questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`])
        .length;

  function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <button
        type="button"
        className={`btn btn-link shadow-none m-0 p-0 ${
          isCurrentEventKey ? " text-secondary " : "text-primary"
        }`}
        size="sm"
        variant="link"
        onClick={decoratedOnClick}
      >
        {isCurrentEventKey ? "Hide" : children}
      </button>
    );
  }

  const showResponsesList = (responses) => (
    <Accordion>
      <div>
        <ContextAwareToggle eventKey="0">Show</ContextAwareToggle>
        <Accordion.Collapse eventKey="0">
          <ListGroup className="m-0 p-0 ">
            {responses.map(
              (res, index) =>
                !res.isDeleted && (
                  <CustomOverlayTrigger
                    unitKey={res[`${exprt.props.RESPONSE_ID}`]}
                    title={res[`${exprt.props.RESPONSE_DATE}`]}
                    key={index}
                  >
                    <ListGroup.Item
                      className="m-0 p-0 border-0"
                      as={Link}
                      to={`/dashboard/mysurveys/survey/${
                        res[`${exprt.props.RESPONSE_SURVEY_ID}`]
                      }/responses/${res[`${exprt.props.RESPONSE_ID}`]}`}
                    >
                      {res[`${exprt.props.RESPONSE_TYPE}`]}
                    </ListGroup.Item>
                  </CustomOverlayTrigger>
                )
            )}
          </ListGroup>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );

  const getAverageRating = () => {
    let avg = 0;
    for (const key in questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`]) {
      avg =
        avg +
        Number(key) *
          questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`][key][
            `${exprt.props.RESPONSE_LIST}`
          ].length;
    }
    avg = avg / questionQRS[`${exprt.props.QUESTION_QRS_RESPONSE_COUNT}`];
    return funcs.round(Number(avg), 2);
  };

  const getMaxRating = () => {
    let max = 0;

    for (const key in questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`]) {
      if (
        key > 0 &&
        key > max &&
        questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`][key][
          `${exprt.props.RESPONSE_LIST}`
        ].length > 0
      ) {
        max = key;
      }
    }
    return max;
  };

  const getMinRating = () => {
    let min = question[`${exprt.props.RT_SCALE}`];

    for (const key in questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`]) {
      if (
        Object.hasOwnProperty.call(
          questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`],
          key
        )
      ) {
        const resGroup =
          questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`][key];
        if (
          key > 0 &&
          key < min &&
          resGroup[`${exprt.props.RESPONSE_LIST}`].length > 0
        ) {
          min = key;
        }
      }
    }

    return min;
  };

  // const chartInfo = {
  //   title: "Group Chart",
  //   yAxis: {
  //     allowDecimals: false,
  //     min: 0,
  //     title: {
  //       text: "Average Rating",
  //     },
  //   },
  //   tooltip: {
  //     headerFormat: '<span style="font-size:20px">{point.key}</span><table>',
  //     pointFormat:
  //       '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
  //       '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
  //     footerFormat: "</table>",
  //     shared: true,
  //     useHTML: true,
  //   },
  //   series: [
  //     {
  //       data: ["NaN", "NaN", 4.0, "NaN"],
  //       name: "1",
  //       stack: 0,
  //     },
  //     {
  //       data: [2.5, 7.0, 5.5, 5.0],
  //       name: "2",
  //       stack: 1,
  //     },
  //     {
  //       data: ["NaN", "NaN", 4.0, 6.0],
  //       name: "3",
  //       stack: 2,
  //     },
  //     {
  //       data: ["NaN", "NaN", 4.0, "NaN"],
  //       name: "4",
  //       stack: 4,
  //     },
  //   ],
  //   categories: [2012, 2015, 2020, 2022],
  // };

  // const summaryChartInfo = {
  //   title: "Summary Chart",
  //   yAxis: {
  //     allowDecimals: false,
  //     min: 0,
  //     title: {
  //       text: "Number of responses",
  //     },
  //   },
  //   tooltip: {
  //     headerFormat:
  //       '<span style="font-size:20px">Rate: {point.key}</span><table>',
  //     pointFormat:
  //       '<tr><td style="color:{series.color};padding:0">Series: </td>' +
  //       '<td style="padding:0"><b>{series.name}</b></td></tr>' +
  //       '<tr><td style="color:{series.color};padding:0">#Reponses: </td>' +
  //       '<td style="padding:0"><b>{point.y:1.f}</b></td></tr>',

  //     footerFormat: "</table>",
  //     shared: true,
  //     useHTML: true,
  //   },
  //   categories: [
  //     ...Object.keys(questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`]),
  //   ],
  //   series: [
  //     {
  //       name: "Anonymous",
  //       // data: [],
  //       data: Object.keys(
  //         questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`]
  //       ).reduce(
  //         (data, key) => [
  //           ...data,
  //           questionQRS[`${exprt.props.QUESTION_QRS_RT_RESPONSES}`][key][
  //             `${exprt.props.RESPONSE_LIST}`
  //           ].length,
  //         ],
  //         []
  //       ),
  //     },
  //   ],
  // };

  const MainDisplay = ({ question = {}, questionQRS = {} }) => {
    return (
      <>
        {question && questionQRS && (
          <Card className="mx-2 m-lg-0 ">
            <Card.Header className="text-center m-0 p-0 bg-success text-white">
              <strong>Summary</strong>
            </Card.Header>
            <Card.Body>
              {/* Summary */}
              <Row className="mb-2">
                <Col>
                  Average: <strong>{getAverageRating()}</strong>
                </Col>
                <Col>
                  Min: <strong>{getMinRating()}</strong>
                </Col>
                <Col>
                  Max: <strong>{getMaxRating()}</strong>
                </Col>
              </Row>

              {/* Table summary */}
              <Table responsive hover size="sm" className="m-2">
                <thead>
                  <tr>
                    <th className="border-right">Rate</th>
                    <th className="text-center">Number of Responses</th>
                    <th className="text-center">List of Responses</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(question[`${exprt.props.RT_SCALE}`])].map(
                    (_, rate) => (
                      <tr key={rate}>
                        <td className="border-right">{rate + 1}</td>
                        <td className="text-center">
                          {
                            questionQRS[
                              `${exprt.props.QUESTION_QRS_RT_RESPONSES}`
                            ][rate + 1][`${exprt.props.RESPONSE_LIST}`].length
                          }
                        </td>
                        <td className="text-center">
                          {showResponsesList(
                            questionQRS[
                              `${exprt.props.QUESTION_QRS_RT_RESPONSES}`
                            ][rate + 1][`${exprt.props.RESPONSE_LIST}`]
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>

              {/* Auto chart summary  */}
              <SummaryChartsBuilder
                chartType={`${exprt.props.QUESTION_SUMMARY_CHART}`}
                question={question}
                questionQRS={questionQRS}
              />

              <br></br>
              {/* Advanced chart summary  */}
              <AdvanceChartsBuilder
                chartType={`${exprt.props.QUESTION_ADVANCE_CHART}`}
                question={question}
              />
            </Card.Body>
          </Card>
        )}
      </>
    );
  };

  return (
    <>
      {isValidatedComponent && (
        <MainDisplay question={question} questionQRS={questionQRS} />
      )}
    </>
  );
}

export default RatingQRS;
