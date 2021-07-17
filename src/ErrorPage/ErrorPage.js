import React, { useContext } from 'react';
import { AppContext } from '../Context/Context';
import { Link, useHistory } from 'react-router-dom';

export default function ErrorPage() {
  const {
    error, clearError,
  } = useContext(AppContext);
  const history = useHistory();

  const handleClick = () => {
    clearError();
    history.push('/');
  };
  return (
    <div>
      <h2>Something went wrong. Please hit refresh and try again.</h2>
      <button type="button" onClick={() => handleClick()}> try again? </button>
    </div>
  );
}
