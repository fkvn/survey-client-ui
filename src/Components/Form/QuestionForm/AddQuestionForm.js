import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import FormModal from "../../Modal/FormModal";
import CustomDraftjs from "../../RichTextEditor/CustomDraftjs";

import * as exprt from "../../../shared/export";
import { useSelector } from "react-redux";
import MCFormFields from "./QuestionTypes/MCFormFields";
import { addQuestion } from "../../../store/actionCreators/Surveys/actions";
import RKFormFields from "./QuestionTypes/RKFormFields";
import RTFomrFields from "./QuestionTypes/RTFomrFields";
import TXTFormFields from "./QuestionTypes/TXTFormFields";

function AddQuestionForm(props) {
  // ============================ init =======================

  const { show = false, onHide = () => {}, addQuestion = () => {} } = props;

  const heading = "Add Question";
  const submitTitle = "Add";
  const size = "lg";

  const qTypes = [
    exprt.props.MC_TYPE,
    exprt.props.RK_TYPE,
    exprt.props.RT_TYPE,
    exprt.props.TXT_TYPE,
  ];

  let isRender = false;

  // state

  const [question, setQuestion] = useState({
    type: qTypes[0],
  });

  const [isEmptyDesc, setEmptyDesc] = useState(false);

  // redux store
  const attachmentObjects = useSelector(
    (state) => state.surveyBuilder.attachmentObjects
  );

  // refs
  const drafjsRef = React.useRef();
  const multipleChoiceRef = React.useRef();
  const rankingRef = React.useRef();
  const ratingRef = React.useRef();
  const textRef = React.useRef();
  // ============================ functions =======================

  const getMCProps = (multipleChoiceRef) => {
    const multipleChoiceProps = {};

    // update props
    try {
      // get all answers value
      const answersRef = multipleChoiceRef.current[`${exprt.props.MC_ANSWERS}`];

      const answerValues = answersRef.reduce(
        (answers, ansRef) => [...answers, ansRef.current.value],
        []
      );

      // update answers
      multipleChoiceProps[`${exprt.props.MC_ANSWERS}`] = answerValues;

      // update min max
      multipleChoiceProps[`${exprt.props.MC_MIN_SEL}`] =
        multipleChoiceRef.current[`${exprt.props.MC_MIN_SEL}`];

      multipleChoiceProps[`${exprt.props.MC_MAX_SEL}`] =
        multipleChoiceRef.current[`${exprt.props.MC_MAX_SEL}`];
    } catch (error) {}

    console.log("mul");
    console.log(multipleChoiceProps);

    return multipleChoiceProps;
  };

  const getRKProps = (rankingRef) => {
    const rankingProps = {};

    // update props
    try {
      // get all answers value
      const answersRef = rankingRef.current[`${exprt.props.RK_ANSWERS}`];

      const answerValues = answersRef.reduce(
        (answers, ansRef) => [...answers, ansRef.current.value],
        []
      );

      // update answers
      rankingProps[`${exprt.props.RK_ANSWERS}`] = answerValues;
    } catch (error) {}

    return rankingProps;
  };

  const getRTProps = (ratingRef) => {
    const ratingProps = {};

    // update props
    try {
      // get all rating scale value
      const ratingScale = ratingRef.current[`${exprt.props.RT_SCALE}`];

      // update answers
      ratingProps[`${exprt.props.RT_SCALE}`] = ratingScale;
    } catch (error) {}

    return ratingProps;
  };

  const getTXTProps = (textRef) => {
    const textProps = {};

    // update props
    try {
      // get all rating scale value
      const textLength = textRef.current[`${exprt.props.TXT_LENGTH}`];

      // update answers
      textProps[`${exprt.props.TXT_LENGTH}`] = textLength;
    } catch (error) {}

    return textProps;
  };

  const getSubmitQuestion = (qDesc, qType) => {
    let submitQuestion = {
      [`${exprt.props.QUESTION_TYPE}`]: qType,
      [`${exprt.props.QUESTION_DESCRIPTION}`]: qDesc,
    };

    let qProps = {};

    switch (qType) {
      case exprt.props.MC_TYPE:
        qProps = getMCProps(multipleChoiceRef);
        break;
      case exprt.props.RK_TYPE:
        qProps = getRKProps(rankingRef);
        break;
      case exprt.props.RT_TYPE:
        qProps = getRTProps(ratingRef);
        break;
      case exprt.props.TXT_TYPE:
        qProps = getTXTProps(textRef);
        break;
      default:
        break;
    }

    submitQuestion = { ...submitQuestion, ...qProps };

    return submitQuestion;
  };

  const handleOnSubmit = () => {
    const [description, newattachments, _] = exprt.funcs.exportFromEditor(
      drafjsRef.current.getEditorState(),
      attachmentObjects
    );

    // get new Question
    const newQuestion = getSubmitQuestion(description, question.type);

    addQuestion(newQuestion, newattachments);

    onHide();
  };

  // ============================ hooks ============================

  // useEffect(() => (multipleChoiceRef.current = undefined), [question.type]);

  // ============================ logic flow =======================

  if (show) {
    isRender = true;
  }

  // ============================ sub-components =======================

  const mcContentCtrl = question.type === exprt.props.MC_TYPE && (
    <MCFormFields ref={multipleChoiceRef}></MCFormFields>
  );

  const rkContentCtrl = question.type === exprt.props.RK_TYPE && (
    <RKFormFields ref={rankingRef}></RKFormFields>
  );

  const rtContentCtrl = question.type === exprt.props.RT_TYPE && (
    <RTFomrFields ref={ratingRef}></RTFomrFields>
  );

  const txtContentCtrl = question.type === exprt.props.TXT_TYPE && (
    <TXTFormFields ref={textRef}></TXTFormFields>
  );

  // form controls block
  const qTypeCtrl = (
    <InputGroup className="mb-2">
      <InputGroup.Prepend className="mr-5">Question Type</InputGroup.Prepend>
      <Form.Group>
        <Form.Control
          as="select"
          className="text-info"
          size="sm"
          onChange={(event) =>
            setQuestion({
              ...question,
              type: event.target.value,
            })
          }
          defaultValue={question.type}
        >
          {qTypes.map((type, index) => (
            <option key={index}>{type}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </InputGroup>
  );

  const qDescCtrl = <CustomDraftjs ref={drafjsRef} />;

  const QTypeContentCtrl = ({ type = "" }) => {
    let qTypeContentRender = <> </>;

    switch (type) {
      // MULTIPLE_CHOICE
      case exprt.props.MC_TYPE:
        qTypeContentRender = mcContentCtrl;
        break;
      // RANKING
      case exprt.props.RK_TYPE:
        qTypeContentRender = rkContentCtrl;
        break;
      // RATING
      case exprt.props.RT_TYPE:
        qTypeContentRender = rtContentCtrl;
        break;
      // TEXT
      case exprt.props.TXT_TYPE:
        qTypeContentRender = txtContentCtrl;
        break;
      default:
        break;
    }
    return qTypeContentRender;
  };

  // form
  const modal = (
    <FormModal
      show={show}
      onHide={onHide}
      heading={heading}
      submitTitle={submitTitle}
      onSubmit={() => {
        const [_, __, isEmptyEditor] = exprt.funcs.exportFromEditor(
          drafjsRef.current.getEditorState(),
          attachmentObjects
        );

        if (!isEmptyEditor) handleOnSubmit();
        else {
          setEmptyDesc(true);
        }
      }}
      size={size}
    >
      {qTypeCtrl}

      {qDescCtrl}
      {isEmptyDesc && (
        <div className="text-danger m-0 p-0 mb-1 pb-3">
          Question description is required!!!
        </div>
      )}

      <QTypeContentCtrl type={question.type} />
    </FormModal>
  );

  const returnRender = isRender && modal;

  return returnRender;
}

export default AddQuestionForm;
