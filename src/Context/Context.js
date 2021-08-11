import React, {
  createContext, useState, useMemo,
} from 'react';
import { initialSearch } from '../Controllers/Controller';
import { constructSongObject } from './songFunctions';
import { getYearRange, addEmptyYears } from './yearFunctions';

// predefined context
export const AppContext = createContext(
  {
    isLoading: false,
    error: false,
    years: [],
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
    const newSongs = [...songs, song];
    const newYears = getYearRange(newSongs);
    setYears(newYears);
    setSongs(newSongs);
  };

  const clearError = () => {
    setError(false);
  };
  const paddedSongs = songs.map((song) => addEmptyYears({ years, song }));
  const memoizedPaddedSongs = useMemo(() => paddedSongs, [songs]);
  return (
    <AppContext.Provider value={{
      search,
      isLoading,
      error,
      clearError,
      artist,
      memoizedPaddedSongs,
      years,
    }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
