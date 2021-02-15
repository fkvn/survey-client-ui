import React, { useEffect, useState } from "react";
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
  Form,
} from "react-bootstrap";
import ReactLoading from "react-loading";

import SearchForm from "../SearchForm/SearchForm";
import CustomOverlayTrigger from "../CustomOverlayTrigger/CustomOverlayTrigger";
import PublishSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/PublishSurveyBuilder";
import CloseSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/CloseSurveyBuilder";
import WebLinkSurvey from "../WebLink/WebLinkSurvey";

import * as exprInit from "../../export/exportInit";

function Dashboard(props) {
  const {
    userSurvList = exprInit.dataInitialize.USER_SURVEY_LIST_INIT,
    handleValidationError = () => {},
    // charts = [],
  } = props;

  const [request, setRequest] = useState({
    sortedBy: "",
    OrderByAsc: true,
  });

  const [type, setType] = useState("All");
  const typeList = ["Surveys", "Charts", "All"];
  const dropdownTitle = type ? "Type: " + type : "Type";

  // retrieve fetch date
  let userSurvFetchDate = null;
  try {
    userSurvFetchDate = exprInit.funcs.dateFormat(
      userSurvList[`${exprInit.abbrInit.FETCHING_DATE}`]
    );
  } catch (error) {}

  useEffect(() => {
    if (!userSurvFetchDate) {
      handleValidationError({
        [`${exprInit.abbrInit.MESSAGE}`]: "The survey list is not load probably. Please reload or contact administrations!",
      });
    }
  }, [userSurvFetchDate, handleValidationError]);

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
    Name: exprInit.serVarInit.SURVEY_NAME,
    "Created Date": exprInit.serVarInit.SURVEY_DATE_CREATED,
    "Web Link": "iWebLink",
    Status: "iStatus",
    "Published Date": exprInit.serVarInit.SURVEY_DATE_PUBLISHED,
    "Closed Date": exprInit.serVarInit.SURVEY_DATE_CLOSED,
    "Total Responses": exprInit.serVarInit.SURVEY_RESPONSE_COUNT,
  };

  const updateSortedItems = (attr) => {
    setRequest({
      ...request,
      sortedBy: attr,
      OrderByAsc: attr !== request.sortedBy ? true : !request.OrderByAsc,
    });
  };

  const sortedItems = (items, attr, asc) => {
    if (exprInit.funcs.isEmpty(items)) return [];

    let sortedItems = [];

    if (
      attr === exprInit.serVarInit.SURVEY_DATE_PUBLISHED ||
      attr === exprInit.serVarInit.SURVEY_DATE_CLOSED
    ) {
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

  if (userSurvList[`${exprInit.abbrInit.SURVEY_COUNT}`] > 0) {
    items = [
      ...items,
      ...userSurvList[`${exprInit.abbrInit.SURVEY_LIST}`].map(
        (s) =>
          (s = {
            ...s,
            id: s[`${exprInit.serVarInit.SURVEY_ID}`],
            name: s[`${exprInit.serVarInit.SURVEY_NAME}`],
            createdDate: s[`${exprInit.serVarInit.SURVEY_DATE_CREATED}`],
            closed: s[`${exprInit.serVarInit.SURVEY_IS_ARCHIVED}`],
            closeDate: s[`${exprInit.serVarInit.SURVEY_DATE_CLOSED}`],
            numberOfResponses:
              s[`${exprInit.serVarInit.SURVEY_RESPONSE_COUNT}`],
            iType: "Survey",

            iStatus:
              !s[`${exprInit.serVarInit.SURVEY_DATE_CLOSED}`] &&
              s[`${exprInit.serVarInit.SURVEY_DATE_PUBLISHED}`]
                ? true
                : false,
            iWebLink: !s[`${exprInit.serVarInit.SURVEY_DATE_CLOSED}`]
              ? true
              : false,
          })
      ),
    ];
  }

  // if (charts) {
  //   items = [...items, ...charts.map((s) => (s = { ...s, iType: "Chart" }))];
  // }

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
      {userSurvFetchDate ? (
        <>
          {navBar}
          <Form.Text muted>Last Updated: {userSurvFetchDate}</Form.Text>
          {list}
        </>
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );
}

export default withRouter(Dashboard);
