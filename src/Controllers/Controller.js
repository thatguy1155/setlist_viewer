import { initialSearchAPI, suggestSearchAPI } from '../ApiCalls/Api_Calls';

export const initialSearch = async (searchParams) => {
  const rawResult = await initialSearchAPI(searchParams);
  console.log(rawResult);
  return rawResult;
};

export const suggestSearch = async (searchParams) => {
  const result = await suggestSearchAPI(searchParams);
  return result;
};
