import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Table,
  InputGroup,
  Row,
  Col,
  Button,
  Pagination,
  Badge,
} from "react-bootstrap";

// Update survey builders
import CreateSurveyBuilder from "../../../Containers/DashboardBuilder/SurveyBuilders/CreateSurveyBuilder";
import DeleteSurveyBuilder from "../../../Containers/DashboardBuilder/SurveyBuilders/DeleteSurveyBuilder";
import PublishSurveyBuilder from "../../../Containers/DashboardBuilder/SurveyBuilders/PublishSurveyBuilder";
import CloseSurveyBuilder from "../../../Containers/DashboardBuilder/SurveyBuilders/CloseSurveyBuilder";

import SearchForm from "../../SearchForm/SearchForm";
import CustomOverlayTrigger from "../../CustomOverlayTrigger/CustomOverlayTrigger";
import WebLinkSurvey from "../../WebLink/WebLinkSurvey";
import IconButton from "../../CustomButton/IconButton";

import * as exprt from "../../../shared/export";

function MySurveys(props) {
  // ================================= init =========================
  const history = useHistory();

  const { surveys = [] } = props;

  const [request, setRequest] = useState({
    // sortedBy: "",
    // OrderByAsc: true,
    page: 1,

    updatingSurvey: null,
    showCreateSurveyModal: false,
    showDeleteSurveyModal: false,
    showPublishSurveyModal: false,
  });

  const headerMapToObj = {
    "#": "",
    Name: "name",
    "Created Date": "createdDate",
    "Web Link": "iWebLink",
    Status: "iStatus",
    "Published Date": "publishDate",
    "Closed Date": "closeDate",
    "Total Responses": "numberOfResponses",
    Options: "",
  };

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
  //       if (a["iStatus"] !== b["iStatus"]) {
  //         return a["iStatus"] < b["iStatus"] ? 1 : -1;
  //       } else return a[attr] < b[attr] ? 1 : -1;
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
            onClick={() => setRequest({ ...request, page: number })}
          >
            {number}
          </Pagination.Item>
        );
      }

    return pages;
  };

  const updateItemPropsFromSurvey = (surveys = []) => {
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

    return updatedItem;
  };

  const updateItemListFromPage = (items = [], page = -1) => {
    if (page > 0) return items.slice((page - 1) * 10, page * 10);
    else return [];
  };

  // ================================= logic flow =========================

  // update items' props
  items = updateItemPropsFromSurvey(surveys);

  // sort item list
  // items = sortedItems(items, request.sortedBy, request.OrderByAsc);

  // pages handling
  pages = generatePages(items, request.page);

  // update #items on the current page
  items = updateItemListFromPage(items, request.page);

  // ================================= sub-components =========================

  const createSurvey = (
    <CreateSurveyBuilder
      show={request.showCreateSurveyModal}
      onHide={() => setRequest({ ...request, showCreateSurveyModal: false })}
    />
  );

  const deleteSurvey = (
    <DeleteSurveyBuilder
      show={request.showDeleteSurveyModal}
      onHide={() => setRequest({ ...request, showDeleteSurveyModal: false })}
      survey={request.updatingSurvey}
    />
  );

  const navBar = (
    <Row className="w-100 mb-3">
      <Col xs={12} xl={2} className="">
        <InputGroup className="mb-3">
          <Button
            variant="success"
            className="mr-2"
            onClick={() =>
              setRequest({ ...request, showCreateSurveyModal: true })
            }
          >
            Create Survey
          </Button>
        </InputGroup>
      </Col>
      <Col xs={12} xl={10}>
        <SearchForm></SearchForm>
      </Col>
    </Row>
  );

  const SurveyOptions = ({ survey }) => {
    const summaryResultOption = {
      type: "Summary Result",
      title: "Summary survey result",
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/survey/${
            survey[`${exprt.props.SURVEY_ID}`]
          }/responses`
        ),
    };

    const editSurveyOption = {
      type: "Edit",
      title: "Edit survey",
      disabled: survey[`${exprt.props.SURVEY_PUBLISHED_DATE}`] ? true : false,
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/editSurvey?sId=${
            survey[`${exprt.props.SURVEY_ID}`]
          }`
        ),
    };

    const deleteSurveyOption = {
      type: "Delete",
      title: "Delete survey",
      disabled: !survey[`${exprt.props.SURVEY_IS_CLOSED}`] ? true : false,
      onClick: () =>
        setRequest({
          ...request,
          showDeleteSurveyModal: true,
          updatingSurvey: survey,
        }),
    };

    const allowedOptions = [
      { ...summaryResultOption },
      { ...editSurveyOption },
      { ...deleteSurveyOption },
    ];

    return (
      <>
        {allowedOptions.map((op, i) => (
          <IconButton
            type={op.type}
            title={op.title}
            onClickHandler={op.onClick}
            key={i}
            index={i}
            disabled={op.disabled ? true : false}
          />
        ))}
      </>
    );
  };

  const pageList = <Pagination>{pages}</Pagination>;

  const tbItemList = (
    <>
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
            {items.map((item, index) => (
              <tr key={item[`${exprt.props.ITEM_ID}`]}>
                {/* id */}
                <td className="text-center">
                  {index + (request.page - 1) * 10}
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

                {/* created Date */}
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

                {/* Published Date */}
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
                    unitKey={item[`${exprt.props.ITEM_ID}`]}
                    title={
                      item[`${exprt.props.ITEM_CLOSED_DATE}`].split(" ")[1]
                    }
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

                {/* Total responses */}
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

                {/* Options */}
                <td>
                  <SurveyOptions survey={item} />
                </td>
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
    </>
  );

  const returnRender = (
    <>
      {request.showCreateSurveyModal && createSurvey}
      {request.showDeleteSurveyModal && deleteSurvey}
      {navBar}
      <Row>{tbItemList}</Row>
      <Row>
        <Col xs={{ span: 2, offset: 5 }}>{pageList}</Col>
      </Row>
    </>
  );

  return returnRender;
}

// eslint-disable-next-line no-func-assign
export default React.memo(MySurveys);
