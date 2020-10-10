import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../shared/fontawesome";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

function IconButton(props) {
  const {
    type,
    title,
    onClickHandler,
    index = 0,
    size = "sm",
    disabled,
    btnClassName,
  } = props;

  const options = [
    {
      name: "Add",
      color: "text-success",
      icon: ["fas", "plus-circle"],
    },
    {
      name: "Edit",
      color: "text-warning",
      icon: ["fas", "user-edit"],
    },
    {
      name: "Delete",
      icon: ["fas", "trash-alt"],
      color: "text-danger",
    },
    {
      name: "Clone",
      icon: ["fas", "clone"],
      color: "text-info",
    },
    {
      name: "Publish",
      icon: ["fas", "cloud-upload-alt"],
      color: "text-primary",
    },
    {
      name: "Close",
      icon: ["fas", "power-off"],
      color: "text-secondary",
    },
    {
      name: "Summary Result",
      icon: ["fas", "poll"],
      color: "text-primary",
    },
    {
      name: "Summary",
      icon: ["fas", "poll-h"],
      color: "text-primary",
    },
    {
      name: "Remove",
      icon: ["fas", "minus-circle"],
      color: "text-danger",
    },
    {
      name: "Move Up",
      icon: ["fas", "arrow-up"],
      color: "text-info",
    },
    {
      name: "Move Down",
      icon: ["fas", "arrow-down"],
      color: "text-info",
    },
  ];

  const selectedButton = options.reduce(
    (button, op) => (op.name === type ? op : button),
    {}
  );

  const iButton = (
    <OverlayTrigger
      overlay={<Tooltip id={type + title + index}>{title}</Tooltip>}
      key={type + title + index}
    >
      <Button
        variant="link"
        onClick={onClickHandler}
        size={size}
        className={`px-1 ${btnClassName}`}
        disabled={disabled}
      >
        <FontAwesomeIcon
          icon={selectedButton.icon}
          size="lg"
          className={selectedButton.color + ""}
        />
      </Button>
    </OverlayTrigger>
  );

  return <>{iButton}</>;
}

export default IconButton;
