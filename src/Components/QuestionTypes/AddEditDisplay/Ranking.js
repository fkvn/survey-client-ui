import React from "react";
import { InputGroup, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../CustomButton/IconButton";
import "../../../shared/fontawesome";

const Ranking = ({ props, innerref }) => {
  const { questionFields, updateQuestion } = props;

  const { rankingChoices = [] } = questionFields;

  const refs = innerref;

  const Options = ({ type, index }) => {
    const addRankingChoiceOption = {
      type: "Add",
      title: "Add Ranking Choice",
      onClick: () => updateQuestion({ type: "add" }),
    };

    const removeRankingChoiceOption = {
      type: "Remove",
      title: "Remove Ranking Choice",
      onClick: () => updateQuestion({ type: "remove", index: index }),
    };

    let allowedOptions = [];

    switch (type) {
      case "Add":
        allowedOptions = [{ ...addRankingChoiceOption }];
        break;
      case "Remove":
        allowedOptions = [{ ...removeRankingChoiceOption }];
        break;
      default:
        break;
    }

    return (
      <>
        {allowedOptions.map((op, i) => (
          <IconButton
            type={op.type}
            title={op.title}
            onClickHandler={op.onClick}
            key={i}
            index={i}
            size="md"
          />
        ))}
      </>
    );
  };

  const AddingRow = () => {
    return (
      <Form.Group as={Row} className="my-0 py-0">
        <Col xs="12">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon icon={["fas", "map-pin"]} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="text" ref={refs["addingRowRef"]} />
            <div className="ml-3 mr-3 ">
              <Options type="Add" />
            </div>
          </InputGroup>
        </Col>
      </Form.Group>
    );
  };

  const RankingChoices = ({ index, choice }) => {
    return (
      <Form.Group as={Row} className="my-0 py-0" key={choice.id + index}>
        <Col xs="12">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <strong className="text-primary"> {index + 1}</strong>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              ref={refs["choiceRefs"][index]}
              defaultValue={choice}
            />
            <div className="ml-3 mr-3 ">
              <Options type="Remove" index={index} />
            </div>
          </InputGroup>
        </Col>
      </Form.Group>
    );
  };

  return (
    <>
      {" "}
      <AddingRow />
      {rankingChoices &&
        rankingChoices.map((choice, index) => (
          <RankingChoices choice={choice} index={index} key={index} />
        ))}
    </>
  );
};

export default React.forwardRef((props, ref) => (
  <Ranking props={props} innerref={ref} />
));
