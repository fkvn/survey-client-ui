import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import DeleteResponseBuilder from "../../Containers/ResponsesBuilder/UpdateResponseBuilders/DeleteResponseBuilder";

import * as funcs from "../../shared/utility";
import IconButton from "../CustomButton/IconButton";
import CustomOverlayTrigger from "../CustomOverlayTrigger/CustomOverlayTrigger";

function ResponseSummary(props) {
  const { survey = {}, responses = [] } = props;
  const history = useHistory();

  const [request, setRequest] = useState({
    activeResponse: null,
    showDeleteResponseModal: false,

    sortedAttr: "type",
    sortedType: funcs.STR_TYPE,
    OrderByAsc: true,
  });

  // modals

  const deleteResponseModal = request.showDeleteResponseModal && (
    <DeleteResponseBuilder
      show={true}
      onHide={() => setRequest({ ...request, showDeleteResponseModal: false })}
      surveyId={survey.id}
      response={request.activeResponse}
      updateAfterRemoveResponse={() =>
        setRequest({
          ...request,
          showDeleteResponseModal: false,
          activeResponse: null,
        })
      }
    ></DeleteResponseBuilder>
  );

  //

  let items = [...responses].filter((res) => res.isDeleted === false);

  const headers = [
    { title: "#" },
    { title: "Respondent", prop: "type", type: funcs.STR_TYPE },
    { title: "Date", prop: "date", type: funcs.DATE_TYPE },
    { title: "Options" },
  ];

  items = funcs.sortedItems(
    items,
    request.sortedAttr,
    request.sortedType,
    request.OrderByAsc
  );

  const ReponseOption = ({ response }) => {
    const individualResponseOption = {
      type: "Summary",
      title: "Individual response summary",
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/survey/${survey.id}/responses/${response.id}`
        ),
    };

    const deleteResponseOption = {
      type: "Delete",
      title: "Remove response",
      onClick: () =>
        setRequest({
          ...request,
          showDeleteResponseModal: true,
          activeResponse: response,
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

  const MainDisplay = ({ responses }) => {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="text-center m-0 p-0">
                  <Button
                    variant="link"
                    className="border-0 shadow-none text-decoration-none"
                    onClick={() => {
                      if (header.prop && header.type) {
                        const newSortedRequest = funcs.updateSortedTitles(
                          request.sortedAttr,
                          request.OrderByAsc,
                          header.prop,
                          header.type
                        );

                        return setRequest({ ...request, ...newSortedRequest });
                      }
                    }}
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
                      to={`/dashboard/mysurveys/survey/${survey.id}/responses/${response.id}`}
                      className="text-decoration-none"
                    >
                      {funcs.toSentenceCase(response.type)}
                    </Link>
                  </td>
                  <CustomOverlayTrigger
                    unitKey={response.id}
                    title={response.date.split(" ")[1]}
                  >
                    <td className="text-center">
                      {response.date.split(" ")[0]}{" "}
                      {response.date.split(" ")[1]}
                    </td>
                  </CustomOverlayTrigger>
                  <td className="text-center">
                    <ReponseOption response={response} />
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

  return (
    <>
      {deleteResponseModal}
      <MainDisplay responses={items} />
    </>
  );
}

export default ResponseSummary;
