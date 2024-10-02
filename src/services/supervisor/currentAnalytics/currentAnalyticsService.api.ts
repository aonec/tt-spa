import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { DashboardCurrentAnalitycsResponse } from 'api/types';

export const dashboardDataQuery = createQuery<
  void,
  DashboardCurrentAnalitycsResponse[]
>({
  handler: () => axios.get(`/Dashboard/current`),
});
