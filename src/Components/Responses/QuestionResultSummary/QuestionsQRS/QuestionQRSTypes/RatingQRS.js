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
import ColChart from "../../../../Chart/ColChart";
import AdvancedChart from "../../../../Chart/AdvancedChart";

function RatingQRS(props) {
  const { question = {}, questionQRS = {} } = props;

  const isValidatedComponent =
    question.questionType === "RATING" &&
    question.id === questionQRS.question &&
    question.ratingScale === Object.keys(questionQRS.ratingResponses).length;

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
                    unitKey={res.id}
                    title={res.date}
                    key={index}
                  >
                    <ListGroup.Item
                      className="m-0 p-0 border-0"
                      as={Link}
                      to={`/dashboard/mysurveys/survey/${res.survey}/responses/${res.id}`}
                    >
                      {res.type}
                    </ListGroup.Item>
                  </CustomOverlayTrigger>
                )
            )}
          </ListGroup>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );

  const [request, setRequest] = useState({
    showSummChart: false,
    showAdvancedChart: false,
  });

  const getAverageRating = () => {
    let avg = 0;
    for (const key in questionQRS.ratingResponses) {
      avg =
        avg + Number(key) * questionQRS.ratingResponses[key].responses.length;
    }
    avg = avg / questionQRS.totalResponses;
    return funcs.round(Number(avg), 2);
  };

  const getMaxRating = () => {
    let max = 0;

    for (const key in questionQRS.ratingResponses) {
      if (
        key > 0 &&
        key > max &&
        questionQRS.ratingResponses[key].responses.length > 0
      ) {
        max = key;
      }
    }
    return max;
  };

  const getMinRating = () => {
    let min = question.ratingScale;

    for (const key in questionQRS.ratingResponses) {
      if (Object.hasOwnProperty.call(questionQRS.ratingResponses, key)) {
        const resGroup = questionQRS.ratingResponses[key];
        if (key > 0 && key < min && resGroup.responses.length > 0) {
          min = key;
        }
      }
    }

    return min;
  };

  const chartInfo = {
    title: "Group Chart",
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Average Rating",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:20px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    series: [
      {
        data: ["NaN", "NaN", 4.0, "NaN"],
        name: "1",
        stack: 0,
      },
      {
        data: [2.5, 7.0, 5.5, 5.0],
        name: "2",
        stack: 1,
      },
      {
        data: ["NaN", "NaN", 4.0, 6.0],
        name: "3",
        stack: 2,
      },
      {
        data: ["NaN", "NaN", 4.0, "NaN"],
        name: "4",
        stack: 4,
      },
    ],
    categories: [2012, 2015, 2020, 2022],
  };

  const summaryChartInfo = {
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
    categories: [...Object.keys(questionQRS.ratingResponses)],
    series: [
      {
        name: "Anonymous",
        // data: [],
        data: Object.keys(questionQRS.ratingResponses).reduce(
          (data, key) => [
            ...data,
            questionQRS.ratingResponses[key].responses.length,
          ],
          []
        ),
      },
    ],
  };

  console.log(questionQRS);

  const MainDisplay = ({ question = {}, questionQRS = {} }) => {
    return (
      <>
        {question && questionQRS && (
          <Card className="mx-2 m-lg-0 ">
            <Card.Header className="text-center m-0 p-0 bg-success text-white">
              <strong>Summary</strong>
            </Card.Header>
            <Card.Body>
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

              <Table responsive hover size="sm" className="m-2">
                <thead>
                  <tr>
                    <th className="border-right">Rate</th>
                    <th className="text-center">Number of Responses</th>
                    <th className="text-center">List of Responses</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(question.ratingScale)].map((_, rate) => (
                    <tr key={rate}>
                      <td className="border-right">{rate + 1}</td>
                      <td className="text-center">
                        {questionQRS.ratingResponses[rate + 1].responses.length}
                      </td>
                      <td className="text-center">
                        {showResponsesList(
                          questionQRS.ratingResponses[rate + 1].responses
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Button
                variant="link"
                onClick={() =>
                  setRequest({
                    ...request,
                    showSummChart: !request.showSummChart,
                  })
                }
              >
                Show Summary Chart
              </Button>

              {request.showSummChart && (
                <ColChart chartInfo={summaryChartInfo} />
              )}
              <br></br>
              <Button
                variant="link"
                onClick={() =>
                  setRequest({
                    ...request,
                    showAdvancedChart: !request.showAdvancedChart,
                  })
                }
              >
                Advanced Chart
              </Button>
              {request.showAdvancedChart && <AdvancedChart />}
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
