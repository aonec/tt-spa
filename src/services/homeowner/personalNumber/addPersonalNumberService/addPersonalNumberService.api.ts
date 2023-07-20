import { axios } from 'api/axios';
import { HomeownerAccountCreateRequest } from 'api/types';

export const addHomeowner = (
  reqestPayload: HomeownerAccountCreateRequest,
): Promise<void> => axios.post('HomeownerAccounts', reqestPayload);
