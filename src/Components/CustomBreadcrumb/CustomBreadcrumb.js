import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import * as funcs from "../../shared/utility";
import { Button } from "react-bootstrap";

function CustomBreadcrumb(props) {
  const { items = [], iconClassname } = props;

  const MainDisplay = ({ items = [] }) => (
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
                {/* {}
                </strong> */}
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
  );

  return <> {items.length > 0 && <MainDisplay items={items} />} </>;
}

export default CustomBreadcrumb;
