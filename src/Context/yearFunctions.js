export const getYearRange = ({ minYear, maxYear, newSongYears }) => {
  const lastYearForThisSong = Math.max(...newSongYears);
  const firstYearForThisSong = Math.min(...newSongYears);
  const min = minYear === 0 || firstYearForThisSong < minYear ? firstYearForThisSong : minYear;
  const max = lastYearForThisSong > maxYear ? lastYearForThisSong : maxYear;
  return { min, max };
};

export const addEmptyYears = ({ years, song }) => {
  const paddedSong = song;
  years.forEach((year) => {
    const playCountForYear = song.byYear[year];
    if (!playCountForYear) paddedSong.byYear[year] = 0;
  });
  return paddedSong;
};
