import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  DashboardSummaryResponse,
  DashboardTaskResourceResponse,
} from 'api/types';

export const dashboardSummaryQuery = createQuery<
  void,
  DashboardSummaryResponse
>({
  handler: () => axios.get(`/Dashboard/summary`),
});

export const dashboardPiperuptersQuery = createQuery<
  void,
  DashboardTaskResourceResponse[]
>({
  handler: () => axios.get(`/Dashboard/current/piperuptures`),
});
