import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import DeleteResponseBuilder from "../../Containers/ResponsesBuilder/UpdateResponseBuilders/DeleteResponseBuilder";

import * as funcs from "../../shared/utility";
import IconButton from "../CustomButton/IconButton";
import CustomOverlayTrigger from "../CustomOverlayTrigger/CustomOverlayTrigger";

import * as exprt from "../../shared/export";
import CustomBreadcrumb from "../CustomBreadcrumb/CustomBreadcrumb";

function ResponseSummary(props) {
  // ================================= init =========================
  const { survey = exprt.db.initDb.FULL_SURVEY_INIT, responses = [] } = props;
  const history = useHistory();

  const [request, setRequest] = useState({
    showDeleteResponseModal: false,
    reqDeleteResponseIndex: -1,

    // sortedAttr: "type",
    // sortedType: funcs.STR_TYPE,
    // OrderByAsc: true,
  });

  let items = [...responses].filter(
    (res) => !res[`${exprt.props.IS_ARCHIVED}`]
  );

  const headers = [
    { title: "#" },
    { title: "Respondent", prop: "type", type: funcs.STR_TYPE },
    { title: "Date", prop: "date", type: funcs.DATE_TYPE },
    { title: "Options" },
  ];

  const breadcumbItems = [
    {
      title: "My Surveys",
      onClick: () => history.push(`/dashboard/mysurveys`),
    },

    {
      title: survey[`${exprt.props.SURVEY_NAME}`],
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/survey?sId=${
            survey[`${exprt.props.SURVEY_ID}`]
          }`
        ),
    },
    {
      title: "Responses",
      onClick: () => window.location.reload(),
    },
  ];

  let isRender = false;

  // ================================= logic flow =========================

  if (survey[`${exprt.props.SURVEY_ID}`] > -1) {
    isRender = true;
  }

  // sort by date
  items = items.sort((a, b) => (a.date < b.date ? 1 : -1));

  // ================================= sub-component =========================

  // items = funcs.sortedItems(
  //   items,
  //   request.sortedAttr,
  //   request.sortedType,
  //   request.OrderByAsc
  // );

  const deleteResponseModal = request.showDeleteResponseModal && (
    <DeleteResponseBuilder
      show={true}
      onHide={() => setRequest({ ...request, showDeleteResponseModal: false })}
      surveyId={survey[`${exprt.props.SURVEY_ID}`]}
      response={items[request.reqDeleteResponseIndex]}
    ></DeleteResponseBuilder>
  );

  const ReponseOption = ({ response = {}, index = -1 }) => {
    const individualResponseOption = {
      type: "Summary",
      title: "Individual response summary",
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/survey/${
            survey[`${exprt.props.SURVEY_ID}`]
          }/responses/${response[`${exprt.props.RESPONSE_ID}`]}`
        ),
    };

    const deleteResponseOption = {
      type: "Delete",
      title: "Remove response",
      onClick: () =>
        index > -1 &&
        setRequest({
          ...request,
          showDeleteResponseModal: true,
          reqDeleteResponseIndex: index,
        }),
    };

    const allowedOptions = [
      { ...individualResponseOption },
      { ...deleteResponseOption },
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
            btnClassName="m-0 p-0"
            disabled={op.disabled ? true : false}
          />
        ))}
      </>
    );
  };

  const breadcrumb = (
    <CustomBreadcrumb items={breadcumbItems} iconClassname="ml-1">
      <IconButton
        type="Summary"
        title="Question Summary"
        onClickHandler={() =>
          history.push(
            `/dashboard/mysurveys/survey/${
              survey[`${exprt.props.SURVEY_ID}`]
            }/responses/questionSummary`
          )
        }
        btnClassName=""
        size="md"
        disabled={false}
      />
    </CustomBreadcrumb>
  );

  const responseGroups = (
    <Link
      to={`/dashboard/mysurveys/survey/${
        survey[`${exprt.props.SURVEY_ID}`]
      }/responses/groups`}
    >
      <Button className="mt-3 mb-4" variant="primary" size="sm">
        View responses in Groups
      </Button>
    </Link>
  );

  const TbResponsesList = ({ responses = [] }) => {
    return (
      <>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="text-center m-0 p-0">
                  <Button
                    variant="link"
                    className="border-0 shadow-none text-decoration-none"
                    // onClick={() =>
                    // {
                    //   if (header.prop && header.type) {
                    //     const newSortedRequest = funcs.updateSortedTitles(
                    //       request.sortedAttr,
                    //       request.OrderByAsc,
                    //       header.prop,
                    //       header.type
                    //     );

                    //     return setRequest({ ...request, ...newSortedRequest });
                    //   }
                    // }}
                  >
                    <strong>{header.title}</strong>
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responses.length > 0 ? (
              responses.map((response, index) => (
                <tr key={index}>
                  <td className="text-center">{index}</td>
                  <td className="text-center">
                    <Link
                      to={`/dashboard/mysurveys/survey/${
                        survey[`${exprt.props.SURVEY_ID}`]
                      }/responses/${response[`${exprt.props.RESPONSE_ID}`]}`}
                      className="text-decoration-none"
                    >
                      {funcs.toSentenceCase(
                        response[`${exprt.props.RESPONSE_TYPE}`]
                      )}
                    </Link>
                  </td>
                  <CustomOverlayTrigger
                    unitKey={response[`${exprt.props.RESPONSE_ID}`]}
                    title={
                      response[`${exprt.props.RESPONSE_DATE}`].split(" ")[1]
                    }
                  >
                    <td className="text-center">
                      {response[`${exprt.props.RESPONSE_DATE}`].split(" ")[0]}
                    </td>
                  </CustomOverlayTrigger>
                  <td className="text-center">
                    <ReponseOption response={response} index={index} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center text-danger"
                >
                  <strong>There is no responses to be found !!! </strong>{" "}
                </td>
              </tr>
            )}
          </tbody>
        </Table>{" "}
      </>
    );
  };

  const returnRender = (
    <>
      {deleteResponseModal}
      {breadcrumb}
      {responseGroups}
      <TbResponsesList responses={items} />
    </>
  );

  return isRender && returnRender;
}

export default ResponseSummary;
