import axios from 'axios';

export async function artistSearchAPI(artist) {
  let result;
  const URL = `http://localhost:5000/artist/${artist}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'Gf5newwj79B-Tfo0c1T8W2uxgAZnlurXS6Hs',
    },
  };
  try {
    result = await axios.get(`${URL}`, config);
    return result.data;
  } catch (error) {
    return error;
  }
}

export async function initialSearchAPI(searchInfo) {
  const { artist, song } = searchInfo;
  console.log(artist);
  console.log(song);
  let result;
  const URL = `http://localhost:5000/setlist/${artist}/${song}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'Gf5newwj79B-Tfo0c1T8W2uxgAZnlurXS6Hs',
    },
  };
  try {
    result = await axios.get(`${URL}`, config);
    return result.data;
  } catch (error) {
    return error;
  }
}
