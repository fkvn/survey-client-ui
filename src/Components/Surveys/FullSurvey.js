import React, { useEffect, useState } from "react";
import {
  Form,
  Card,
  Button,
  Row,
  Col,
  Nav,
  NavDropdown,
} from "react-bootstrap";

import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../shared/fontawesome";
import * as exprInit from "../../export/exportInit";
// import * as funcs from "../../shared/utility";

// // survey
import UpdateSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/UpdateSurveyBuilder";

import DeleteSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/DeleteSurveyBuilder";

// // section
import CreateSectionBuilder from "../../Containers/DashboardBuilder/UpdateSectionBuilders/CreateSectionBuilder";

// Buttons
import IconButton from "../CustomButton/IconButton";
import PublishSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/PublishSurveyBuilder";
import Sections from "../Sections/Sections";
import CustomOverlayTrigger from "../CustomOverlayTrigger/CustomOverlayTrigger";

function FullSurvey(props) {
  const {
    survey = exprInit.dataInitialize.OPEN_SURVEY_LIST_INIT,
    handleValidationError = () => {},
  } = props;
  const history = useHistory();

  const [request, setRequest] = useState({
    [`${exprInit.abbrInit.SHOW_UPDATE_SURVEY_MODAL}`]: false,
    [`${exprInit.abbrInit.SHOW_DELETE_SURVEY_MODAL}`]: false,

    [`${exprInit.abbrInit.SHOW_ADD_SECTION_MODAL}`]: false,
    activeSection: 0,
  });

  // retrieve fetch date
  let survFetchDate = null;
  try {
    survFetchDate = exprInit.funcs.dateFormat(
      survey[`${exprInit.abbrInit.FETCHING_DATE}`]
    );
  } catch (error) {}

  useEffect(() => {
    if (!survFetchDate) {
      handleValidationError({
        [`${exprInit.abbrInit.MESSAGE}`]: "The survey is not load probably. Please reload or contact administrations!",
      });
    }
  }, [survFetchDate, handleValidationError]);

  // ============================ Survey Modals ==============================

  const updateSurveyModal = request[
    `${exprInit.abbrInit.SHOW_UPDATE_SURVEY_MODAL}`
  ] && (
    <UpdateSurveyBuilder
      show={true}
      onHide={() =>
        setRequest({
          ...request,
          [`${exprInit.abbrInit.SHOW_UPDATE_SURVEY_MODAL}`]: false,
        })
      }
      survey={survey}
      handleValidationError={handleValidationError}
    ></UpdateSurveyBuilder>
  );

  const deleteSurveyModal = request[
    `${exprInit.abbrInit.SHOW_DELETE_SURVEY_MODAL}`
  ] && (
    <DeleteSurveyBuilder
      show={true}
      onHide={() =>
        setRequest({
          ...request,
          [`${exprInit.abbrInit.SHOW_DELETE_SURVEY_MODAL}`]: false,
        })
      }
      survey={survey}
    ></DeleteSurveyBuilder>
  );

  // ============================ Survey Title Bar ===========================

  const SurveyOptions = ({ survey }) => {
    const editSurveyOption = {
      type: "Edit",
      title: "Edit name and description",
      onClick: () =>
        setRequest({
          ...request,
          [`${exprInit.abbrInit.SHOW_UPDATE_SURVEY_MODAL}`]: true,
        }),
    };
    const addSectionOption = {
      type: "Add",
      title: "Add section",
      onClick: () =>
        setRequest({
          ...request,
          [`${exprInit.abbrInit.SHOW_ADD_SECTION_MODAL}`]: true,
        }),
    };
    const publishOptions = {
      type: "Publish",
      title: "Publish survey",
    };

    const cloneSurveyOption = {
      type: "Clone",
      title: "Clone survey",
      onClick: () => alert("Clone survey"),
    };
    const deleteSurveyOption = {
      type: "Delete",
      title: "Delete survey",
      onClick: () =>
        setRequest({
          ...request,
          [`${exprInit.abbrInit.SHOW_DELETE_SURVEY_MODAL}`]: true,
        }),
    };

    let allowedOptions = [];

    allowedOptions = [
      { ...editSurveyOption },
      { ...addSectionOption },
      { ...publishOptions },
      { ...cloneSurveyOption },
      { ...deleteSurveyOption },
    ];

    return (
      <>
        {allowedOptions.map((op, i) =>
          op.type === "Publish" ? (
            <PublishSurveyBuilder key={i} survey={survey}>
              <Button variant="link" size="lg" className="px-1">
                <CustomOverlayTrigger title={op.title}>
                  <FontAwesomeIcon
                    icon={["fas", "cloud-upload-alt"]}
                    size="sm"
                    color="text-primary"
                  />
                </CustomOverlayTrigger>
              </Button>
            </PublishSurveyBuilder>
          ) : (
            !exprInit.funcs.isEmpty(op) && (
              <IconButton
                type={op.type}
                title={op.title}
                onClickHandler={op.onClick}
                key={i}
                index={i}
              />
            )
          )
        )}
      </>
    );
  };

  const surveyTitleNavBar = (
    <>
      <Form.Group controlId="titleNavBar">
        <Card.Header className="p-0">
          <Row>
            <Col xs={8} lg={4}>
              <Button
                variant="link"
                className="text-primary text-decoration-none"
                onClick={() => history.push(`/dashboard/mysurveys`)}
              >
                <strong>
                  My Surveys
                  <FontAwesomeIcon
                    icon={["fas", "chevron-right"]}
                    size="sm"
                    className="text-secondary mx-2"
                  />
                </strong>
              </Button>
              <Button
                variant="link"
                className="text-info px-0 text-decoration-none"
                onClick={() =>
                  history.push(
                    `/dashboard/mysurveys/survey?sId=${
                      survey[`${exprInit.abbrInit.SURVEY_ID}`]
                    }`
                  )
                }
              >
                <strong>{survey[`${exprInit.abbrInit.SURVEY_NAME}`]}</strong>
              </Button>
            </Col>
            <Col xs={4} lg={8}>
              <div className="float-right mr-2 d-none d-lg-inline-block">
                <SurveyOptions survey={survey} />
              </div>
              <div className="float-right mr-2 d-inline-block d-lg-none">
                <Nav variant="pills">
                  <NavDropdown title="" id="nav-dropdown">
                    <NavDropdown.Item>
                      <SurveyOptions survey={survey} />
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </div>
            </Col>
          </Row>
        </Card.Header>
      </Form.Group>
    </>
  );

  // ============================ Sections ===========================

  const addSectionModal = request[
    `${exprInit.abbrInit.SHOW_ADD_SECTION_MODAL}`
  ] && (
    <CreateSectionBuilder
      show={true}
      onHide={() =>
        setRequest({
          ...request,
          [`${exprInit.abbrInit.SHOW_ADD_SECTION_MODAL}`]: false,
        })
      }
      survey={survey}
      updateSection={(newSec) => {
        setRequest({
          ...request,
          activeSection: newSec.sectionIndex,
          [`${exprInit.abbrInit.SHOW_ADD_SECTION_MODAL}`]: false,
        });
      }}
    ></CreateSectionBuilder>
  );

  // ============================ Main Display ===========================

  const DisplayDescription = ({ description, mutedOption, label }) => {
    return (
      <Card.Text className="ml-4 mb-2">
        {label && description && <strong>Description: </strong>}
        <em>
          {description
            ? description
            : mutedOption && (
                <span className="text-muted">
                  There is no description for this survey
                </span>
              )}
        </em>
      </Card.Text>
    );
  };

  console.log("herer");

  const fullSurveyDisplay = (
    <>
      <Card className="bg-white border border-info">
        {surveyTitleNavBar}
        <Card.Body className="p-0">
          <DisplayDescription
            description={survey[`${exprInit.abbrInit.SURVEY_DESCRIPTION}`]}
            mutedOption={true}
          ></DisplayDescription>
          {survey[`${exprInit.abbrInit.SURVEY_SECTION_COUNT}`] > 0 && (
            <Sections
              surveyId={survey[`${exprInit.abbrInit.SURVEY_ID}`]}
              sections={survey[`${exprInit.abbrInit.SURVEY_SECTION_LIST}`]}
              defaulActiveSection={request.activeSection}
              updateActiveSectionAfterUpdated={(updatedSectionIndex) => {
                setRequest({ ...request, activeSection: updatedSectionIndex });
              }}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );

  return (
    <>
      {survFetchDate &&
      survey[`${exprInit.abbrInit.IS_FETCHED}`] &&
      survey[`${exprInit.abbrInit.SURVEY_IS_ARCHIVED}`] &&
      !survey[`${exprInit.abbrInit.SURVEY_DATE_PUBLISHED}`] ? (
        <>
          {/* survey option modals */}
          {updateSurveyModal}
          {deleteSurveyModal}

          {/* section option modals */}
          {addSectionModal}

          {/* main display */}
          {fullSurveyDisplay}
        </>
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </>
  );
}

export default FullSurvey;
