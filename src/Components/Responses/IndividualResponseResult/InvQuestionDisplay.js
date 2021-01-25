import React from "react";
import { Card } from "react-bootstrap";

import * as funcs from "../../../shared/utility";
import InvMultipleChoiceDisplay from "./InvMultipleChoiceDisplay";
import InvRankingDisplay from "./InvRankingDisplay";
import InvRatingDisplay from "./InvRatingDisplay";
import InvTextDisplay from "./InvTextDisplay";

function InvQuestionDisplay(props) {
  const { questions = [], answers = [] } = props;

  const MainDisplay = ({ questions = [], answers = [] }) => {
    return (
      <>
        {answers.map((answer, index) => (
          <Card className="border mb-5" key={index}>
            <Card.Header>
              <div>
                <strong>
                  {index + 1}.{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: funcs.updateQDescImgs(
                        answer.description,
                        answer.attachments
                      ),
                    }}
                  />
                </strong>
              </div>
            </Card.Header>
            <Card.Body>
              {answer.answerType === "MULTIPLE_CHOICE" && (
                <InvMultipleChoiceDisplay
                  question={questions[index]}
                  answer={answer}
                />
              )}
              {answer.answerType === "RATING" && (
                <InvRatingDisplay question={questions[index]} answer={answer} />
              )}
              {answer.answerType === "RANKING" && (
                <InvRankingDisplay
                  question={questions[index]}
                  answer={answer}
                />
              )}
              {answer.answerType === "TEXT" && (
                <InvTextDisplay question={questions[index]} answer={answer} />
              )}
            </Card.Body>
          </Card>
        ))}
      </>
      // <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
      //   <Row>
      //     <Col sm={3} className="bg-light ">
      //       <Nav variant="pills" className="flex-column">
      //         {answers.map((_, index) => (
      //           <Nav.Item key={index}>
      //             <Nav.Link eventKey={index}>Question {index + 1}</Nav.Link>
      //           </Nav.Item>
      //         ))}
      //       </Nav>
      //     </Col>
      //     <Col sm={9} className="m-0 p-0">
      //       <Tab.Content className="m-0 h-100 border">
      //         {answers.map((answer, index) => (
      //           <Tab.Pane
      //             as={Card}
      //             className="border-0"
      //             eventKey={index}
      //             key={index}
      //           >
      //             <Card.Header className="">
      //               <div>
      //                 <strong>
      //                   {index + 1}.{" "}
      //                   <span
      //                     dangerouslySetInnerHTML={{
      //                       __html: funcs.updateQDescImgs(
      //                         answer.description,
      //                         answer.attachments
      //                       ),
      //                     }}
      //                   />
      //                 </strong>
      //               </div>
      //             </Card.Header>{" "}
      //             <div className="m-3">
      //               {answer.answerType === "MULTIPLE_CHOICE" && (
      //                 <InvMultipleChoiceDisplay
      //                   question={questions[index]}
      //                   answer={answer}
      //                 />
      //               )}
      //               {answer.answerType === "RATING" && (
      //                 <InvRatingDisplay
      //                   question={questions[index]}
      //                   answer={answer}
      //                 />
      //               )}
      //               {answer.answerType === "RANKING" && (
      //                 <InvRankingDisplay
      //                   question={questions[index]}
      //                   answer={answer}
      //                 />
      //               )}
      //               {answer.answerType === "TEXT" && (
      //                 <InvTextDisplay
      //                   question={questions[index]}
      //                   answer={answer}
      //                 />
      //               )}
      //             </div>
      //           </Tab.Pane>
      //         ))}
      //       </Tab.Content>
      //     </Col>
      //   </Row>
      // </Tab.Container>
    );
  };

  return (
    <>
      {questions.length > 0 && questions.length === answers.length && (
        <MainDisplay questions={questions} answers={answers} />
      )}{" "}
    </>
  );
}

export default InvQuestionDisplay;
