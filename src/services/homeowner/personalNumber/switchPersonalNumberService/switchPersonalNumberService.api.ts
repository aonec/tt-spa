import { axios } from 'api/axios';
import { HomeownerAccountReplaceRequest } from 'api/myApi';

export const replaceHomeownerAccount = (
  requestPayload: HomeownerAccountReplaceRequest,
): Promise<void> => axios.post('HomeownerAccounts/Replace', requestPayload);
