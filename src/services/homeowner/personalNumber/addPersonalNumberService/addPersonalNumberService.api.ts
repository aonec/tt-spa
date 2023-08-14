import { axios } from 'api/axios';
import { AddHomeownerRequestPayload } from './addPersonalNumberService.types';

export const addHomeowner = (
  requestPayload: AddHomeownerRequestPayload,
): Promise<void> =>
  axios.post('HomeownerAccounts', requestPayload.body, {
    params: { isForced: requestPayload.isForced },
  });
