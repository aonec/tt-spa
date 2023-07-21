import { axios } from 'api/axios';
import { EditHomeownerRequestPayload } from './editHomeownerService.types';

export const putHomeowner = ({
  id,
  ...payload
}: EditHomeownerRequestPayload): Promise<void> =>
  axios.put(`/HomeownerAccounts/${id}`, payload);
