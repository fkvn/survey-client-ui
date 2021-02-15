import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Table,
  InputGroup,
  Row,
  Col,
  Button,
  Pagination,
  Badge,
  Form,
} from "react-bootstrap";
import ReactLoading from "react-loading";

// Update survey builders
import CreateSurveyBuilder from "../../../Containers/DashboardBuilder/UpdateSurveyBuilders/CreateSurveyBuilder";
import DeleteSurveyBuilder from "../../../Containers/DashboardBuilder/UpdateSurveyBuilders/DeleteSurveyBuilder";
import PublishSurveyBuilder from "../../../Containers/DashboardBuilder/UpdateSurveyBuilders/PublishSurveyBuilder";
import CloseSurveyBuilder from "../../../Containers/DashboardBuilder/UpdateSurveyBuilders/CloseSurveyBuilder";

//
import * as funcs from "../../../shared/utility";
import * as exprInit from "../../../export/exportInit";

import SearchForm from "../../SearchForm/SearchForm";
import CustomOverlayTrigger from "../../CustomOverlayTrigger/CustomOverlayTrigger";
import WebLinkSurvey from "../../WebLink/WebLinkSurvey";
import IconButton from "../../CustomButton/IconButton";

function MySurveys(props) {
  const history = useHistory();

  const {
    userSurvList = exprInit.dataInitialize.USER_SURVEY_LIST_INIT,
    handleValidationError = () => {},
    // charts = [],
  } = props;

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

  const [request, setRequest] = useState({
    sortedBy: "",
    OrderByAsc: true,
    page: 1,

    updatingSurvey: null,
    showCreateSurveyModal: false,
    showDeleteSurveyModal: false,
    showPublishSurveyModal: false,
  });

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

  let items = [];

  if (userSurvList[`${exprInit.abbrInit.SURVEY_COUNT}`] > 0) {
    items = [
      ...items,
      ...userSurvList[`${exprInit.abbrInit.SURVEY_LIST}`].map(
        (s) =>
          (s = {
            ...s,
            iStatus: !s.closed && s.publishDate ? true : false,
            iWebLink: !s.closed ? true : false,
          })
      ),
    ];
  }
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
        if (a["iStatus"] !== b["iStatus"]) {
          return a["iStatus"] < b["iStatus"] ? 1 : -1;
        } else return a[attr] < b[attr] ? 1 : -1;
      });
    } else {
      sortedItems = items = items.sort((a, b) => (a[attr] > b[attr] ? 1 : -1));
    }

    if (!asc) {
      sortedItems = sortedItems.reverse();
    }

    return sortedItems;
  };

  items = sortedItems(items, request.sortedBy, request.OrderByAsc);

  const SurveyOptions = ({ survey }) => {
    const summaryResultOption = {
      type: "Summary Result",
      title: "Summary survey result",
      onClick: () =>
        history.push(`/dashboard/mysurveys/survey/${survey.id}/responses`),
    };

    const editSurveyOption = {
      type: "Edit",
      title: "Edit survey",
      disabled: survey.publishDate ? true : false,
      onClick: () =>
        history.push(`/dashboard/mysurveys/editSurvey?sId=${survey.id}`),
    };

    const cloneSurveyOption = {
      type: "Clone",
      title: "Clone survey",
      onClick: () => alert("Clone survey"),
    };

    const deleteSurveyOption = {
      type: "Delete",
      title: "Delete survey",
      disabled: !survey.closed ? true : false,
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
      { ...cloneSurveyOption },
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

  const totalPages = Math.ceil(items.length / 10);
  const pageItems = [];
  for (let number = 1; number <= totalPages; number++) {
    pageItems.push(
      <Pagination.Item
        key={number}
        active={number === request.page}
        onClick={() => setRequest({ ...request, page: number })}
      >
        {number}
      </Pagination.Item>
    );
  }

  items = items.slice((request.page - 1) * 10, request.page * 10);

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
              {items.map((item, index) => (
                <tr key={item.id}>
                  {/* id */}
                  <td className="text-center">
                    {index + (request.page - 1) * 10}
                  </td>

                  {/* name */}
                  <td>
                    <Link
                      to={`/dashboard/mysurveys/survey?sId=${item.id}`}
                      className="text-decoration-none"
                    >
                      <div dangerouslySetInnerHTML={{ __html: item.name }} />
                    </Link>
                  </td>

                  {/* created Date */}
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

                  {/* Published Date */}
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

                  {/* Total responses */}
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
      {request.showCreateSurveyModal && (
        <CreateSurveyBuilder
          show={request.showCreateSurveyModal}
          onHide={() =>
            setRequest({ ...request, showCreateSurveyModal: false })
          }
        />
      )}
      {request.showDeleteSurveyModal && (
        <DeleteSurveyBuilder
          show={request.showDeleteSurveyModal}
          onHide={() =>
            setRequest({ ...request, showDeleteSurveyModal: false })
          }
          survey={request.updatingSurvey}
        />
      )}
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

// eslint-disable-next-line no-func-assign
export default React.memo(MySurveys);
