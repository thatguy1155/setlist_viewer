import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Display(props) {
  const { display } = props;
  return (
    <Row>
      <Col xs={12} m={6}>
        <h1>{display}</h1>
      </Col>
    </Row>
  );
}
