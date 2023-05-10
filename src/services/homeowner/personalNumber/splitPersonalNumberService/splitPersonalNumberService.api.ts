import { axios } from '01/axios';
import { HomeownerAccountSplitRequest } from 'myApi';

export const splitHomeownerAccount = (payload: {
  data: HomeownerAccountSplitRequest;
  isForced?: boolean;
}): Promise<void> =>
  axios.post(
    `HomeownerAccounts/Split?isForced=${payload.isForced || false}`,
    payload.data,
  );
