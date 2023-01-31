import { axios } from '01/axios';
import { HomeownerAccountCreateRequest } from 'myApi';

export const postHomeownerAccount = (
  payload: HomeownerAccountCreateRequest
): Promise<void> => axios.post('HomeownerAccounts', payload);
