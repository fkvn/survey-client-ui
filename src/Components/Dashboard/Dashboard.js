import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Table,
  InputGroup,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
  Pagination,
  Badge,
} from "react-bootstrap";

import * as funcs from "../../shared/utility";
import SearchForm from "../SearchForm/SearchForm";

import CustomOverlayTrigger from "../CustomOverlayTrigger/CustomOverlayTrigger";
import PublishSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/PublishSurveyBuilder";
import CloseSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/CloseSurveyBuilder";
import WebLinkSurvey from "../WebLink/WebLinkSurvey";

function Dashboard(props) {
  const { surveys = [], charts = [] } = props;

  const [request, setRequest] = useState({
    sortedBy: "",
    OrderByAsc: true,
  });

  const [type, setType] = useState("All");
  const typeList = ["Surveys", "Charts", "All"];
  const dropdownTitle = type ? "Type: " + type : "Type";

  const navBar = (
    <Row className="w-100">
      <Col xs={12} xl={2} className="mb-2">
        <InputGroup className="mb-3">
          <DropdownButton
            as={InputGroup.Prepend}
            variant="outline-primary"
            title={dropdownTitle}
            id="input-group-dropdown-1"
            className=""
          >
            {typeList.map((ty, index) => (
              <Dropdown.Item key={index} onClick={() => setType(ty)}>
                {ty}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </InputGroup>
      </Col>
      <Col xs={12} xl={10} className="mb-3">
        <SearchForm></SearchForm>
      </Col>
    </Row>
  );

  const headerMapToObj = {
    Type: "iType",
    Name: "name",
    "Created Date": "createdDate",
    "Web Link": "iWebLink",
    Status: "iStatus",
    "Published Date": "publishDate",
    "Closed Date": "closeDate",
    "Total Responses": "numberOfResponses",
  };

  const updateSortedItems = (attr) => {
    setRequest({
      ...request,
      sortedBy: attr,
      OrderByAsc: attr !== request.sortedBy ? true : !request.OrderByAsc,
    });
  };

  const sortedItems = (items, attr, asc) => {
    if (funcs.isEmpty(items)) return [];

    let sortedItems = [];

    if (attr === "publishDate" || attr === "closeDate") {
      sortedItems = items = items.sort((a, b) => {
        if (a["iStatus"] === b["iStatus"]) {
          return a[attr] > b[attr] ? 1 : -1;
        } else return a["iStatus"] > b["iStatus"] ? 1 : -1;
      });
    } else {
      sortedItems = items = items.sort((a, b) => (a[attr] > b[attr] ? 1 : -1));
    }

    if (!asc) {
      sortedItems = sortedItems.reverse();
    }

    return sortedItems;
  };

  let items = [];

  if (surveys) {
    items = [
      ...items,
      ...surveys.map(
        (s) =>
          (s = {
            ...s,
            iType: "Survey",
            iStatus: !s.closed && s.publishDate ? true : false,
            iWebLink: !s.closed ? true : false,
          })
      ),
    ];
  }

  if (charts) {
    items = [...items, ...charts.map((s) => (s = { ...s, iType: "Chart" }))];
  }

  switch (type) {
    case "Surveys":
      items = items.filter((item) => item.iType === "Survey");
      break;
    case "Charts":
      items = items.filter((item) => item.iType === "Chart");
      break;
    default:
      break;
  }

  items = sortedItems(items, request.sortedBy, request.OrderByAsc);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / 10);
  const pageItems = [];
  for (let number = 1; number <= totalPages; number++) {
    pageItems.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => setPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  items = items.slice((page - 1) * 10, page * 10);

  const list = (
    <>
      <Row>
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
          {items.length > 0 ? (
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">
                    <Link
                      to={`dashboard/mysurveys`}
                      className="text-decoration-none text-info"
                    >
                      {item.iType}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/mysurveys/survey?sId=${item.id}`}
                      className="text-decoration-none"
                    >
                      <div dangerouslySetInnerHTML={{ __html: item.name }} />
                    </Link>
                  </td>

                  <CustomOverlayTrigger
                    unitKey={item.id}
                    title={item.createdDate.split(" ")[1]}
                  >
                    <td className="text-center">
                      {item.createdDate.split(" ")[0]}
                    </td>
                  </CustomOverlayTrigger>

                  {/* Web Link */}
                  <td className="text-center">
                    {item.iWebLink ? (
                      <WebLinkSurvey survey={item} />
                    ) : (
                      <Badge variant="secondary">Unavailable</Badge>
                    )}
                  </td>

                  {/* Status */}
                  <td className="text-center">
                    {item.iStatus ? (
                      <Badge variant="success">OPEN</Badge>
                    ) : (
                      <Badge variant="dark">CLOSED</Badge>
                    )}
                  </td>

                  {/* publish Date */}
                  {!item.closed ? (
                    <CustomOverlayTrigger
                      unitKey={item.id}
                      title={item.publishDate.split(" ")[1]}
                    >
                      <td className="text-center">
                        {item.publishDate.split(" ")[0]}
                      </td>
                    </CustomOverlayTrigger>
                  ) : (
                    <td className="text-center">
                      <PublishSurveyBuilder survey={item}>
                        <Button variant="success" size="sm">
                          Publish
                        </Button>
                      </PublishSurveyBuilder>
                    </td>
                  )}

                  {/* Closed Date */}
                  {!item.closed ? (
                    <td className="text-center">
                      <CloseSurveyBuilder survey={item} />
                    </td>
                  ) : item.closeDate ? (
                    <CustomOverlayTrigger
                      unitKey={item.id}
                      title={item.closeDate.split(" ")[1]}
                    >
                      <td className="text-center">
                        {item.closeDate.split(" ")[0]}
                      </td>
                    </CustomOverlayTrigger>
                  ) : (
                    <td
                      style={{
                        backgroundColor: "#ddd",
                        cursor: "not-allowed",
                      }}
                    ></td>
                  )}

                  {item.numberOfResponses != null ? (
                    <td className="text-center">{item.numberOfResponses}</td>
                  ) : (
                    <td
                      style={{
                        backgroundColor: "#ddd",
                        cursor: "not-allowed",
                      }}
                    ></td>
                  )}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={Object.keys(headerMapToObj).length}
                  className="text-danger text-center"
                >
                  <strong>There is no items to be found !!! </strong>
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </Row>
      <Row>
        <Col xs={{ span: 2, offset: 5 }}>
          <Pagination>{pageItems}</Pagination>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      {navBar}
      {list}
    </>
  );
}

export default withRouter(Dashboard);
