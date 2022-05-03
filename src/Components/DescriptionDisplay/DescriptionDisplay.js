import React from "react";
import { Card } from "react-bootstrap";

function DescriptionDisplay(props) {
  const {
    title = "content",
    description = "",
    mutedOption = true,
    label = "",
    className = "",
  } = props;

  const returnRender = (
    <Card.Text className={"ml-4 mb-2 " + className}>
      {label && description && <strong>Description: </strong>}
      <em>
        {description ? (
          <span
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        ) : (
          mutedOption && (
            <span className="text-muted">
              There is no description for this {title}
            </span>
          )
        )}
      </em>
    </Card.Text>
  );
  return returnRender;
}

export default DescriptionDisplay;
