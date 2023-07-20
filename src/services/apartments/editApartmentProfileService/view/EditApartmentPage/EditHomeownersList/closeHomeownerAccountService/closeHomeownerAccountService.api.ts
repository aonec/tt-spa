import { axios } from 'api/axios';
import { HomeownerAccountCloseRequest } from 'myApi';

export const postCloseHomeownerApartment = (
  payload: HomeownerAccountCloseRequest,
): Promise<void> => axios.post(`HomeownerAccounts/Close`, payload);
