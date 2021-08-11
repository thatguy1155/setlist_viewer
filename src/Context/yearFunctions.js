import { range } from './auxFunctions';

export const getYearRange = (songs) => {
  const allYears = songs.flatMap((song) => song.allYears);
  const lastYear = Math.max(...allYears);
  const firstYear = Math.min(...allYears);
  const years = range(firstYear, lastYear, 1);
  return years;
};

export const addEmptyYears = ({ years, song }) => {
  const paddedSong = song;
  years.forEach((year) => {
    const playCountForYear = song.byYear[year];
    if (!playCountForYear) paddedSong.byYear[year] = 0;
  });
  return paddedSong;
};
