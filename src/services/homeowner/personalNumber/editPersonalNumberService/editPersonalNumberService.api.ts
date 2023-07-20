import { axios } from 'api/axios';
import {
  HomeownerAccountCloseRequest,
  HomeownerAccountUpdateRequest,
} from 'myApi';

export const putHomeownerAccount = ({
  id,
  data,
}: {
  id: string;
  data: HomeownerAccountUpdateRequest;
}): Promise<void> => axios.put(`HomeownerAccounts/${id}`, data);

export const closeHomeownerAccount = (
  payload: HomeownerAccountCloseRequest,
): Promise<void> => axios.post('HomeownerAccounts/Close', payload);
