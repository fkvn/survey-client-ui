import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  ListGroup,
  Nav,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import NewResponseGroupBuilder from "../../../Containers/ResponseBuilder_v2/UpdateResponseGroupBuilder/NewResponseGroupBuilder";

import * as funcs from "../../../shared/utility";
import IconButton from "../../CustomButton/IconButton";
import CustomOverlayTrigger from "../../CustomOverlayTrigger/CustomOverlayTrigger";

function ResponseGroup(props) {
  console.log("Response Group");

  const {
    survey = {},
    responses = [],
    responseGroups = [
      {
        id: 338,
        name: "",
        groupType: "RESPONSE",
        groupBy: "surveyId;questionId;textAnswerType",
        groupedValue: "1;12;skipped",
        responses: [
          {
            id: 216,
            survey: 1,
            type: "ANONYMOUS",
            date: "2020-12-01 15:47:43",
            isDeleted: false,
            totalResposeGroups: 2,
          },
          {
            id: 240,
            survey: 1,
            type: "ANONYMOUS",
            date: "2020-12-01 15:49:09",
            isDeleted: false,
            totalResposeGroups: 2,
          },
          {
            id: 252,
            survey: 1,
            type: "ANONYMOUS",
            date: "2020-12-01 15:49:37",
            isDeleted: false,
            totalResposeGroups: 2,
          },
          {
            id: 276,
            survey: 1,
            type: "ANONYMOUS",
            date: "2020-12-01 15:50:43",
            isDeleted: false,
            totalResposeGroups: 2,
          },
          {
            id: 288,
            survey: 1,
            type: "ANONYMOUS",
            date: "2022-12-01 15:51:12",
            isDeleted: false,
            totalResposeGroups: 2,
          },
        ],
      },
      {
        id: 339,
        name: "",
        groupType: "YEAR",
        groupBy: "surveyId;year",
        groupedValue: "1;2012",
        responses: [
          {
            id: 192,
            survey: 1,
            type: "ANONYMOUS",
            date: "2012-12-01 15:46:18",
            isDeleted: false,
            totalResposeGroups: 1,
          },
          {
            id: 228,
            survey: 1,
            type: "ANONYMOUS",
            date: "2012-12-01 15:48:31",
            isDeleted: false,
            totalResposeGroups: 1,
          },
        ],
      },
      {
        id: 340,
        name: "",
        groupType: "YEAR",
        groupBy: "surveyId;year",
        groupedValue: "1;2015",
        responses: [
          {
            id: 204,
            survey: 1,
            type: "ANONYMOUS",
            date: "2015-12-01 15:47:13",
            isDeleted: false,
            totalResposeGroups: 1,
          },
        ],
      },
      {
        id: 341,
        name: "",
        groupType: "YEAR",
        groupBy: "surveyId;year",
        groupedValue: "1;2020",
        responses: [
          {
            id: 216,
            survey: 1,
            type: "ANONYMOUS",
            date: "2020-12-01 15:47:43",
            isDeleted: false,
            totalResposeGroups: 2,
          },
          {
            id: 240,
            survey: 1,
            type: "ANONYMOUS",
            date: "2020-12-01 15:49:09",
            isDeleted: false,
            totalResposeGroups: 2,
          },
          {
            id: 252,
            survey: 1,
            type: "ANONYMOUS",
            date: "2020-12-01 15:49:37",
            isDeleted: false,
            totalResposeGroups: 2,
          },
          {
            id: 276,
            survey: 1,
            type: "ANONYMOUS",
            date: "2020-12-01 15:50:43",
            isDeleted: false,
            totalResposeGroups: 2,
          },
          {
            id: 300,
            survey: 1,
            type: "ANONYMOUS",
            date: "2020-12-01 15:51:47",
            isDeleted: false,
            totalResposeGroups: 1,
          },
        ],
      },
      {
        id: 342,
        name: "",
        groupType: "YEAR",
        groupBy: "surveyId;year",
        groupedValue: "1;2022",
        responses: [
          {
            id: 264,
            survey: 1,
            type: "ANONYMOUS",
            date: "2022-12-01 15:50:12",
            isDeleted: false,
            totalResposeGroups: 1,
          },
          {
            id: 288,
            survey: 1,
            type: "ANONYMOUS",
            date: "2022-12-01 15:51:12",
            isDeleted: false,
            totalResposeGroups: 2,
          },
        ],
      },
    ],
  } = props;

  let refs = [];
  let nonGroupRef = React.createRef();
  let resGroupRef = React.createRef();

  for (let i = 0; i < responseGroups.length; i++) {
    refs = [...refs, React.createRef()];
  }

  const history = useHistory();

  const [request, setRequest] = useState({
    activeResponse: null,
    showDeleteResponseModal: false,

    showAddNewResGroupModal: false,

    nonGroupResponsesConfig: {
      sortedAttr: "type",
      sortedType: funcs.STR_TYPE,
      OrderByAsc: true,
    },
    GroupResponsesConfig: {
      sortedAttr: "type",
      sortedType: funcs.STR_TYPE,
      OrderByAsc: true,
    },
  });

  const NonGroupResponse = ({ survey = {}, responses = [] }) => {
    let items = responses.reduce(
      (newItems, res) => {
        return res.isDeleted === false && res.totalResposeGroups === 0
          ? [...newItems, res]
          : newItems;
      },

      []
    );

    const headers = [
      { title: "#" },
      { title: "Respondent", prop: "type", type: funcs.STR_TYPE },
      { title: "Date", prop: "date", type: funcs.DATE_TYPE },
      { title: "Options" },
    ];

    items = funcs.sortedItems(
      items,
      request.nonGroupResponsesConfig.sortedAttr,
      request.nonGroupResponsesConfig.sortedType,
      request.nonGroupResponsesConfig.OrderByAsc
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

    return (
      <>
        <Accordion defaultActiveKey="non-groupResponses" ref={nonGroupRef}>
          <Card>
            <Card.Body>
              <Accordion.Toggle as={Card.Title} eventKey="non-groupResponses">
                <strong>Non-group responses</strong>
                <div className="d-inline-block float-right">
                  <FontAwesomeIcon
                    icon={["fas", "compress-arrows-alt"]}
                    size="sm"
                    className="text-secondary"
                  />
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="non-groupResponses">
                <Table responsive hover className="my-3 table-borderless">
                  <thead>
                    <tr>
                      {headers.map((header, index) => (
                        <th
                          key={index}
                          className="text-center m-0 p-0 border-bottom"
                        >
                          <Button
                            variant="link"
                            className="border-0 shadow-none text-decoration-none"
                            onClick={() => {
                              if (header.prop && header.type) {
                                const newSortedRequest = funcs.updateSortedTitles(
                                  request.nonGroupResponsesConfig.sortedAttr,
                                  request.nonGroupResponsesConfig.OrderByAsc,
                                  header.prop,
                                  header.type
                                );

                                return setRequest({
                                  ...request,
                                  nonGroupResponsesConfig: {
                                    ...newSortedRequest,
                                  },
                                });
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
                    {items.length > 0 ? (
                      items.map((response, index) => (
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
                              {response.date.split(" ")[0]}
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
                          <strong>
                            There is no responses to be found !!!{" "}
                          </strong>{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Accordion.Collapse>
            </Card.Body>
          </Card>
        </Accordion>
      </>
    );
  };

  const ResponseGroups = ({
    survey = {},
    responses = [],
    responseGroups = [],
  }) => {
    let items = responses.reduce(
      (newItems, res) => {
        return res.isDeleted === false && res.totalResposeGroups > 0
          ? [...newItems, res]
          : newItems;
      },

      []
    );

    const headers = [
      { title: "#" },
      { title: "Respondent", prop: "type", type: funcs.STR_TYPE },
      { title: "Date", prop: "date", type: funcs.DATE_TYPE },
      { title: "Options" },
    ];

    items = funcs.sortedItems(
      items,
      request.GroupResponsesConfig.sortedAttr,
      request.GroupResponsesConfig.sortedType,
      request.GroupResponsesConfig.OrderByAsc
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

    const GroupResponsesTable = ({ headers = [], items = [] }) => {
      return (
        <>
          {" "}
          <Table responsive hover className="my-3 table-borderless">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="text-center m-0 p-0 border-bottom">
                    <Button
                      variant="link"
                      className="border-0 shadow-none text-decoration-none"
                      onClick={() => {
                        if (header.prop && header.type) {
                          const newSortedRequest = funcs.updateSortedTitles(
                            request.GroupResponsesConfig.sortedAttr,
                            request.GroupResponsesConfig.OrderByAsc,
                            header.prop,
                            header.type
                          );

                          return setRequest({
                            ...request,
                            GroupResponsesConfig: {
                              ...newSortedRequest,
                            },
                          });
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
              {items.length > 0 ? (
                items.map((response, index) => (
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
                        {response.date.split(" ")[0]}
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

    const getResGroupName = (resGroup) => {
      let groupName = resGroup.name ? resGroup.name : `Group [N/A]`;
      let groupedValue = "";

      switch (resGroup.groupBy) {
        case "surveyId":
          groupedValue = survey.name;
          break;
        case "surveyId;questionId":
          groupedValue = "Question";
          break;
        case "surveyId;questionId;mulChoiceSelectionIndex":
        case "surveyId;questionId;rating":
        case "surveyId;questionId;textAnswerType":
        case "surveyId;questionId;rank;rankChoiceIndex":
          groupedValue = groupName;
          break;
        case "surveyId;year":
          groupedValue = resGroup.groupedValue.split(";")[1];
          break;
        case "Name":
          groupedValue = resGroup.groupedValue;
          break;
        default:
          break;
      }

      return [groupName, groupedValue];
    };

    const getResGroupDescription = (resGroup) => {
      const unknownValue = "[N/A]";

      const groupInfo = {
        groupBy: unknownValue,
        name: unknownValue,
        value: unknownValue,
      };

      const getText = (value) => (
        <span className={value === unknownValue ? "text-danger" : "text-dark"}>
          {value}
        </span>
      );

      switch (resGroup.groupBy) {
        case "surveyId":
          groupInfo.groupBy = "SURVEY";
          groupInfo.value = survey.name;
          break;
        case "surveyId;questionId":
        case "surveyId;questionDesc":
          // groupedValue = "Question";
          break;
        case "surveyId;questionId;mulChoiceSelectionIndex":
        case "surveyId;questionId;rating":
        case "surveyId;questionId;textAnswerType":
        case "surveyId;questionId;rank;rankChoiceIndex":
          {
            groupInfo.groupBy = "RESPONSE";
            const groupValues = resGroup.groupedValue.split(";");
            const questionId = Number(groupValues[1]);
            const valueInfo = {
              sec: "",
              question: "",
              answer: "",
            };

            survey.questionSections.forEach((section) => {
              section.questions.forEach((question) => {
                if (question.id === questionId) {
                  valueInfo.sec = (
                    <Card.Text>
                      Section: <strong>{section.sectionIndex + 1}</strong> &gt;
                      Question: <strong> {question.questionIndex + 1}</strong>
                    </Card.Text>
                  );
                  valueInfo.question = (
                    <>
                      <div
                        className="pt-1 p-3 mb-2 bg-light"
                        dangerouslySetInnerHTML={{
                          __html: funcs.updateQDescImgs(
                            question.description,
                            question.attachments
                          ),
                        }}
                      />
                    </>
                  );
                  switch (resGroup.groupBy.split(";")[2]) {
                    case "mulChoiceSelectionIndex":
                      valueInfo.answer = (
                        <Card.Text>
                          Selection: {question.choices[groupValues[2]]}
                        </Card.Text>
                      );
                      break;
                    case "rating":
                      valueInfo.answer = (
                        <Card.Text>Rating: {groupValues[2]}</Card.Text>
                      );
                      break;
                    case "textAnswerType":
                      valueInfo.answer = (
                        <Card.Text>
                          Response:{" "}
                          {groupValues[2] === "answered" ? (
                            <span className="text-success">Answered</span>
                          ) : (
                            <span className="text-danger">Skipped</span>
                          )}
                        </Card.Text>
                      );
                      break;
                    case "rank":
                      {
                        const rank = groupValues[2];
                        const rankChoiceIndex = groupValues[3];

                        valueInfo.answer = (
                          <Card.Text>
                            Choice: {question.rankingChoices[rankChoiceIndex]}
                            <br />
                            Rank: {rank}
                          </Card.Text>
                        );
                      }
                      break;
                    default:
                      break;
                  }
                }
              });
            });

            groupInfo.value = (
              <>
                {valueInfo.sec}
                {valueInfo.question}
                {valueInfo.answer}
              </>
            );
          }
          break;
        case "surveyId;year":
          groupInfo.groupBy = "YEAR";
          groupInfo.value = (
            <Card.Text>
              Year: {getText(resGroup.groupedValue.split(";")[1])}
            </Card.Text>
          );
          break;
        case "Name":
          break;
        default:
          break;
      }

      return (
        <div className="my-2">
          <Card.Text className="font-weight-bold">
            Group By: {getText(groupInfo.groupBy)}
          </Card.Text>
          <Card.Text>Name: {getText(groupInfo.name)}</Card.Text>
          {groupInfo.value}
          <Card.Text>Total responses: {resGroup.responses.length}</Card.Text>
        </div>
      );
    };

    const Group = ({ resGroup, index }) => {
      return (
        <>
          <Accordion
            defaultActiveKey={`${resGroup.groupType}${index}`}
            ref={refs[index]}
          >
            <Card className="mt-1 mb-4">
              <Card.Header className="m-0 p-2">
                <div
                  className="text-info d-inline-block"
                  onClick={() => {
                    refs.map((ref, i) => {
                      if (ref.current) {
                        if (i === index) {
                          ref.current.setAttribute(
                            "style",
                            `  border-color: #28a745;
                                          box-shadow: 0 0 0 0.3rem rgba(40, 167, 69, 0.25);
                                      `
                          );

                          ref.current.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "center",
                          });
                        } else {
                          ref.current.setAttribute("style", "");
                        }
                      }
                      return null;
                    });
                  }}
                >
                  <strong>{getResGroupName(resGroup)[0]}</strong>
                </div>

                <div className="d-inline-block float-right mb-0 pb-0">
                  <span>
                    <IconButton
                      btnClassName="p-0 m-0 mb-2"
                      onClickHandler={() => {
                        if (refs[index].current) {
                          const content =
                            refs[index].current.firstChild.childNodes[1];

                          content.classList.toggle("show");
                        }
                      }}
                      type="Toggle Expand"
                      title="Toggle expand question"
                    />
                  </span>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey={`${resGroup.groupType}${index}`}>
                <Card.Body className="m-0 p-0">
                  <Row className="m-0 p-0">
                    <Col xs={12} lg={4} className="border-right border-light">
                      {getResGroupDescription(resGroup)}
                      {/* <div
                      className="m-2"
                      dangerouslySetInnerHTML={{
                        __html: funcs.updateQDescImgs(
                          question.description,
                          question.attachments
                        ),
                      }}
                    /> */}
                    </Col>
                    <Col xs={12} lg={8} className="m-lg-0 p-lg-0 bg-light">
                      <GroupResponsesTable
                        headers={headers}
                        items={resGroup.responses}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </>
      );
    };

    const Groups = ({ responseGroups = [] }) => {
      const resGroupByTypes = responseGroups.reduce(
        (results, resGroup, index) => {
          return {
            ...results,
            [resGroup.groupType]: results[`${resGroup.groupType}`]
              ? [
                  ...results[`${resGroup.groupType}`],
                  { ...resGroup, refIndex: index },
                ]
              : [{ ...resGroup, refIndex: index }],
          };
        },
        {}
      );

      return (
        <>
          <Row>
            <Col xs={12} lg={2}>
              <Accordion defaultActiveKey="groups">
                <Card className="border-0">
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey="groups"
                    className="p-2 m-2 border-0 "
                  >
                    <strong> Groups </strong>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="groups">
                    <Card.Body className="m-0 p-0">
                      {Object.keys(resGroupByTypes).map((type, index) => (
                        <Accordion key={index} className="px-3">
                          <Accordion.Toggle
                            as={Card.Text}
                            eventKey={`${type}`}
                            className="font-weight-bold text-info"
                          >
                            {type}
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey={`${type}`}>
                            <Nav className="flex-column">
                              {resGroupByTypes[type].map((resGroup) => (
                                <Nav.Link
                                  key={resGroup.refIndex}
                                  onClick={() => {
                                    refs.map((ref, i) => {
                                      if (ref.current) {
                                        if (i === resGroup.refIndex) {
                                          ref.current.setAttribute(
                                            "style",
                                            `  border-color: #28a745;
                                          box-shadow: 0 0 0 0.3rem rgba(40, 167, 69, 0.25);
                                      `
                                          );

                                          ref.current.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                            inline: "center",
                                          });
                                        } else {
                                          ref.current.setAttribute("style", "");
                                        }
                                      }
                                      return null;
                                    });
                                  }}
                                >
                                  {getResGroupName(resGroup)[1]}
                                </Nav.Link>
                              ))}
                            </Nav>
                          </Accordion.Collapse>
                        </Accordion>
                      ))}

                      <Button
                        variant="info"
                        className="ml-3 mt-3  "
                        size="sm"
                        onClick={() => {
                          refs.map((ref, i) => {
                            if (ref.current) {
                              const content =
                                ref.current.firstChild.childNodes[1];

                              content.classList.toggle("show", true);
                            }
                            return null;
                          });
                        }}
                      >
                        Show all
                      </Button>
                      <Button
                        variant="secondary"
                        className="ml-3 mt-3  "
                        size="sm"
                        onClick={() => {
                          refs.map((ref, i) => {
                            if (ref.current) {
                              const content =
                                ref.current.firstChild.childNodes[1];

                              content.classList.toggle("show", false);
                            }
                            return null;
                          });
                        }}
                      >
                        Close all
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
            <Col xs={12} lg={10}>
              {responseGroups.map((resGroup, index) => (
                <Group key={index} resGroup={resGroup} index={index} />
              ))}
            </Col>
          </Row>
        </>
      );
    };

    return (
      <>
        <Accordion
          defaultActiveKey="group-responses"
          className="my-4"
          ref={resGroupRef}
        >
          <Card>
            <Card.Body>
              <Accordion.Toggle as={Card.Title} eventKey="group-responses">
                <strong className="text-info">Response Groups</strong>
                <div className="d-inline-block float-right">
                  <FontAwesomeIcon
                    icon={["fas", "compress-arrows-alt"]}
                    size="sm"
                    className="text-secondary"
                  />
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="group-responses">
                <>
                  {/* <Button className="my-3" size="sm" variant="success">
                    New Group
                  </Button> */}

                  <br />
                  {responseGroups.length >= 0 && (
                    <Groups responseGroups={responseGroups} />
                  )}
                  {/* <GroupResponsesTable headers={headers} items={items} /> */}
                </>
              </Accordion.Collapse>
            </Card.Body>
          </Card>
        </Accordion>
      </>
    );
  };

  const topBar = (
    <div className="sticky-top">
      <Button
        variant="success"
        className="ml-2 mb-3"
        onClick={() =>
          setRequest({ ...request, showAddNewResGroupModal: true })
        }
      >
        New Group
      </Button>
      <ListGroup variant="flush">
        <ListGroup.Item
          action
          as={Button}
          onClick={() => {
            nonGroupRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });
            nonGroupRef.current.setAttribute(
              "style",
              `border-color: #28a745;
             box-shadow: 0 0 0 0.3rem rgba(40, 167, 69, 0.25);
            `
            );
            resGroupRef.current.setAttribute("style", "");
          }}
          className="text-info"
        >
          Non-group Responses
        </ListGroup.Item>
        <ListGroup.Item
          action
          as={Button}
          onClick={() => {
            resGroupRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "center",
            });
            resGroupRef.current.setAttribute(
              "style",
              `border-color: #28a745;
             box-shadow: 0 0 0 0.3rem rgba(40, 167, 69, 0.25);
            `
            );
            nonGroupRef.current.setAttribute("style", "");
          }}
          className="text-info"
        >
          Response Groups
        </ListGroup.Item>
        <ListGroup.Item
          as={Link}
          action
          to={`/dashboard/mysurveys/survey/${survey.id}/responses`}
          className="text-primary"
        >
          All Responses
        </ListGroup.Item>
      </ListGroup>
    </div>
  );

  const addNewResGroupModal = request.showAddNewResGroupModal && (
    <NewResponseGroupBuilder
      survey={survey}
      show={true}
      onHide={() => setRequest({ ...request, showAddNewResGroupModal: false })}
    />
  );

  const MainDisplay = ({ survey, responses, responseGroups }) => {
    return (
      <>
        {addNewResGroupModal}
        <Row className="mt-5">
          <Col xs={12} lg={2}>
            {topBar}
          </Col>
          <Col xs={12} lg={10}>
            <NonGroupResponse survey={survey} responses={responses} />
            <ResponseGroups
              survey={survey}
              responses={responses}
              responseGroups={responseGroups}
            />
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      {!funcs.isEmpty(survey) && (
        <MainDisplay
          survey={survey}
          responses={responses}
          responseGroups={responseGroups}
        />
      )}
    </>
  );
}

export default ResponseGroup;
