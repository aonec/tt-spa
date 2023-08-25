import { axios } from 'api/axios';
import { HomeownerAccountResponse } from 'api/types';

export const getHomeownerAccount = (
  id: string,
): Promise<HomeownerAccountResponse> => axios.get(`HomeownerAccounts/${id}`);
