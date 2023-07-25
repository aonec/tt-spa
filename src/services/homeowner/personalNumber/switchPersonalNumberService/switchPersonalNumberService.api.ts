import { axios } from 'api/axios';
import { HomeownerAccountReplaceRequest } from 'api/types';

export const replaceHomeownerAccount = (
  requestPayload: HomeownerAccountReplaceRequest,
): Promise<void> => axios.post('HomeownerAccounts/Replace', requestPayload);
