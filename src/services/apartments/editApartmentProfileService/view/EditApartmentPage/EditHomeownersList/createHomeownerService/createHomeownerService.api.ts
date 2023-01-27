import { axios } from '01/axios';
import { HomeownerAccountCreateServiceModel } from 'myApi';

export const postHomeownerAccount = (
  payload: HomeownerAccountCreateServiceModel,
): Promise<void> => axios.post('HomeownerAccounts', payload);
