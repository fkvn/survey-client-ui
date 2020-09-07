import React from "react";
import { Form, FormControl, Button, Col } from "react-bootstrap";

export default function searchForm() {
  return (
    <Form>
      <Form.Row>
        <Col xs={9}>
          <FormControl type="text" placeholder="Search" />
        </Col>
        <Col xs={3}>
          <Button variant="outline-success">Search</Button>
        </Col>
      </Form.Row>
    </Form>
  );
}
