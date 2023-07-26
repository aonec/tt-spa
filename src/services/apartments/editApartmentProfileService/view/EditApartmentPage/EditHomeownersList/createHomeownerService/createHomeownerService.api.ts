import { axios } from 'api/axios';
import { CreateHomeownerPayload } from './createHomeownerService.types';

export const postHomeownerAccount = ({
  body,
  isForced,
}: CreateHomeownerPayload): Promise<void> =>
  axios.post('HomeownerAccounts', body, {
    params: { isForced },
  });
