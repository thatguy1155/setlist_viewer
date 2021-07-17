import React, { useState, useContext, useEffect } from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { AppContext } from '../Context/Context';
import Display from './Components/Display';
import SearchForm from './Components/SearchForm';
import './SearchPage.css';

export default function SearchPage(props) {
  const { artistName, search } = useContext(AppContext);
  const display = !artistName ? 'Search For An Artist' : `Search For a Song by ${artistName}`;

  return (
    <Container fluid>
      <Display display={display} />
      <Row>
        <Col>
          <SearchForm artistName={artistName} search={search} />
        </Col>
      </Row>
    </Container>
  );
}
