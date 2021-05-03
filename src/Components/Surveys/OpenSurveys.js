import React from "react";
import { Link } from "react-router-dom";

import { Table, Button } from "react-bootstrap";

import * as exprt from "../../shared/export";

function OpenSurveys(props) {
  // ================================= init =========================

  // const [request, setRequest] = useState({
  //   sortedBy: "Name",
  //   OrderByAsc: true,
  // });

  const { surveys = [] } = props;

  const headerMapToObj = {
    "#": "",
    Name: [`${exprt.props.SURVEY_NAME}`],
    Type: [`${exprt.props.SURVEY_TYPE}`],
    "Published Date": [`${exprt.props.SURVEY_PUBLISHED_DATE}`],
  };

  let items = [...surveys];

  // ================================= functions =========================

  // const sortedItems = (items, attr, asc) => {
  //   if (funcs.isEmpty(items)) return [];

  //   let sortedItems = [];

  //   if (attr === "index") sortedItems = asc ? items : items.reverse();
  //   else {
  //     sortedItems = items = items.sort((a, b) => (a[attr] > b[attr] ? 1 : -1));
  //   }

  //   if (!asc) {
  //     sortedItems = sortedItems.reverse();
  //   }

  //   return sortedItems;
  // };

  // const updateSortedItems = (attr) => {
  //   setRequest({
  //     sortedBy: attr,
  //     OrderByAsc: attr !== request.sortedBy ? true : !request.OrderByAsc,
  //   });
  // };

  // ================================= logic flow =========================

  // sort item list
  // items = sortedItems(items, request.sortedBy, request.OrderByAsc);

  // ================================= sub-components =========================

  const returnRender = (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {Object.keys(headerMapToObj).map((header, index) => (
            <th key={index} className="text-center">
              <Button
                variant="link"
                className="border-0 shadow-none text-decoration-none"
                // onClick={() =>
                //   headerMapToObj[header] &&
                //   updateSortedItems(headerMapToObj[header])
                // }
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
            <tr key={survey[`${exprt.props.SURVEY_ID}`]}>
              <td className="text-center">{i + 1}</td>
              <td className="text-center">
                <Link
                  to={`/surveys/response/submit?sId=${
                    survey[`${exprt.props.SURVEY_ID}`]
                  }`}
                >
                  {survey[`${exprt.props.SURVEY_NAME}`]}
                </Link>
              </td>
              <td className="text-center">
                {survey[`${exprt.props.SURVEY_TYPE}`]}
              </td>
              <td className="text-center">
                {survey[`${exprt.props.SURVEY_PUBLISHED_DATE}`]}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
  return <>{returnRender}</>;
}

export default OpenSurveys;
