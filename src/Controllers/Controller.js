import { initialSearchAPI } from '../ApiCalls/Api_Calls';

export const initialSearch = async (searchParams) => {
  const rawResult = await initialSearchAPI(searchParams);
  console.log(rawResult);
  return rawResult;
};

const parseArtistSearch = () => {

};
