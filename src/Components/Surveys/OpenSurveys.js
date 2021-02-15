import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Table, Button, Form } from "react-bootstrap";
import ReactLoading from "react-loading";

import * as exprInit from "../../export/exportInit";

function OpenSurveys(props) {
  const {
    openSurvList = exprInit.dataInitialize.OPEN_SURVEY_LIST_INIT,
    handleValidationError = () => {},
  } = props;

  // console.log(openSurvList["fetchDate"]);
  // retrieve fetch date
  let openSurvFetchDate = null;
  try {
    openSurvFetchDate = exprInit.funcs.dateFormat(
      openSurvList[`${exprInit.abbrInit.FETCHING_DATE}`]
    );
  } catch (error) {}

  useEffect(() => {
    if (!openSurvFetchDate) {
      handleValidationError({
        [`${exprInit.abbrInit.MESSAGE}`]: "The open survey list is not load probably. Please reload or contact administrations!",
      });
    }
  }, [openSurvFetchDate, handleValidationError]);

  const [request, setRequest] = useState({
    sortedBy: "Name",
    OrderByAsc: true,
  });

  let items = openSurvList[`${exprInit.abbrInit.SURVEY_LIST}`];

  const headerMapToObj = {
    "#": "",
    Name: exprInit.serVarInit.SURVEY_NAME,
    Type: exprInit.serVarInit.SURVEY_TYPE,
    Author: exprInit.serVarInit.SURVEY_AUTHOR,
    "Published Date": exprInit.serVarInit.SURVEY_DATE_PUBLISHED,
  };

  const sortedItems = (items, attr, asc) => {
    if (exprInit.funcs.isEmpty(items)) return [];

    let sortedItems = [];

    if (attr === "index") sortedItems = asc ? items : items.reverse();
    else {
      sortedItems = items = items.sort((a, b) => (a[attr] > b[attr] ? 1 : -1));
    }

    if (!asc) {
      sortedItems = sortedItems.reverse();
    }

    return sortedItems;
  };

  const updateSortedItems = (attr) => {
    setRequest({
      sortedBy: attr,
      OrderByAsc: attr !== request.sortedBy ? true : !request.OrderByAsc,
    });
  };

  items = sortedItems(items, request.sortedBy, request.OrderByAsc);

  const tables = (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {Object.keys(headerMapToObj).map((header, index) => (
            <th key={index} className="text-center">
              <Button
                variant="link"
                className="border-0 shadow-none text-decoration-none"
                onClick={() =>
                  headerMapToObj[header] &&
                  updateSortedItems(headerMapToObj[header])
                }
              >
                <strong>{header}</strong>
              </Button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.length < 1 ? (
          <tr>
            <td colSpan="5" className="text-center text-danger">
              <strong>There is no current opening surveys</strong>
            </td>
          </tr>
        ) : (
          items.map((survey, i) => (
            <tr key={survey[`${exprInit.serVarInit.SURVEY_ID}`]}>
              <td className="text-center">{i + 1}</td>
              <td>
                <Link
                  to={`/surveys/response/submit?sId=${
                    survey[`${exprInit.serVarInit.SURVEY_ID}`]
                  }`}
                >
                  {survey.name}
                </Link>
              </td>
              <td className="text-center">
                {survey[`${exprInit.serVarInit.SURVEY_TYPE}`]}
              </td>
              <td className="text-center">
                {
                  survey[`${exprInit.serVarInit.SURVEY_AUTHOR}`][
                    `${exprInit.serVarInit.USER_NAME}`
                  ]
                }
              </td>
              <td className="text-center">
                {survey[`${exprInit.serVarInit.SURVEY_DATE_PUBLISHED}`]}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
  return (
    <>
      {openSurvFetchDate ? (
        <>
          <Form.Text muted>Last Updated: {openSurvFetchDate}</Form.Text>
          {tables}
        </>
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );
}

export default OpenSurveys;
