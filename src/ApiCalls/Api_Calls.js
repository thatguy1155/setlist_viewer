import axios from 'axios';

export async function initialSearchAPI(searchInfo) {
  const { artist, song } = searchInfo;
  console.log(artist);
  console.log(song);
  let result;
  const URL = `http://localhost:5000/setlist/${artist}/${song}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    result = await axios.get(`${URL}`, config);
    return result.data;
  } catch (error) {
    return error;
  }
}

export async function suggestSearchAPI(searchInfo) {
  const { artist, song } = searchInfo;
  let result;
  const URL = `http://localhost:5000/search/${artist}/${song}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    result = await axios.get(`${URL}`, config);
    return result.data;
  } catch (error) {
    return error;
  }
}
