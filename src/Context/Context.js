import React, { createContext, useState, useEffect } from 'react';
import { initialSearch } from '../Controllers/Controller';
import { range } from './auxFunctions';
import { constructSongObject } from './songFunctions';
import { getYearRange, addEmptyYears } from './yearFunctions';

// predefined context
export const AppContext = createContext(
  {
    isLoading: false,
    error: false,
    years: {},
    minYear: 0,
    maxYear: 0,
    tally: [{}],
    search: () => {},
    clearError: () => {},
    setParams: () => {},
  },
);

// main context class that contains all data
function AppContextProvider(props) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState('');
  const [songs, setSongs] = useState([]);
  const [paddedSongs, setPaddedSongs] = useState([]);
  const [minYear, setMinYear] = useState(0);
  const [maxYear, setMaxYear] = useState(0);
  const [years, setYears] = useState([]);

  const search = async (searchInfo) => {
    setIsLoading(true);
    setArtist(searchInfo.artist);
    const songData = await initialSearch(searchInfo);
    const searchSuccess = Object.keys(songData)[0] !== '__error__';
    if (searchSuccess) {
      const song = constructSongObject(songData);
      setParams(song);
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  const setParams = (song) => {
    const newYearRange = getYearRange({ minYear, maxYear, newSongYears: song.allYears });
    setMinYear(newYearRange.min);
    setMaxYear(newYearRange.max);
    setYears(range(newYearRange.min, newYearRange.max, 1));
    setSongs((array) => [...array, song]);
  };

  useEffect(() => {
    if (songs) {
      setPaddedSongs(songs.map((song) => addEmptyYears({ years, song })));
      setIsLoading(false);
    }
  }, [songs]);

  const clearError = () => {
    setError(false);
  };

  return (
    <AppContext.Provider value={{
      search,
      isLoading,
      error,
      clearError,
      artist,
      paddedSongs,
      years,
    }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
