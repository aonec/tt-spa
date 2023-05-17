import { axios } from '01/axios';
import { HomeownerAccountReplaceRequest } from 'myApi';

export const replaceHomeownerAccount = (
  requestPayload: HomeownerAccountReplaceRequest,
): Promise<void> => axios.post('HomeownerAccounts/Replace', requestPayload);
