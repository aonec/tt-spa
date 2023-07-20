import { axios } from 'api/axios';
import { HomeownerAccountReplaceRequest } from 'myApi';

export const replaceHomeownerAccount = (
  requestPayload: HomeownerAccountReplaceRequest,
): Promise<void> => axios.post('HomeownerAccounts/Replace', requestPayload);
