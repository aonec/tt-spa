import { axios } from 'api/axios';
import { HomeownerAccountCreateRequest } from 'myApi';

export const addHomeowner = (
  reqestPayload: HomeownerAccountCreateRequest,
): Promise<void> => axios.post('HomeownerAccounts', reqestPayload);
