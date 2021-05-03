import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as funcs from "../../shared/utility";
import { Button, Card, Form } from "react-bootstrap";

function CustomBreadcrumb(props) {
  const { items = [], iconClassname = "" } = props;

  const mainDisplay = (
    <Form.Group>
      <Card.Header className="p-0">
        <div className="d-inline-block">
          {items.map((item, index) => (
            <span key={index}>
              {!funcs.isEmpty(items) && item.title && (
                <>
                  <Button
                    variant="link"
                    className={`${
                      item.color
                        ? item.color
                        : index === 0
                        ? " text-primary "
                        : " text-info "
                    } text-decoration-none`}
                    onClick={item.onClick}
                  >
                    <strong dangerouslySetInnerHTML={{ __html: item.title }} />
                  </Button>
                  {index !== items.length - 1 && (
                    <FontAwesomeIcon
                      icon={["fas", "chevron-right"]}
                      size="sm"
                      className={`"text-secondary mt-2 pt-1 " ${iconClassname}`}
                    />
                  )}
                </>
              )}
            </span>
          ))}
        </div>
        {/* options */}
        <div className="float-right">{props.children}</div>
      </Card.Header>
    </Form.Group>
  );

  return items.length > 0 && mainDisplay;
}

export default CustomBreadcrumb;
