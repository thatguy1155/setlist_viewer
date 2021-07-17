import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context/Context';

export default function ExtraSong(props) {
  const { artist, submit } = props;

  const [song, setSong] = useState('');
  const readyForApi = (string) => string.toLowerCase().replace(' ', '%20');

  const handleClick = () => {
    const apiReadyArtist = readyForApi(artist);
    const apiReadySong = readyForApi(song);
    submit({ artist: apiReadyArtist, song: apiReadySong });
  };

  const handleChangeSong = (event) => {
    setSong(event.target.value);
  };

  return (
    <div className>
      <label htmlFor="song">
        Song:
        <input type="text" id="song" data-testid="song" className="search-bar" onChange={handleChangeSong} />
      </label>
      <button type="button" className="submit-button" onClick={handleClick}>Submit</button>
    </div>
  );
}
