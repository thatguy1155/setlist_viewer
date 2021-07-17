import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function SearchForm(props) {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const { search } = props;
  const history = useHistory();

  const readyForApi = (string) => string.toLowerCase().replace(' ', '%20');

  const handleChangeArtist = (event) => {
    setArtist(event.target.value);
  };
  const handleChangeSong = (event) => {
    setSong(event.target.value);
  };

  const handleClick = () => {
    const apiReadyArtist = readyForApi(artist);
    const apiReadySong = readyForApi(song);
    search({ artist: apiReadyArtist, song: apiReadySong });
    history.push('/results');
  };

  return (
    <div className="search-form">
      <label htmlFor="artist">
        Artist:
        <input type="text" id="artist" data-testid="artist" className="search-bar" onChange={handleChangeArtist} />
      </label>
      <label htmlFor="song">
        Song:
        <input type="text" id="song" data-testid="song" className="search-bar" onChange={handleChangeSong} />
      </label>
      <button type="button" className="submit-button" onClick={handleClick}>Submit</button>
    </div>
  );
}
