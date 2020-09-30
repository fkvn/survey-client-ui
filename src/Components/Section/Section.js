import React from "react";

function Section(props) {
  const { section, addQuestionReq } = props;

  const DisplayDescription = ({ description, label }) => {
    return (
      <Card.Text className="ml-4 mb-2">
        {label && description && <strong>Description: </strong>}
        <em>{description}</em>
      </Card.Text>
    );
  };

  const Section = ({ sec }) => {
    return (
      <>
        <Tab
          eventKey={sec.sectionIndex}
          title={<SectionTitleBar sec={sec} />}
          className="p-0 m-0"
        >
          <DisplayDescription
            description={sec.description}
            label="Description"
          ></DisplayDescription>
          {/* {sec.questions.length > 0 && <QuestionsDisplay section={sec} />} */}

          <Form.Group className="m-4">
            <Button
              variant="success"
              onClick={() =>
                addQuestionReq(
                  true,
                  sec,
                  sec.questions && sec.questions.length > 0
                    ? sec.questions[0]
                    : null
                )
              }
            >
              Add Question
            </Button>
          </Form.Group>
        </Tab>
      </>
    );
  };

  return <Section section={section} />;
}

export default Section;
