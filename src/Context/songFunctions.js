import { getYear } from './auxFunctions';

// eslint-disable-next-line import/prefer-default-export
export const constructSongObject = (searchResult) => {
  const song = {
    name: Object.keys(searchResult)[0],
  };
  const rawDates = searchResult[song.name];
  song.byYear = yearsForSong(rawDates);
  song.allYears = yearsAsInt(Object.keys(song.byYear));
  return song;
};

const yearsForSong = (dates) => {
  const yearTallyForSong = {};
  dates.forEach((date) => {
    const year = getYear(date);
    if (yearTallyForSong[year]) yearTallyForSong[year] += 1;
    else yearTallyForSong[year] = 1;
  });
  return yearTallyForSong;
};

const yearsAsInt = (years) => years.map((year) => Number(year));
