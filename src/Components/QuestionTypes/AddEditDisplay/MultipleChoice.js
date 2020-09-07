import React from "react";
import {
  Form,
  Row,
  Col,
  InputGroup,
  OverlayTrigger,
  Button,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../shared/fontawesome";

const MultipleChoice = ({ props, innerref }) => {
  const { questionFields, updateQuestion, showAdvancedOption } = props;

  const { choices = [], minSelections, maxSelections } = questionFields;

  const refs = innerref;

  const AddingRow = () => (
    <Form.Group as={Row} className="my-0 py-0">
      <Col xs="12">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={["fas", "map-pin"]} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control type="text" ref={refs["addingRowRef"]} />
          <Options type={"add"} />
        </InputGroup>
      </Col>
    </Form.Group>
  );

  const removeOption = {
    name: "Remove",
    icons: ["fas", "minus-circle"],
    color: "text-danger",
    handleClick: (index) => {
      updateQuestion({ type: "remove", index: index });
    },
  };

  const addOption = {
    name: "Add",
    icons: ["fas", "plus-circle"],
    color: "text-success",
    handleClick: () => {
      updateQuestion({ type: "add" });
    },
  };

  const Options = ({ type, index }) => {
    const allowedOptions = type === "add" ? [addOption] : [removeOption];
    return allowedOptions.map((e, i) => (
      <OverlayTrigger key={i} overlay={<Tooltip id={i}>{e.name}</Tooltip>}>
        <Button
          variant="link"
          onClick={() => e.handleClick(index)}
          className={`${e.color} ml-2 mr-2`}
        >
          <FontAwesomeIcon icon={e.icons} size="lg" />
        </Button>
      </OverlayTrigger>
    ));
  };

  const ChoicesFGroup = ({ index, choice }) => (
    <Form.Group as={Row} className="my-0 py-0" key={index}>
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
          <Options type={"remove"} index={index} />
        </InputGroup>
      </Col>
    </Form.Group>
  );

  const advancedOptions = (
    <Form.Check
      custom
      type="checkbox"
      id={`custom-checkbox`}
      label={<strong>Advanced Options</strong>}
      onChange={() =>
        updateQuestion({
          type: "updateAdvancedOption",
        })
      }
      checked={showAdvancedOption}
    />
  );

  const minSelect = (
    <Col sm={6}>
      <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <strong>Minimum Selection</strong>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as="select"
          value={minSelections}
          onChange={(event) =>
            updateQuestion({
              type: "minUpdate",
              newMinSelections: event.target.value,
            })
          }
        >
          {choices.length > 0 ? (
            choices.map((_, i) => <option key={i + 1}>{i + 1}</option>)
          ) : (
            <option key={0}>0</option>
          )}
        </Form.Control>
      </InputGroup>
    </Col>
  );

  const maxSelect = (
    <Col sm={6}>
      <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <strong>Maximum Selection</strong>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as="select"
          value={maxSelections}
          onChange={(event) =>
            updateQuestion({
              type: "maxUpdate",
              newMaxSelections: event.target.value,
            })
          }
        >
          {choices.length > 0 ? (
            choices.map(
              (_, i) =>
                i + 1 >= minSelections && (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                )
            )
          ) : (
            <option key={0}>0</option>
          )}
        </Form.Control>
      </InputGroup>
    </Col>
  );

  const multipleChoice = choices.map((choice, index) => (
    <ChoicesFGroup index={index} choice={choice} key={index}></ChoicesFGroup>
  ));

  return (
    <>
      {showAdvancedOption && (
        <Form.Group as={Row}>
          {minSelect}
          {maxSelect}
        </Form.Group>
      )}
      <AddingRow />
      {multipleChoice}
      {advancedOptions}
    </>
  );
};

export default React.forwardRef((props, ref) => (
  <MultipleChoice props={props} innerref={ref} />
));
