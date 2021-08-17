import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context/Context';

export default function ExtraSong(props) {
  const { artist, submit, suggest } = props;

  const [song, setSong] = useState('');
  const readyForApi = (string) => string.toLowerCase().replace(' ', '%20');

  const handleClick = () => {
    const apiReadyArtist = readyForApi(artist);
    submit({ artist: apiReadyArtist, song });
  };

  const handleChangeSong = async (event) => {
    const apiReadySong = readyForApi(event.target.value);
    setSong(apiReadySong);
    try {
      await suggest({ artist: readyForApi(artist), song: apiReadySong });
    } catch (e) {
      console.log(e);
    }
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
