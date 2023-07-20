import { axios } from 'api/axios';
import { HomeownerAccountCloseRequest } from 'api/myApi';

export const postCloseHomeownerApartment = (
  payload: HomeownerAccountCloseRequest,
): Promise<void> => axios.post(`HomeownerAccounts/Close`, payload);
