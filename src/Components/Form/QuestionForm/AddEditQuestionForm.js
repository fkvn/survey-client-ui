import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Form, InputGroup } from "react-bootstrap";

import * as funcs from "../../../shared/utility";
import FormModal from "../../Modal/FormModal";

import MultipleChoice from "../../QuestionTypes/AddEditDisplay/MultipleChoice";
import CustomDraftjs from "../../RichTextEditor/CustomDraftjs";
import Ranking from "../../QuestionTypes/AddEditDisplay/Ranking";
import Rating from "../../QuestionTypes/AddEditDisplay/Rating";
import Text from "../../QuestionTypes/AddEditDisplay/Text";

function AddEditQuestionForm(props) {
  const {
    show = false,
    onHide = true,
    heading = "Adding Question",
    submitTitle = "Add",
    mode = "Add",
    question = {},
    section,
    onAddQuestionSubmit,
    onUpdateQuestionSubmit,
    size = "lg",
  } = props;

  const { id, questionType, description, ...questionFields } = question;

  const [request, setRequest] = useState({
    qType: question.questionType ? question.questionType : "MULTIPLE_CHOICE",
    questionFields: questionFields,
    showAdvancedOption:
      question.minSelections > 1 ||
      question.maxSelections > 1 ||
      question.textLength > -1
        ? true
        : false,
    isEmptyDesc: false,
  });

  const attachmentObjects = useSelector(
    (state) => state.surveyBuilder.attachmentObjects
  );

  // refs generating
  const drafjsRef = React.useRef();
  const qTypeRef = useRef(request.qType);

  let refs = {};
  switch (request.qType) {
    case "MULTIPLE_CHOICE":
      {
        refs = {
          addingRowRef: React.createRef(),
          choiceRefs: [],
          minRef: React.createRef(),
          maxRef: React.createRef(),
        };

        const choices = request.questionFields.choices
          ? request.questionFields.choices
          : [];

        for (let i = 0; i < choices.length; i++) {
          const choiceRef = React.createRef();
          refs = {
            ...refs,
            choiceRefs: [...refs.choiceRefs, choiceRef],
          };
        }
      }
      break;
    case "RANKING":
      {
        refs = {
          addingRowRef: React.createRef(),
          choiceRefs: [],
        };

        const choices = request.questionFields.rankingChoices
          ? request.questionFields.rankingChoices
          : [];

        for (let i = 0; i < choices.length; i++) {
          const choiceRef = React.createRef();
          refs = {
            ...refs,
            choiceRefs: [...refs.choiceRefs, choiceRef],
          };
        }
      }
      break;
    default:
      break;
  }

  // question Type
  const questionTypes = ["MULTIPLE_CHOICE", "RANKING", "RATING", "TEXT"];
  const qTypesFGroup = (
    <Form.Group controlId="qTypes.ControlSelect">
      <Form.Control
        as="select"
        ref={qTypeRef}
        className="text-info"
        size="sm"
        onChange={(event) =>
          setRequest({
            ...request,
            qType: event.target.value,
            showAdvancedOption: false,
            questionFields: {},
          })
        }
        defaultValue={request.qType}
      >
        {questionTypes.map((type, index) => (
          <option key={index}>{type}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );

  // question description
  const qDescFGroup = (
    <>
      <>
        <CustomDraftjs
          ref={drafjsRef}
          defaultEditor={
            question.description &&
            funcs.updateQDescImgs(question.description, question.attachments)
          }
        />
        {/* <RTEAddQuestionBuilder
          defaultValue={question.description && funcs.updateQDescImgs(question)}
          defaultAttachments={question.attachments}
          updateQuestion={(
            newDescription,
            newattachments,
            isEmptyDesc,
            removeAttachmentIds
          ) => {
            setRequest({
              ...request,
              qDesc: newDescription,
              attachments: newattachments,
              isEmptyDesc: isEmptyDesc,
              removeAttachmentIds: removeAttachmentIds,
            });
          }}
        ></RTEAddQuestionBuilder> */}
      </>
    </>
  );

  // question answer choice

  const updateMultipleChoiceQuestion = ({
    type,
    index,
    newMinSelections,
    newMaxSelections,
  }) => {
    const currentChoices = refs.choiceRefs.reduce(
      (choices, choice) => [...choices, choice.current.value],
      []
    );

    const maxSelections = request.questionFields.maxSelections;
    const minSelections = request.questionFields.minSelections;

    switch (type) {
      case "updateAdvancedOption":
        setRequest({
          ...request,
          questionFields: {
            ...request.questionFields,
            choices: currentChoices,
          },
          showAdvancedOption: !request.showAdvancedOption,
        });
        break;
      case "add":
        {
          const newChoices = [
            ...currentChoices,
            refs.addingRowRef.current.value,
          ];

          setRequest({
            ...request,
            questionFields: {
              choices: [...newChoices],
              minSelections: minSelections
                ? minSelections
                : newChoices && newChoices.length > 0
                ? 1
                : 0,
              maxSelections:
                maxSelections &&
                minSelections &&
                maxSelections >= minSelections &&
                maxSelections <= newChoices.length
                  ? maxSelections
                  : newChoices.length,
            },
          });
        }
        break;
      case "remove":
        {
          const newChoices = currentChoices.filter(
            (_, i) => i !== Number(index)
          );

          setRequest({
            ...request,
            questionFields: {
              choices: [...newChoices],
              minSelections:
                newChoices.length > 0 && minSelections <= newChoices.length
                  ? minSelections
                  : 0,
              maxSelections:
                maxSelections && maxSelections <= newChoices.length
                  ? maxSelections
                  : newChoices.length,
            },
          });
        }
        break;
      case "minUpdate":
        setRequest({
          ...request,
          questionFields: {
            choices: currentChoices,
            minSelections: newMinSelections,
            maxSelections:
              maxSelections && maxSelections >= newMinSelections
                ? maxSelections
                : newMinSelections,
          },
        });
        break;
      case "maxUpdate":
        setRequest({
          ...request,
          questionFields: {
            ...request.questionFields,
            choices: currentChoices,
            maxSelections:
              newMaxSelections < minSelections
                ? minSelections
                : newMaxSelections,
          },
        });
        break;
      default:
        break;
    }
  };
  const multipleChoice = (
    <MultipleChoice
      ref={refs}
      questionFields={request.questionFields}
      showAdvancedOption={request.showAdvancedOption}
      updateQuestion={updateMultipleChoiceQuestion}
    />
  );

  // // question text
  const text = (
    <Text
      questionFields={request.questionFields}
      showAdvancedOption={request.showAdvancedOption}
      updateQuestion={({ type, newTextLength }) => {
        switch (type) {
          case "updateAdvancedOption":
            setRequest({
              ...request,
              showAdvancedOption: !request.showAdvancedOption,
            });

            break;
          case "textLength":
            setRequest({
              ...request,
              questionFields: {
                textLength: newTextLength,
              },
            });
            break;
          default:
            break;
        }
      }}
    />
  );

  // question rating
  const updateRatingQuestion = (newRatingScale) => {
    setRequest({
      ...request,
      questionFields: { ratingScale: newRatingScale },
    });
  };
  const rating = (
    <Rating
      questionFields={request.questionFields}
      updateQuestion={updateRatingQuestion}
    />
  );

  // question ranking
  const updateRankingQuestion = ({ type, index }) => {
    const currentChoices = refs.choiceRefs.reduce(
      (choices, choice) => [...choices, choice.current.value],
      []
    );

    switch (type) {
      case "add":
        {
          const newChoices = [
            ...currentChoices,
            refs.addingRowRef.current.value,
          ];
          setRequest({
            ...request,
            questionFields: {
              rankingChoices: [...newChoices],
            },
          });
        }
        break;
      case "remove":
        {
          const newChoices = currentChoices.filter(
            (_, i) => i !== Number(index)
          );

          setRequest({
            ...request,
            questionFields: {
              rankingChoices: [...newChoices],
            },
          });
        }
        break;
      default:
        break;
    }
  };

  const ranking = (
    <Ranking
      ref={refs}
      questionFields={request.questionFields}
      updateQuestion={updateRankingQuestion}
    ></Ranking>
  );

  const handleOnSubmit = () => {
    const [
      newDescription,
      newattachments,
      isEmptyEditor,
    ] = funcs.exportFromEditor(
      drafjsRef.current.getEditorState(),
      attachmentObjects
    );

    if (!isEmptyEditor) {
      const newQuestion = {
        questionType: qTypeRef.current.value,
        description: newDescription,
      };

      switch (qTypeRef.current.value) {
        case "MULTIPLE_CHOICE":
          {
            const choices = refs.choiceRefs.reduce(
              (choices, choice) => [...choices, choice.current.value],
              []
            );
            newQuestion.choices = choices;

            if (request.showAdvancedOption) {
              const minSelections = request.questionFields.minSelections;
              const maxSelections = request.questionFields.maxSelections;

              newQuestion.minSelections =
                choices.length > 0
                  ? minSelections
                    ? Number(minSelections)
                    : 1
                  : 0;

              newQuestion.maxSelections =
                choices.length > 0
                  ? maxSelections
                    ? Number(maxSelections)
                    : minSelections
                    ? Number(minSelections)
                    : 1
                  : 0;
            } else {
              newQuestion.minSelections = choices.length > 0 ? 1 : 0;
              newQuestion.maxSelections = choices.length > 0 ? 1 : 0;
            }
          }
          break;
        case "RANKING":
          {
            const choices = refs.choiceRefs.reduce(
              (choices, choice) => [...choices, choice.current.value],
              []
            );
            newQuestion.rankingChoices = choices;
          }
          break;
        case "RATING":
          {
            const ratingScale = request.questionFields.ratingScale;
            newQuestion.ratingScale = ratingScale ? Number(ratingScale) : 5;
          }
          break;
        case "TEXT":
          if (request.showAdvancedOption) {
            const textLength = request.questionFields.textLength;
            newQuestion.textLength = textLength ? Number(textLength) : 20;
          }
          break;
        default:
          break;
      }

      mode === "Add"
        ? onAddQuestionSubmit(section.id, newQuestion, newattachments)
        : onUpdateQuestionSubmit(
            section.id,
            question.id,
            newQuestion,
            newattachments
          );
    } else {
      setRequest({ ...request, isEmptyDesc: true });
    }
  };

  const title = (
    <Form.Label>
      <strong>
        QUESTION{" "}
        {mode === "Add"
          ? section.questions
            ? section.questions.length + 1
            : ""
          : question
          ? question.questionIndex + 1
          : ""}
      </strong>
    </Form.Label>
  );

  const modal = (
    <FormModal
      show={show}
      onHide={onHide}
      heading={heading}
      submitTitle={submitTitle}
      // onSubmit={
      //   (!request.isEmptyDesc ||
      //     (!request.isEmptyDesc &&
      //       request.questionFields.ratingScale > 0 &&
      //       request.questionFields.ratingScale < 11)) &&
      //   handleOnSubmit
      // }
      onSubmit={handleOnSubmit}
      size={size}
    >
      <InputGroup className="mb-2">
        <InputGroup.Prepend className="mr-5">{title}</InputGroup.Prepend>
        {qTypesFGroup}
      </InputGroup>
      {qDescFGroup}
      {request.isEmptyDesc && (
        <div className="text-danger m-0 p-0 mb-1 pb-3">
          Question description is required!!!
        </div>
      )}
      {request.qType === "MULTIPLE_CHOICE" && multipleChoice}
      {request.qType === "TEXT" && text}
      {request.qType === "RATING" && rating}
      {request.qType === "RANKING" && ranking}
    </FormModal>
  );

  return <>{modal}</>;
}

export default AddEditQuestionForm;
