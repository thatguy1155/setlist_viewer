// functions for updating the tally
export const yearsUpdated = ({ oldYearObject, newYearObject }) => {
  const oldFirstSong = oldYearObject[0];
  const oldFirstSongName = Object.keys(oldFirstSong)[0];
  const oldFirstSongDates = oldFirstSong[oldFirstSongName];
  const newFirstSong = newYearObject[0];
  const newFirstSongName = Object.keys(newFirstSong)[0];
  const newFirstSongDates = newFirstSong[newFirstSongName];
  return Object.keys(newFirstSongDates).length !== Object.keys(oldFirstSongDates).length;
};
