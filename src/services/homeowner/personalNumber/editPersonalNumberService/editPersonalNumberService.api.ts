import { axios } from 'api/axios';
import { HomeownerAccountCloseRequest } from 'api/types';
import { EditHomeownerRequestPayload } from './editPersonalNumberService.types';

export const putHomeownerAccount = ({
  data,
  id,
  isForced,
}: EditHomeownerRequestPayload): Promise<void> =>
  axios.put(`HomeownerAccounts/${id}`, data, {
    params: { isForced },
  });

export const closeHomeownerAccount = (
  payload: HomeownerAccountCloseRequest,
): Promise<void> => axios.post('HomeownerAccounts/Close', payload);
