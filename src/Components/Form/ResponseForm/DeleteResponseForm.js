import React from "react";
import { Form } from "react-bootstrap";

import FormModal from "../../Modal/FormModal";
import * as exprt from "../../../shared/export";

function DeleteResponseForm(props) {
  const {
    show,
    onHide,

    heading = "Remove Response",
    headingColor = "text-danger",
    submitTitle = "Delete",
    submitTitleVariant = "danger",
    size,

    response = {},
    onDeleteResponseSubmit,
  } = props;

  const modal = (
    <FormModal
      show={show}
      onHide={onHide}
      onSubmit={() =>
        onDeleteResponseSubmit(response[`${exprt.props.RESPONSE_ID}`])
      }
      heading={heading}
      headingColor={headingColor}
      submitTitle={submitTitle}
      submitTitleVariant={submitTitleVariant}
      size={size}
    >
      <Form.Group controlId="removeResponse">
        <Form.Label className="">
          <strong>
            The respondent{" "}
            <span className="text-danger">
              {response[`${exprt.props.RESPONSE_TYPE}`]} (
              {response[`${exprt.props.RESPONSE_DATE}`]})
            </span>{" "}
            and all related data will be removed.
          </strong>
        </Form.Label>

        <Form.Check
          type="checkbox"
          id={`check-delete-survey`}
          isInvalid
          className="mt-3 text-info"
        >
          <Form.Check.Input type="checkbox" required />
          <Form.Check.Label>
            <strong>
              Please confirm that you would like to remove the response
            </strong>
          </Form.Check.Label>
          <Form.Control.Feedback type="invalid">
            You have to check it to delete response.
          </Form.Control.Feedback>
        </Form.Check>
      </Form.Group>
    </FormModal>
  );
  // return <>{!funcs.isEmpty(response) && modal} </>;
  return <>{modal} </>;
}

export default DeleteResponseForm;
