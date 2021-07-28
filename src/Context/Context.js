import React, { createContext, useState, useEffect } from 'react';
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
    setParams: (arrayOfDates) => {},
  },
);

// main context class that contains all data
function AppContextProvider(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [years, setYears] = useState({});
  const [tally, setTally] = useState([]);
  const [artist, setArtist] = useState('');
  const [error, setError] = useState(false);

  const [songDates, setSongDates] = useState([]);
  const [songName, setSongName] = useState('');

  const search = async (searchInfo) => {
    setIsLoading(true);
    setArtist(searchInfo.artist);
    const songData = await initialSearch(searchInfo);
    const searchSuccess = Object.keys(songDates)[0] !== '__error__';
    if (searchSuccess) setParams({ songData, nameForThisSong: searchInfo.song });
    else {
      setError(true);
      setIsLoading(false);
    }
  };

  const setParams = ({ songData, nameForThisSong }) => {
    const thisSongName = nameForThisSong.replace('%20', ' ');
    const datesForSong = songData[thisSongName];
    setSongName(thisSongName);
    setSongDates(datesForSong);
    setRangeOfYears(datesForSong);
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
    const yearsForThisSong = getYearsForThisSong(dates).map((year) => parseInt(year, 10));
    const lastYearForThisSong = Math.max(...yearsForThisSong);
    const firstYearForThisSong = Math.min(...yearsForThisSong);
    const newYearRange = compareToYearsObj({ firstYearForThisSong, lastYearForThisSong });
    console.log(newYearRange);
    if (newYearRange) setYears(newYearRange);
    // TODO: if years is updated, useEffect to re-render the other songs if len > 1
  };

  const compareToYearsObj = ({ firstYearForThisSong, lastYearForThisSong }) => {
    if (emptyYearObj) return newYearObject({ min: firstYearForThisSong, max: lastYearForThisSong });
    const arrayOfYears = Object.keys(years).map((year) => parseInt(year, 10));
    const yearStateMin = Math.min(...arrayOfYears);
    const yearStateMax = Math.max(...arrayOfYears);
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
    console.log(yearObj);
    return yearObj;
  };

  const getYearsForThisSong = (dates) => dates.map((date) => getYear(date));

  const getYear = (date) => date.split('-')[2];
  const emptyYearObj = Object.keys(years).length === 0;

  // TODO: works for one song, but sets year to empty when new song is added
  // Make it so that every song is rerendered is the years change
  // possibly create allsongs array
  // separate useEffects for adding one song or rerendering all based on songname vs years updating
  useEffect(() => {
    console.log(songName);
    console.log(years);
    if (!emptyYearObj) setTally((array) => [...array, { [songName]: yearsForSong(songDates) }]);
    const newTally = tally;
    const parsedNewTally = newTally.map((song) => {
      const theSongName = Object.keys(song)[0];
      const dates = song[theSongName];
      const newDates = addEmptyYears(dates);
      return { [theSongName]: newDates };
    });
    console.log(parsedNewTally);
    setTally(parsedNewTally);
    // setIsLoading(false);
  }, [years]);

  useEffect(() => {
    if (!emptyYearObj) setTally((array) => [...array, { [songName]: yearsForSong(songDates) }]);
    setIsLoading(false);
  }, [songDates]);

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
