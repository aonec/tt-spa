import { axios } from 'api/axios';
import { EditHomeownerRequestPayload } from './editHomeownerService.types';

export const putHomeowner = ({
  id,
  isForced,
  body,
}: EditHomeownerRequestPayload): Promise<void> =>
  axios.put(`/HomeownerAccounts/${id}`, body, {
    params: { isForced },
  });
