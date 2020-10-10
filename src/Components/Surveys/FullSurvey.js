import React, { useState } from "react";
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
import * as funcs from "../../shared/utility";

// // survey
import UpdateSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/UpdateSurveyBuilder";

import DeleteSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/DeleteSurveyBuilder";

// // section
import CreateSectionBuilder from "../../Containers/DashboardBuilder/UpdateSectionBuilders/CreateSectionBuilder";

// Buttons
import IconButton from "../CustomButton/IconButton";
import PublishSurveyBuilder from "../../Containers/DashboardBuilder/UpdateSurveyBuilders/PublishSurveyBuilder";
import Sections from "../Sections/Sections";

function FullSurvey(props) {
  const { survey = {} } = props;
  const history = useHistory();

  const [request, setRequest] = useState({
    showESurNameDescModal: false,
    showDeleteSurveyModal: false,

    showAddSectionModal: false,
    activeSection: 0,
  });

  // ============================ Survey Modals ==============================

  const updateSurveyModal = request.showESurNameDescModal && (
    <UpdateSurveyBuilder
      show={true}
      onHide={() => setRequest({ ...request, showESurNameDescModal: false })}
      survey={survey}
    ></UpdateSurveyBuilder>
  );

  const deleteSurveyModal = request.showDeleteSurveyModal && (
    <DeleteSurveyBuilder
      show={true}
      onHide={() => setRequest({ ...request, showDeleteSurveyModal: false })}
      survey={survey}
    ></DeleteSurveyBuilder>
  );

  // ============================ Survey Title Bar ===========================

  const SurveyOptions = ({ survey }) => {
    const editSurveyOption = {
      type: "Edit",
      title: "Edit name and description",
      onClick: () => setRequest({ ...request, showESurNameDescModal: true }),
    };
    const addSectionOption = {
      type: "Add",
      title: "Add section",
      onClick: () => setRequest({ ...request, showAddSectionModal: true }),
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
      onClick: () => setRequest({ ...request, showDeleteSurveyModal: true }),
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
                <FontAwesomeIcon
                  icon={["fas", "cloud-upload-alt"]}
                  size="sm"
                  color="text-primary"
                />
              </Button>
            </PublishSurveyBuilder>
          ) : (
            !funcs.isEmpty(op) && (
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
                  history.push(`/dashboard/mysurveys?sId=${survey.id}`)
                }
              >
                <strong>{survey.name}</strong>
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

  const addSectionModal = request.showAddSectionModal && (
    <CreateSectionBuilder
      show={true}
      onHide={() => setRequest({ ...request, showAddSectionModal: false })}
      surveyId={survey.id}
      updateSection={(newSec) => {
        setRequest({
          ...request,
          activeSection: newSec.sectionIndex,
          showAddSectionModal: false,
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

  const fullSurveyDisplay = (
    <>
      <Card className="bg-white border border-info">
        {surveyTitleNavBar}
        <Card.Body className="p-0">
          <DisplayDescription
            description={survey.description}
            mutedOption={true}
          ></DisplayDescription>

          {survey.questionSections && survey.questionSections.length > 0 && (
            <Sections
              surveyId={survey.id}
              sections={survey.questionSections}
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
      {!funcs.isEmpty(survey) && survey.closed && !survey.publishDate ? (
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
