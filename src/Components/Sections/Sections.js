import React, { useEffect, useState } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import * as funcs from "../../shared/utility";
import IconButton from "../CustomButton/IconButton";
import Section from "./Section";

import CustomOverlayTrigger from "../CustomOverlayTrigger/CustomOverlayTrigger";

import CreateQuestionBuilder from "../../Containers/DashboardBuilder/UpdateQuestionBuilder/CreateQuestionBuilder";
import DeleteSectionBuilder from "../../Containers/DashboardBuilder/UpdateSectionBuilders/DeleteSectionBuilder";
import UpdateSectionBuilder from "../../Containers/DashboardBuilder/UpdateSectionBuilders/UpdateSectionBuilder";
import { useDispatch } from "react-redux";
import * as actionCreators from "../../store/actionCreators/Surveys/index";

function Sections(props) {
  const {
    surveyId,
    sections = [],
    defaulActiveSection,
    updateActiveSectionAfterUpdated,
  } = props;

  const dispatch = useDispatch();

  // const sections = survey.questionSections ? survey.questionSections : [];

  const [request, setRequest] = useState({
    defaultActiveSecton: defaulActiveSection,
    activeSection: defaulActiveSection,

    showESectionDescModal: false,
    showDeleteSectionModal: false,

    showAddQuestionModal: false,
    activeQuestion: sections.length > 0 && 0,
  });

  const updateRequest = (updateAttributes) => {
    setRequest({ ...request, ...updateAttributes });
  };

  useEffect(() => {
    if (request.defaultActiveSecton !== defaulActiveSection) {
      updateRequest({
        defaultActiveSecton: defaulActiveSection,
        activeSection: defaulActiveSection,
      });
    }
  });

  // modals

  const updateSectionModal = request.showESectionDescModal && (
    <UpdateSectionBuilder
      show={true}
      onHide={() => updateRequest({ showESectionDescModal: false })}
      surveyId={surveyId}
      section={sections[request.activeSection]}
    ></UpdateSectionBuilder>
  );

  const deleteSectionModal = request.showDeleteSectionModal && (
    <DeleteSectionBuilder
      show={true}
      onHide={() => updateRequest({ showDeleteSectionModal: false })}
      surveyId={surveyId}
      section={sections[request.activeSection]}
      updateSection={() => {
        if (sections.length > 1) {
          updateRequest({
            activeSection: 0,
            showDeleteSectionModal: false,
          });
        }
      }}
    ></DeleteSectionBuilder>
  );

  const addQuestionModal = request.showAddQuestionModal && (
    <CreateQuestionBuilder
      show={true}
      onHide={() => updateRequest({ showAddQuestionModal: false })}
      surveyId={surveyId}
      section={sections[request.activeSection]}
      updateQuestion={(newQuestion) => {
        updateRequest({
          activeQuestion: newQuestion.questionIndex,
          showAddQuestionModal: false,
        });
      }}
    ></CreateQuestionBuilder>
  );

  //

  const SectionOption = ({ sec }) => {
    const editSectionOption = {
      type: "Edit",
      title: "Edit description",
      onClick: () =>
        updateRequest({
          showESectionDescModal: true,
          activeSection: sec.sectionIndex,
        }),
    };
    const deleteSectionOption = {
      type: "Delete",
      title: "Delete section",
      onClick: () =>
        updateRequest({
          activeSection: sec.sectionIndex,
          showDeleteSectionModal: true,
        }),
    };

    const addQuestionOption = {
      type: "Add",
      title: "Add question",
      onClick: () =>
        updateRequest({
          activeSection: sec.sectionIndex,
          showAddQuestionModal: true,
        }),
    };
    let allowedOptions = [];

    allowedOptions = [
      { ...editSectionOption },
      { ...addQuestionOption },
      { ...deleteSectionOption },
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
          />
        ))}
      </>
    );
  };

  const SectionTitleBar = ({ sec }) => {
    return (
      <>
        <div
          className="text-primary text-decoration-none d-inline-block  h-100 px-2 text-center"
          onClick={() =>
            updateRequest({
              activeSection: sec.sectionIndex,
            })
          }
        >
          <strong>Section {sec.sectionIndex + 1} </strong>
        </div>

        <CustomOverlayTrigger unitKey={sec.id} title="Options">
          <Dropdown.Toggle
            split
            variant="link"
            className="text-decoration-none text-info"
            id="dropdown-split-basic"
          ></Dropdown.Toggle>
        </CustomOverlayTrigger>
        <Dropdown.Menu className="p-0 m-0">
          <Dropdown.Item as="span">
            <div className="m-0 p-0">
              <SectionOption sec={sec} />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </>
    );
  };

  const onDragStart = (start) => {
    // console.log(start);
    // const { type, source } = start;
    // if (type === "question") {
    // }
  };

  const onDragEnd = (result) => {
    // console.log(result);
    const { type, source, destination, draggableId } = result;

    if (!destination || !type) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "section") {
      const surveyId = destination.droppableId;
      const sectionId = draggableId;
      const oldIndex = source.index;
      const newIndex = destination.index;

      dispatch(
        actionCreators.updateSectionIndex(
          surveyId,
          sectionId,
          oldIndex,
          newIndex
        )
      );
      updateActiveSectionAfterUpdated(newIndex);
    } else if (type === "question") {
      const sectionId = destination.droppableId;
      const questionId = draggableId;
      const oldIndex = source.index;
      const newIndex = destination.index;

      dispatch(
        actionCreators.updateQuestionIndex(
          surveyId,
          sectionId,
          questionId,
          oldIndex,
          newIndex
        )
      );

      updateRequest({ activeQuestion: newIndex });
    }
  };

  const MainDisplay = ({ surveyId, sections }) => (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className="mx-5 my-3 bg-light  ">
        <nav className="bg-light">
          <Droppable
            droppableId={`${surveyId}`}
            direction="horizontal"
            type="section"
          >
            {(provided) => (
              <div
                className="nav nav-tabs"
                id="nav-tab"
                role="tablist"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {sections.map((section) => (
                  <Draggable
                    draggableId={`${section.id}`}
                    index={section.sectionIndex}
                    key={section.id}
                  >
                    {(provided, snapshot) => (
                      <Dropdown
                        as={ButtonGroup}
                        className={`nav-link m-0 p-0 ${
                          request.activeSection === section.sectionIndex &&
                          "active"
                        } ${snapshot.isDragging && "bg-white"}`}
                        size="sm"
                        key={section.sectionIndex}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                      >
                        <SectionTitleBar sec={section} />
                      </Dropdown>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </nav>

        <div className="tab-content mt-4 pb-1" id="nav-tabContent">
          {sections.map((section) => (
            <div
              className={`tab-pane fade ml-2 ${
                request.activeSection === section.sectionIndex && "show active"
              }`}
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              key={section.sectionIndex}
            >
              <Section
                surveyId={surveyId}
                section={section}
                activeQuestion={request.activeQuestion}
                addQuestionShow={() =>
                  updateRequest({
                    showAddQuestionModal: true,
                  })
                }
                updateQuestionAfterUpdated={(updatedQuestion) => {
                  updateRequest({
                    activeQuestion: updatedQuestion.questionIndex,
                  });
                }}
                updateQuestionAfterDeleted={() =>
                  updateRequest({
                    activeQuestion: 0,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );

  return (
    <>
      {updateSectionModal}
      {deleteSectionModal}
      {addQuestionModal}
      {/* {!funcs.isEmpty(sections) && <MainDisplay sections={sections} />} */}
      {surveyId && !funcs.isEmpty(sections) && (
        <MainDisplay surveyId={surveyId} sections={sections} />
      )}
    </>
  );
}

export default Sections;
