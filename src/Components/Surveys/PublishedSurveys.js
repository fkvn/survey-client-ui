import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Table, Button } from "react-bootstrap";
import * as funcs from "../../shared/utility";

function PublishedSurveys(props) {
  const { surveys = [] } = props;

  const [request, setRequest] = useState({
    sortedBy: "Name",
    OrderByAsc: true,
  });

  let items = [];

  const headerMapToObj = {
    "#": "",
    Name: "name",
    Type: "type",
    Author: "author",
    "Published Date": "publishDate",
  };

  if (!funcs.isEmpty(surveys)) {
    items = [...surveys];
  }

  const sortedItems = (items, attr, asc) => {
    if (funcs.isEmpty(items)) return [];

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
            <tr key={survey.id}>
              <td className="text-center">{i + 1}</td>
              <td>
                <Link to={`/surveys/response/submit?sId=${survey.id}`}>
                  {survey.name}
                </Link>
              </td>
              <td className="text-center">{survey.type}</td>
              <td className="text-center">{survey.author.username}</td>
              <td className="text-center">{survey.publishDate}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
  return <>{tables}</>;
}

export default PublishedSurveys;
