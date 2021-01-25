import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import QuestionsQRS from "./QuestionsQRS/QuestionsQRS";

function SectionsQRS(props) {
  console.log("SectionQRS");

  const { sections = [], sectionsQRS = {} } = props;
  // console.log(sectionsQRS);

  const MainDisplay = ({ sections = [], sectionsQRS = {} }) => {
    return (
      <>
        {sections.length > 0 && (
          <Tabs
            defaultActiveKey={sections[0].id}
            className="border-0 bg-light"
            transition={false}
          >
            {sections.map((sec, index) => (
              <Tab
                key={index}
                eventKey={sec.id}
                title={`Section ${index + 1}`}
                className="border border-info"
              >
                <div className="mt-4">
                  <QuestionsQRS
                    questions={sec.questions}
                    questionsQRS={sectionsQRS[sec.id]}
                  />
                </div>
              </Tab>
            ))}
          </Tabs>
        )}{" "}
      </>
    );
  };

  return (
    <>
      {sections.length > 0 && (
        <MainDisplay sections={sections} sectionsQRS={sectionsQRS} />
      )}
    </>
  );
}

export default SectionsQRS;
