import React, { createContext, useState } from 'react';
import { initialSearch } from '../Controllers/Controller';

// predefined context
export const AppContext = createContext(
  {
    isLoading: false,
    error: false,
    search: (searchInfo) => {},
    tally: (searchInfo) => [{}],
    clearError: () => {},
    parseByYear: (arrayOfDates) => {},
  },
);

// main context class that contains all data
function AppContextProvider(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [tally, setTally] = useState([]);
  const [artist, setArtist] = useState('');
  const [error, setError] = useState(false);

  const search = async (searchInfo) => {
    setIsLoading(true);
    setArtist(searchInfo.artist);
    const songDates = await initialSearch(searchInfo);
    const searchSuccess = Object.keys(songDates)[0] !== '__error__';
    if (searchSuccess) parseByYear({ songDates, songName: searchInfo.song });
    else setError(true);
    setIsLoading(false);
  };

  const parseByYear = ({ songDates, songName }) => {
    const fixedSongName = songName.replace('%20', ' ');
    const dates = songDates[fixedSongName];
    setTally((array) => [...array, { [fixedSongName]: songsPerYear(dates) }]);
  };

  const songsPerYear = (dates) => {
    const yearTally = {};
    dates.forEach((date) => {
      const year = getYear(date);
      if (yearTally[year]) yearTally[year] += 1;
      else yearTally[year] = 1;
    });
    return yearTally;
  };

  const getYear = (date) => date.split('-')[2];

  const clearError = () => {
    setError(false);
  };

  return (
    <AppContext.Provider value={{
      tally,
      search,
      isLoading,
      error,
      clearError,
      artist,
    }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
