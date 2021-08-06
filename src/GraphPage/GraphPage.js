import React, { useState, useContext, useEffect } from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { AppContext } from '../Context/Context';
import Graph from './Components/Graph';
import Loading from '../Components/Loading/Loading';
import ExtraSong from './Components/ExtraSong';
import './GraphPage.css';
import { Link, useHistory } from 'react-router-dom';

export default function GraphPage() {
  const history = useHistory();
  const {
    artist, isLoading, paddedSongs, years, error, search,
  } = useContext(AppContext);
  const emptyPage = paddedSongs.length < 1 && !isLoading;
  const loadingPage = isLoading && paddedSongs.length < 1;
  const loadingAdditionalSong = isLoading && paddedSongs.length > 0;

  useEffect(() => {
    console.log(error);
    if (emptyPage && !error) history.push('/');
    // eslint-disable-line
  }, []);
  useEffect(() => {
    if (error) history.push('/error');
    // eslint-disable-line
  }, [error]);

  return (
    <Container fluid>
      <Row>
        <Col>
          {loadingPage ? <Loading /> : <Graph songs={paddedSongs} years={years} />}
        </Col>
      </Row>
      <Row>
        <Col>
          {!loadingPage && <ExtraSong artist={artist} submit={search} />}
        </Col>
      </Row>
    </Container>
  );
}
