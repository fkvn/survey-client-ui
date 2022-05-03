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

// survey
import UpdateSurveyBuilder from "../../Containers/DashboardBuilder/SurveyBuilders/UpdateSurveyBuilder";

import DeleteSurveyBuilder from "../../Containers/DashboardBuilder/SurveyBuilders/DeleteSurveyBuilder";

import PublishSurveyBuilder from "../../Containers/DashboardBuilder/SurveyBuilders/PublishSurveyBuilder";

// section
import SectionBuilder from "../../Containers/DashboardBuilder/SectionBuilders/SectionBuilder";

import CreateSectionBuilder from "../../Containers/DashboardBuilder/SectionBuilders/CreateSectionBuilder";

// Others
import IconButton from "../CustomButton/IconButton";
import DescriptionDisplay from "../DescriptionDisplay/DescriptionDisplay";
import CustomBreadcrumb from "../CustomBreadcrumb/CustomBreadcrumb";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../shared/fontawesome";

import * as exprt from "../../shared/export";

function FullSurvey(props) {
  // ================================= init =========================

  const { survey = exprt.db.initDb.FULL_SURVEY_INIT, readOnly = true } = props;

  const history = useHistory();

  const [request, setRequest] = useState({
    showESurNameDescModal: false,
    showDeleteSurveyModal: false,

    showAddSectionModal: false,
    activeSectionIndex: 0,
  });

  let isRender = false;
  let isRenderSections = false;

  const breadcumbItems = [
    {
      title: "My Surveys",
      color: "text-primary",
      onClick: () => history.push(`/dashboard/mysurveys`),
    },

    {
      title: survey[`${exprt.props.SURVEY_NAME}`],
      color: "text-info",
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/survey?sId=${
            survey[`${exprt.props.SURVEY_ID}`]
          }`
        ),
    },
  ];

  // ============================ logic flow ==========================

  if (
    survey[`${exprt.props.IS_FETCHED}`] &&
    Number(survey[`${exprt.props.SURVEY_ID > 0}`])
  ) {
    isRender = true;
  }

  // render sections if #sections > 0
  if (survey[`${exprt.props.SECTION_LIST}`].length > 0) {
    isRenderSections = true;
  }

  // testing block
  isRender = true;

  // ============================ sub-components =======================

  // modals block
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

  const addSectionModal = request.showAddSectionModal && (
    <CreateSectionBuilder
      show={true}
      onHide={() => setRequest({ ...request, showAddSectionModal: false })}
      surveyId={survey[`${exprt.props.SURVEY_ID}`]}
    ></CreateSectionBuilder>
  );

  // displays block
  const SurveyOptions = ({
    readOnly = true,
    survey = exprt.db.initDb.FULL_SURVEY_INIT,
  }) => {
    const updateSurveyOption = {
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

    const deleteSurveyOption = {
      type: "Delete",
      title: "Delete survey",
      onClick: () => setRequest({ ...request, showDeleteSurveyModal: true }),
    };

    //

    const editSurveyOption = {
      type: "Edit",
      title: "Edit survey",
      onClick: () =>
        history.push(
          `/dashboard/mysurveys/editSurvey?sId=${
            survey[`${exprt.props.SURVEY_ID}`]
          }`
        ),
    };

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

    //

    let allowedOptions = [];

    if (!readOnly) {
      allowedOptions = [
        { ...updateSurveyOption },
        { ...addSectionOption },
        { ...publishOptions },
        { ...deleteSurveyOption },
      ];
    } else {
      allowedOptions = [{ ...editSurveyOption }, { ...summaryResultOption }];
    }

    return (
      <>
        {allowedOptions.map((op, i) =>
          op.type === "Publish" ? (
            <PublishSurveyBuilder key={i} survey={survey}>
              <Button variant="link" size="lg" className="px-1 ">
                <FontAwesomeIcon
                  icon={["fas", "cloud-upload-alt"]}
                  size="sm"
                  color="text-primary"
                />
              </Button>
            </PublishSurveyBuilder>
          ) : (
            <IconButton
              type={op.type}
              title={op.title}
              onClickHandler={op.onClick}
              key={i}
              index={i}
            />
          )
        )}
      </>
    );
  };

  // const titleNavBar = (
  //   <Form.Group controlId="titleNavBar">
  //     <Card.Header className="p-0">
  //       <Row>
  //         <Col xs={8} lg={4}>
  //           <CustomBreadcrumb items={breadcumbItems} iconClassname="ml-1" />
  //         </Col>

  //         <Col xs={4} lg={8}>
  //           <div className="float-right mr-2 d-none d-lg-inline-block">
  //             <SurveyOptions survey={survey} readOnly={readOnly} />
  //           </div>
  //           <div className="float-right mr-2 d-inline-block d-lg-none">
  //             <Nav variant="pills">
  //               <NavDropdown title="" id="nav-dropdown">
  //                 <NavDropdown.Item>
  //                   <SurveyOptions survey={survey} readOnly={readOnly} />
  //                 </NavDropdown.Item>
  //               </NavDropdown>
  //             </Nav>
  //           </div>
  //         </Col>
  //       </Row>
  //     </Card.Header>
  //   </Form.Group>
  // );

  const titleNavBar = (
    <CustomBreadcrumb items={breadcumbItems} iconClassname="ml-1">
      <div className="float-right mr-2 d-none d-lg-inline-block">
        <SurveyOptions survey={survey} readOnly={readOnly} />
      </div>
      <div className="float-right mr-2 d-inline-block d-lg-none">
        <Nav variant="pills">
          <NavDropdown title="" id="nav-dropdown">
            <NavDropdown.Item>
              <SurveyOptions survey={survey} readOnly={readOnly} />
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </div>
    </CustomBreadcrumb>
  );

  const fullSurveyRender = (
    <Card className="bg-white border-0">
      {titleNavBar}
      <Card.Body className="p-4 bg-light">
        <DescriptionDisplay
          description={survey[`${exprt.props.SURVEY_DESCRIPTION}`]}
          mutedOption={true}
          // className="p"
        ></DescriptionDisplay>

        {!readOnly && (
          <Form.Group>
            <Button
              variant="success"
              onClick={() =>
                setRequest({ ...request, showAddSectionModal: true })
              }
              className="mt-5"
            >
              Add Section
            </Button>
          </Form.Group>
        )}

        {isRenderSections && (
          <SectionBuilder
            surveyId={survey[`${exprt.props.SURVEY_ID}`]}
            sections={survey[`${exprt.props.SECTION_LIST}`]}
            readOnly={readOnly}
          />
        )}
      </Card.Body>
    </Card>
  );

  const returnRender = (
    <div style={{ minWidth: "250px" }}>
      {isRender ? (
        <>
          {!readOnly && (
            <>
              {/* survey modals */}
              {updateSurveyModal}
              {deleteSurveyModal}

              {/* section modals */}
              {addSectionModal}
            </>
          )}

          {/* main display */}
          {fullSurveyRender}
        </>
      ) : (
        <ReactLoading type={"bars"} color={"black"} />
      )}
    </div>
  );

  return returnRender;
}

export default FullSurvey;
