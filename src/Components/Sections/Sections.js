import React, { useEffect, useState } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import * as funcs from "../../shared/utility";
import IconButton from "../CustomButton/IconButton";
import Section from "./Section";

import CustomOverlayTrigger from "../CustomOverlayTrigger/CustomOverlayTrigger";

import CreateQuestionBuilder from "../../Containers/DashboardBuilder/QuestionBuilders/CreateQuestionBuilder";
import DeleteSectionBuilder from "../../Containers/DashboardBuilder/SectionBuilders/DeleteSectionBuilder";
import UpdateSectionBuilder from "../../Containers/DashboardBuilder/SectionBuilders/UpdateSectionBuilder";
import { useDispatch } from "react-redux";
import * as actionCreators from "../../store/actionCreators/Surveys/index";
import * as exprt from "../../shared/export";

function Sections(props) {
  // ================================= init =========================

  const {
    surveyId = -1,
    sections = [],
    readOnly = true,
    activeSection = exprt.db.initDb.SECTION_INIT,
    setActiveSection = () => {},
  } = props;

  const dispatch = useDispatch();

  const [request, setRequest] = useState({
    shopUpdateSectionModal: false,
    showDeleteSectionModal: false,

    showAddQuestionModal: false,

    reqUpdateSectionIndex: activeSection[`${exprt.props.SECTION_INDEX}`],
  });

  let isRender = false;

  // ================================= logic flow =========================

  if (
    surveyId > -1 &&
    sections.length > 0 &&
    activeSection[`${exprt.props.SECTION_ID}`] > -1 &&
    activeSection[`${exprt.props.SECTION_INDEX}`] > -1
  ) {
    isRender = true;
  }

  // const dispatch = useDispatch();
  // // const sections = survey.questionSections ? survey.questionSections : [];
  // const [request, setRequest] = useState({
  //   defaultActiveSecton: defaulActiveSection,
  //   activeSection: defaulActiveSection,
  //   showESectionDescModal: false,
  //   showDeleteSectionModal: false,
  //   showAddQuestionModal: false,
  //   activeQuestion: sections.length > 0 && 0,
  // });
  // const updateRequest = (updateAttributes) => {
  //   setRequest({ ...request, ...updateAttributes });
  // };
  // useEffect(() => {
  //   if (request.defaultActiveSecton !== defaulActiveSection) {
  //     updateRequest({
  //       defaultActiveSecton: defaulActiveSection,
  //       activeSection: defaulActiveSection,
  //     });
  //   }
  // });
  // // modals
  // const updateSectionModal = request.showESectionDescModal && (
  //   <UpdateSectionBuilder
  //     show={true}
  //     onHide={() => updateRequest({ showESectionDescModal: false })}
  //     surveyId={surveyId}
  //     section={sections[request.activeSection]}
  //   ></UpdateSectionBuilder>
  // );
  // const deleteSectionModal = request.showDeleteSectionModal && (
  //   <DeleteSectionBuilder
  //     show={true}
  //     onHide={() => updateRequest({ showDeleteSectionModal: false })}
  //     surveyId={surveyId}
  //     section={sections[request.activeSection]}
  //     updateSection={() => {
  //       if (sections.length > 1) {
  //         updateRequest({
  //           activeSection: 0,
  //           showDeleteSectionModal: false,
  //         });
  //       }
  //     }}
  //   ></DeleteSectionBuilder>
  // );
  // const addQuestionModal = request.showAddQuestionModal && (
  //   <CreateQuestionBuilder
  //     show={true}
  //     onHide={() => updateRequest({ showAddQuestionModal: false })}
  //     surveyId={surveyId}
  //     section={sections[request.activeSection]}
  //     updateQuestion={(newQuestion) => {
  //       updateRequest({
  //         activeQuestion: newQuestion.questionIndex,
  //         showAddQuestionModal: false,
  //       });
  //     }}
  //   ></CreateQuestionBuilder>
  // );
  // //
  // const SectionOption = ({ sec }) => {
  //   const editSectionOption = {
  //     type: "Edit",
  //     title: "Edit description",
  //     onClick: () =>
  //       updateRequest({
  //         showESectionDescModal: true,
  //         activeSection: sec.sectionIndex,
  //       }),
  //   };
  //   const deleteSectionOption = {
  //     type: "Delete",
  //     title: "Delete section",
  //     onClick: () =>
  //       updateRequest({
  //         activeSection: sec.sectionIndex,
  //         showDeleteSectionModal: true,
  //       }),
  //   };
  //   const addQuestionOption = {
  //     type: "Add",
  //     title: "Add question",
  //     onClick: () =>
  //       updateRequest({
  //         activeSection: sec.sectionIndex,
  //         showAddQuestionModal: true,
  //       }),
  //   };
  //   let allowedOptions = [];
  //   allowedOptions = [
  //     { ...editSectionOption },
  //     { ...addQuestionOption },
  //     { ...deleteSectionOption },
  //   ];
  //   return (
  //     <>
  //       {allowedOptions.map((op, i) => (
  //         <IconButton
  //           type={op.type}
  //           title={op.title}
  //           onClickHandler={op.onClick}
  //           key={i}
  //           index={i}
  //         />
  //       ))}
  //     </>
  //   );
  // };
  // const SectionTitleBar = ({ sec }) => {
  //   return (
  //     <>
  //       <div
  //         className="text-primary text-decoration-none d-inline-block  h-100 px-2 text-center"
  //         onClick={() =>
  //           updateRequest({
  //             activeSection: sec.sectionIndex,
  //           })
  //         }
  //       >
  //         <strong>Section {sec.sectionIndex + 1} </strong>
  //       </div>
  //       <CustomOverlayTrigger unitKey={sec.id} title="Options">
  //         <Dropdown.Toggle
  //           split
  //           variant="link"
  //           className="text-decoration-none text-info"
  //           id="dropdown-split-basic"
  //         ></Dropdown.Toggle>
  //       </CustomOverlayTrigger>
  //       <Dropdown.Menu className="p-0 m-0">
  //         <Dropdown.Item as="span">
  //           <div className="m-0 p-0">
  //             <SectionOption sec={sec} />
  //           </div>
  //         </Dropdown.Item>
  //       </Dropdown.Menu>
  //     </>
  //   );
  // };
  // const onDragStart = (start) => {
  //   // console.log(start);
  //   // const { type, source } = start;
  //   // if (type === "question") {
  //   // }
  // };
  // const onDragEnd = (result) => {
  //   console.log("section side");
  //   const { type, source, destination, draggableId } = result;
  //   if (!destination || !type) {
  //     return;
  //   }
  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }
  //   if (type === "section") {
  //     const surveyId = destination.droppableId;
  //     const sectionId = draggableId;
  //     const oldIndex = source.index;
  //     const newIndex = destination.index;
  //     dispatch(
  //       actionCreators.updateSectionIndex(
  //         surveyId,
  //         sectionId,
  //         oldIndex,
  //         newIndex
  //       )
  //     );
  //     updateActiveSectionAfterUpdated(newIndex);
  //   }
  //   // else if (type === "question") {
  //   //   const sectionId = destination.droppableId;
  //   //   const questionId = draggableId;
  //   //   const oldIndex = source.index;
  //   //   const newIndex = destination.index;
  //   //   dispatch(
  //   //     actionCreators.updateQuestionIndex(
  //   //       surveyId,
  //   //       sectionId,
  //   //       questionId,
  //   //       oldIndex,
  //   //       newIndex
  //   //     )
  //   //   );
  //   //   updateRequest({ activeQuestion: newIndex });
  //   // }
  // };
  // const MainDisplay = ({ surveyId, sections }) => (
  //   <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
  //     <div className="mx-5 my-3 bg-white border  ">
  //       <nav className="bg-light">
  //         <Droppable
  //           droppableId={`${surveyId}`}
  //           direction="horizontal"
  //           type="section"
  //         >
  //           {(provided) => (
  //             <div
  //               className="nav nav-tabs"
  //               id="nav-tab"
  //               role="tablist"
  //               {...provided.droppableProps}
  //               ref={provided.innerRef}
  //             >
  //               {sections.map((section) => (
  //                 <Draggable
  //                   draggableId={`${section.id}`}
  //                   index={section.sectionIndex}
  //                   key={section.id}
  //                 >
  //                   {(provided, snapshot) => (
  //                     <Dropdown
  //                       as={ButtonGroup}
  //                       className={`nav-link m-0 p-0 ${
  //                         request.activeSection === section.sectionIndex &&
  //                         "active"
  //                       } ${snapshot.isDragging && "bg-white"}`}
  //                       size="sm"
  //                       key={section.sectionIndex}
  //                       {...provided.draggableProps}
  //                       ref={provided.innerRef}
  //                       {...provided.dragHandleProps}
  //                     >
  //                       <SectionTitleBar sec={section} />
  //                     </Dropdown>
  //                   )}
  //                 </Draggable>
  //               ))}
  //               {provided.placeholder}
  //             </div>
  //           )}
  //         </Droppable>
  //       </nav>
  //       <div className="tab-content mt-4 pb-1" id="nav-tabContent">
  //         {sections.map((section) => (
  //           <div
  //             className={`tab-pane fade ml-2 ${
  //               request.activeSection === section.sectionIndex && "show active"
  //             }`}
  //             id="nav-home"
  //             role="tabpanel"
  //             aria-labelledby="nav-home-tab"
  //             key={section.sectionIndex}
  //           >
  //             <Section
  //               surveyId={surveyId}
  //               section={section}
  //               activeQuestion={request.activeQuestion}
  //               addQuestionShow={() =>
  //                 updateRequest({
  //                   showAddQuestionModal: true,
  //                 })
  //               }
  //               updateQuestionAfterUpdated={(updatedQuestion) => {
  //                 updateRequest({
  //                   activeQuestion: updatedQuestion.questionIndex,
  //                 });
  //               }}
  //               updateQuestionAfterDeleted={() =>
  //                 updateRequest({
  //                   activeQuestion: 0,
  //                 })
  //               }
  //             />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </DragDropContext>
  // );
  // return (
  //   <>
  //     {updateSectionModal}
  //     {deleteSectionModal}
  //     {addQuestionModal}
  //     {/* {!funcs.isEmpty(sections) && <MainDisplay sections={sections} />} */}
  //     {surveyId && !funcs.isEmpty(sections) && (
  //       <MainDisplay surveyId={surveyId} sections={sections} />
  //     )}
  //   </>
  // );

  // ================================= functions =========================
  const onDragStart = () => {};

  const onDragEnd = (result) => {
    // console.log("section side");
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
    }
  };

  // ================================= sub-components =========================

  // modals block

  const updateSectionModal = request.shopUpdateSectionModal && (
    <UpdateSectionBuilder
      show={true}
      onHide={() => setRequest({ ...request, shopUpdateSectionModal: false })}
      surveyId={surveyId}
      section={sections[request.reqUpdateSectionIndex]}
    ></UpdateSectionBuilder>
  );

  const deleteSectionModal = request.showDeleteSectionModal && (
    <DeleteSectionBuilder
      show={true}
      onHide={() => setRequest({ ...request, showDeleteSectionModal: false })}
      surveyId={surveyId}
      section={sections[request.reqUpdateSectionIndex]}
    ></DeleteSectionBuilder>
  );

  const addQuestionModal = request.showAddQuestionModal && (
    <CreateQuestionBuilder
      show={true}
      onHide={() => setRequest({ ...request, showAddQuestionModal: false })}
      surveyId={surveyId}
      section={sections[request.reqUpdateSectionIndex]}
      // updateQuestion={(newQuestion) => {
      //   updateRequest({
      //     activeQuestion: newQuestion.questionIndex,
      //     showAddQuestionModal: false,
      //   });
      // }}
    ></CreateQuestionBuilder>
  );

  // displays block
  const SectionOption = ({ sec }) => {
    const editSectionOption = {
      type: "Edit",
      title: "Edit description",
      onClick: () =>
        setRequest({
          ...request,
          shopUpdateSectionModal: true,
          reqUpdateSectionIndex: sec[`${exprt.props.SECTION_INDEX}`],
        }),
    };
    const deleteSectionOption = {
      type: "Delete",
      title: "Delete section",
      onClick: () =>
        setRequest({
          ...request,
          showDeleteSectionModal: true,
          reqUpdateSectionIndex: sec[`${exprt.props.SECTION_INDEX}`],
        }),
    };
    const addQuestionOption = {
      type: "Add",
      title: "Add question",
      onClick: () =>
        setRequest({
          ...request,
          showAddQuestionModal: true,
          reqUpdateSectionIndex: sec[`${exprt.props.SECTION_INDEX}`],
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
          className="text-primary text-decoration-none d-inline-block h-100 px-2 text-center"
          onClick={() => setActiveSection(sec)}
        >
          <strong>Section {sec[`${exprt.props.SECTION_INDEX}`] + 1} </strong>
        </div>

        <CustomOverlayTrigger
          unitKey={sec[`${exprt.props.SECTION_ID}`]}
          title="Options"
        >
          <Dropdown.Toggle
            split
            variant="link"
            className="text-decoration-none text-info"
            id="dropdown-split-basic"
          ></Dropdown.Toggle>
        </CustomOverlayTrigger>
        {!readOnly && (
          <Dropdown.Menu className="p-0 m-0">
            <Dropdown.Item as="span">
              <div className="m-0 p-0">
                <SectionOption sec={sec} />
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        )}
      </>
    );
  };

  const sectionTitles = (
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
              draggableId={`${section[`${exprt.props.SECTION_ID}`]}`}
              index={section[`${exprt.props.SECTION_INDEX}`]}
              key={section[`${exprt.props.SECTION_ID}`]}
            >
              {(provided, snapshot) => (
                <Dropdown
                  as={ButtonGroup}
                  className={`nav-link m-0 p-0 ${
                    section[`${exprt.props.SECTION_INDEX}`] ===
                      activeSection[`${exprt.props.SECTION_INDEX}`] &&
                    " active "
                  } ${snapshot.isDragging && "bg-white"}`}
                  size="sm"
                  key={section[`${exprt.props.SECTION_INDEX}`]}
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
  );

  const sectionContent = (
    <div className="tab-content pb-1 bg-white" id="nav-tabContent">
      {sections.map((section) => (
        <div
          className={`tab-pane fade ml-2 ${
            activeSection[`${exprt.props.SECTION_ID}`] ===
              section[`${exprt.props.SECTION_ID}`] && "show active"
          }`}
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          key={section[`${exprt.props.SECTION_INDEX}`]}
        >
          {activeSection[`${exprt.props.SECTION_ID}`] ===
            section[`${exprt.props.SECTION_ID}`] && (
            <Section
              surveyId={surveyId}
              section={section}
              readOnly={readOnly}
              // activeQuestion={request.activeQuestion}
              // addQuestionShow={() =>
              //   updateRequest({
              //     showAddQuestionModal: true,
              //   })
              // }
              // updateQuestionAfterUpdated={(updatedQuestion) => {
              //   updateRequest({
              //     activeQuestion: updatedQuestion.questionIndex,
              //   });
              // }}
              // updateQuestionAfterDeleted={() =>
              //   updateRequest({
              //     activeQuestion: 0,
              //   })
              // }
            />
          )}
        </div>
      ))}
    </div>
  );

  const sectionsRender = (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <nav className="bg-light">{sectionTitles}</nav>
      {sectionContent}
    </DragDropContext>
  );

  const returnRender = (
    <>
      {!readOnly && (
        <>
          {updateSectionModal}
          {deleteSectionModal}
          {addQuestionModal}
        </>
      )}
      {sectionsRender}
    </>
  );

  return isRender && returnRender;
}

export default Sections;
