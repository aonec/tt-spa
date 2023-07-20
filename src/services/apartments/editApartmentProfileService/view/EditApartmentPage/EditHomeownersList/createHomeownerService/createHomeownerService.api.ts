import { axios } from 'api/axios';
import { HomeownerAccountCreateRequest } from 'api/myApi';

export const postHomeownerAccount = (
  payload: HomeownerAccountCreateRequest,
): Promise<void> => axios.post('HomeownerAccounts', payload);
