import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  DashboardSummaryResponse,
  DashboardTaskMalfunctionResponse,
  DashboardTaskResourceResponse,
} from 'api/types';
import { stringify } from 'query-string';
import { DashboardQueryParams } from '../currentAnalytics/currentAnalyticsService.types';

export const commonSummaryQuery = createQuery<
  [DashboardQueryParams],
  DashboardSummaryResponse
>({
  handler: (params) =>
    axios.get(`/Dashboard/common/summary`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardPiperuptersQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskResourceResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/common/piperuptures`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardMalfunctionsQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskMalfunctionResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/common/malfunctions`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardResourcedisconnectsQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskResourceResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/common/resourcedisconnects`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});
