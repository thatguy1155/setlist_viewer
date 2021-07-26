import React, { createContext, useState } from 'react';
import { initialSearch } from '../Controllers/Controller';

// predefined context
export const AppContext = createContext(
  {
    isLoading: false,
    error: false,
    years: {},
    tally: [{}],
    search: (searchInfo) => {},
    clearError: () => {},
    parseByYear: (arrayOfDates) => {},
  },
);

// main context class that contains all data
function AppContextProvider(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [years, setYears] = useState({});
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
    setRangeOfYears(dates);
    setTally((array) => [...array, { [fixedSongName]: yearsForSong(dates) }]);
  };

  const yearsForSong = (dates) => {
    const yearTallyForSong = {};
    dates.forEach((date) => {
      const year = getYear(date);
      if (yearTallyForSong[year]) yearTallyForSong[year] += 1;
      else yearTallyForSong[year] = 1;
    });
    const completeTally = addEmptyYears(yearTallyForSong);
    return completeTally;
  };

  const addEmptyYears = (yearTallyForSong) => {
    const listOfYears = Object.keys(years);
    const completeYearTally = {};
    listOfYears.forEach((yearInObj) => {
      // possible error here due to typing
      if (yearTallyForSong[yearInObj]) completeYearTally[yearInObj] = yearTallyForSong[yearInObj];
      else completeYearTally[yearInObj] = 0;
    });
    return completeYearTally;
  };

  const setRangeOfYears = (dates) => {
    const yearsForThisSong = getYearsForThisSong(dates);
    const lastYearForThisSong = Math.max(yearsForThisSong);
    const firstYearForThisSong = Math.min(yearsForThisSong);
    const newYearRange = compareToYearsState({ firstYearForThisSong, lastYearForThisSong });
    newYearRange && setYears(newYearRange);
  };

  const compareToYearsState = ({ firstYearForThisSong, lastYearForThisSong }) => {
    if (years === {}) return newYearObject({ min: firstYearForThisSong, max: lastYearForThisSong });

    const arrayOfYears = Object.keys(years);
    const yearStateMin = Math.min(arrayOfYears);
    const yearStateMax = Math.max(arrayOfYears);
    const newMinYear = firstYearForThisSong < yearStateMin;
    const newMaxYear = lastYearForThisSong > yearStateMax;

    if (newMinYear && newMaxYear) {
      return newYearObject({ min: firstYearForThisSong, max: lastYearForThisSong });
    }
    if (newMinYear) {
      return newYearObject({ min: firstYearForThisSong, max: yearStateMax });
    }
    if (newMaxYear) {
      return newYearObject({ min: yearStateMin, max: lastYearForThisSong });
    }
    return null;
  };

  const newYearObject = ({ min, max }) => {
    const yearObj = {};
    for (let year = min; year <= max; year += 1) {
      yearObj[year] = `${year}`;
    }
    return yearObj;
  };

  const getYearsForThisSong = (dates) => dates.map((date) => getYear(date));

  const getYear = (date) => date.split('-')[2];

  const clearError = () => {
    setError(false);
  };

  return (
    <AppContext.Provider value={{
      tally,
      years,
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
