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

import SearchForm from "../SearchForm/SearchForm";

import CustomOverlayTrigger from "../CustomOverlayTrigger/CustomOverlayTrigger";

import WebLinkSurvey from "../WebLink/WebLinkSurvey";

import * as exprt from "../../shared/export";
import PublishSurveyBuilder from "../../Containers/DashboardBuilder/SurveyBuilders/PublishSurveyBuilder";
import CloseSurveyBuilder from "../../Containers/DashboardBuilder/SurveyBuilders/CloseSurveyBuilder";

function Dashboard(props) {
  // ================================= init =========================
  const { surveys = [], charts = [] } = props;

  // const [request, setRequest] = useState({
  //   sortedBy: "",
  //   OrderByAsc: true,
  // });

  const [type, setType] = useState("All");
  const typeList = ["Surveys", "Charts", "All"];
  const dropdownTitle = type ? "Type: " + type : "Type";

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

  const [page, setPage] = useState(1);
  let pages = [];
  let items = [];

  // ================================= functions =========================

  // const updateSortedItems = (attr) => {
  //   setRequest({
  //     ...request,
  //     sortedBy: attr,
  //     OrderByAsc: attr !== request.sortedBy ? true : !request.OrderByAsc,
  //   });
  // };

  // const sortedItems = (items, attr, asc) => {
  //   if (funcs.isEmpty(items)) return [];

  //   let sortedItems = [];

  //   if (attr === "publishDate" || attr === "closeDate") {
  //     sortedItems = items = items.sort((a, b) => {
  //       if (a["iStatus"] === b["iStatus"]) {
  //         return a[attr] > b[attr] ? 1 : -1;
  //       } else return a["iStatus"] > b["iStatus"] ? 1 : -1;
  //     });
  //   } else {
  //     sortedItems = items = items.sort((a, b) => (a[attr] > b[attr] ? 1 : -1));
  //   }

  //   if (!asc) {
  //     sortedItems = sortedItems.reverse();
  //   }

  //   return sortedItems;
  // };

  const generatePages = (items = [], page = -1) => {
    const totalPages = Math.ceil(items.length / 10);
    const pages = [];

    if (page > 0)
      for (let number = 1; number <= totalPages; number++) {
        pages.push(
          <Pagination.Item
            key={number}
            active={number === page}
            onClick={() => setPage(number)}
          >
            {number}
          </Pagination.Item>
        );
      }

    return pages;
  };

  const updateItemProps = (surveys = [], charts = []) => {
    let updatedItem = [];

    if (surveys.length > 0) {
      updatedItem = [
        ...surveys.map(
          (s) =>
            (s = {
              ...s,
              [`${exprt.props.ITEM_TYPE}`]: "Survey",
              [`${exprt.props.ITEM_ID}`]: s[`${exprt.props.SURVEY_ID}`],
              [`${exprt.props.ITEM_NAME}`]: s[`${exprt.props.SURVEY_NAME}`],
              [`${exprt.props.ITEM_CREATED_DATE}`]: s[
                `${exprt.props.SURVEY_CREATED_DATE}`
              ],
              [`${exprt.props.ITEM_PUBLISHED_DATE}`]: s[
                `${exprt.props.SURVEY_PUBLISHED_DATE}`
              ],
              [`${exprt.props.ITEM_CLOSED_DATE}`]: s[
                `${exprt.props.SURVEY_CLOSED_DATE}`
              ],
              [`${exprt.props.ITEM_IS_CLOSED}`]: s[
                `${exprt.props.SURVEY_IS_CLOSED}`
              ],
              [`${exprt.props.ITEM_STATUS}`]:
                !s[`${exprt.props.SURVEY_IS_CLOSED}`] &&
                s[`${exprt.props.SURVEY_PUBLISHED_DATE}`]
                  ? true
                  : false,
              [`${exprt.props.ITEM_WEB_LINK}`]: !s[
                `${exprt.props.SURVEY_IS_CLOSED}`
              ]
                ? true
                : false,
              [`${exprt.props.ITEM_RESPONSE_COUNT}`]: s[
                `${exprt.props.RESPONSE_COUNT}`
              ],
            })
        ),
      ];
    }

    if (charts.length > 0) {
      updatedItem = [
        ...updatedItem,
        ...charts.map(
          (c) =>
            (c = {
              ...c,
              [`${exprt.props.ITEM_TYPE}`]: "Chart",
              [`${exprt.props.ITEM_STATUS}`]: false,
              [`${exprt.props.ITEM_WEB_LINK}`]: false,
            })
        ),
      ];
    }

    return updatedItem;
  };

  const updateItemListFromType = (items = [], type = "") => {
    let updatedItem = [...items];

    switch (type) {
      case "Surveys":
        updatedItem = items.filter(
          (item) => item[`${exprt.props.ITEM_TYPE}`] === "Survey"
        );
        break;
      case "Charts":
        updatedItem = items.filter(
          (item) => item[`${exprt.props.ITEM_TYPE}`] === "Chart"
        );
        break;
      default:
        break;
    }

    return updatedItem;
  };

  const updateItemListFromPage = (items = [], page = -1) => {
    if (page > 0) return items.slice((page - 1) * 10, page * 10);
    else return [];
  };

  // ================================= logic flow =========================

  // update items' props
  items = updateItemProps(surveys, charts);

  // update items list from type
  items = updateItemListFromType(items, type);

  // sort item list
  // items = sortedItems(items, request.sortedBy, request.OrderByAsc);

  // pages handling
  pages = generatePages(items, page);

  // update #items on the current page
  items = updateItemListFromPage(items, page);

  // ================================= sub-components =========================
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

  const tbItemList = (
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
      {items.length > 0 ? (
        <tbody>
          {items.map((item) => (
            <tr key={item[`${exprt.props.ITEM_ID}`]}>
              <td className="text-center">
                <Link
                  to={`dashboard/mysurveys`}
                  className="text-decoration-none text-info"
                >
                  {item[`${exprt.props.ITEM_TYPE}`]}
                </Link>
              </td>

              {/* name */}
              <td className="text-center">
                <Link
                  to={`/dashboard/mysurveys/survey?sId=${
                    item[`${exprt.props.ITEM_ID}`]
                  }`}
                  className="text-decoration-none"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item[`${exprt.props.ITEM_NAME}`],
                    }}
                  />
                </Link>
              </td>

              {/* created date */}
              <CustomOverlayTrigger
                unitKey={item[`${exprt.props.ITEM_ID}`]}
                title={item[`${exprt.props.ITEM_CREATED_DATE}`].split(" ")[1]}
              >
                <td className="text-center">
                  {item[`${exprt.props.ITEM_CREATED_DATE}`].split(" ")[0]}
                </td>
              </CustomOverlayTrigger>

              {/* Web Link */}
              <td className="text-center">
                {item[`${exprt.props.ITEM_WEB_LINK}`] ? (
                  <WebLinkSurvey survey={item} />
                ) : (
                  <Badge variant="secondary">Unavailable</Badge>
                )}
              </td>

              {/* Status */}
              <td className="text-center">
                {item[`${exprt.props.ITEM_STATUS}`] ? (
                  <Badge variant="success">OPEN</Badge>
                ) : (
                  <Badge variant="dark">CLOSED</Badge>
                )}
              </td>

              {/* publish Date */}
              {!item[`${exprt.props.ITEM_IS_CLOSED}`] ? (
                <CustomOverlayTrigger
                  unitKey={item[`${exprt.props.ITEM_ID}`]}
                  title={
                    item[`${exprt.props.ITEM_PUBLISHED_DATE}`].split(" ")[1]
                  }
                >
                  <td className="text-center">
                    {item[`${exprt.props.ITEM_PUBLISHED_DATE}`].split(" ")[0]}
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
              {!item[`${exprt.props.ITEM_IS_CLOSED}`] ? (
                <td className="text-center">
                  <CloseSurveyBuilder survey={item} />
                </td>
              ) : item[`${exprt.props.ITEM_CLOSED_DATE}`] ? (
                <CustomOverlayTrigger
                  unitKey={item.id}
                  title={item[`${exprt.props.ITEM_CLOSED_DATE}`].split(" ")[1]}
                >
                  <td className="text-center">
                    {item[`${exprt.props.ITEM_CLOSED_DATE}`].split(" ")[0]}
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

              {/* # Responses */}
              {item[`${exprt.props.ITEM_RESPONSE_COUNT}`] != null ? (
                <td className="text-center">
                  {item[`${exprt.props.ITEM_RESPONSE_COUNT}`]}
                </td>
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
  );

  const pageList = <Pagination>{pages}</Pagination>;

  const returnRender = (
    <>
      <Row>{tbItemList}</Row>
      <Row>
        <Col xs={{ span: 2, offset: 5 }}>{pageList}</Col>
      </Row>
    </>
  );

  return (
    <>
      {navBar}
      {returnRender}
    </>
  );
}

export default withRouter(Dashboard);
