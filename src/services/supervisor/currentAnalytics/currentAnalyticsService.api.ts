import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  DashboardSummaryResponse,
  DashboardTaskMalfunctionResponse,
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

export const dashboardResourceDisconnectionQuery = createQuery<
  void,
  DashboardTaskResourceResponse[]
>({
  handler: () => axios.get(`/Dashboard/current/resourcedisconnects`),
});

export const dashboardMalfunctionsQuery = createQuery<
  void,
  DashboardTaskMalfunctionResponse[]
>({
  handler: () => axios.get(`/Dashboard/current/malfunctions`),
});
