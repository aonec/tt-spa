import { axios } from 'api/axios';
import { HomeownerAccountCloseRequest } from 'api/types';

export const postCloseHomeownerApartment = (
  payload: HomeownerAccountCloseRequest,
): Promise<void> => axios.post(`HomeownerAccounts/Close`, payload);
