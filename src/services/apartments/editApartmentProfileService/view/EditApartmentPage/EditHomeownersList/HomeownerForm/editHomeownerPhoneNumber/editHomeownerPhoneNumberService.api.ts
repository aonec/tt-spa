import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { HomeownerAccountResponse } from 'api/types';

export const homeownerAccountQuery = createQuery<
  string,
  HomeownerAccountResponse
>({
  handler: (id) => axios.get(`/HomeownerAccounts/${id}`),
});
