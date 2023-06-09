import { axios } from '01/axios';
import { HomeownerAccountResponse } from 'myApi';

export const getHomeownerAccount = (
  id: string,
): Promise<HomeownerAccountResponse> => axios.get(`HomeownerAccounts/${id}`);
