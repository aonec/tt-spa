import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  DashboardSummaryResponse,
  DashboardTaskMalfunctionResponse,
  DashboardTaskResourceResponse,
  OrganizationResponsePagedList,
} from 'api/types';
import { stringify } from 'query-string';
import { DashboardQueryParams } from '../currentAnalytics/currentAnalyticsService.types';
import { getDetailSuffix } from './commonAnalyticsService.utils';

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

export const dashboardOrganizationsQuery = createQuery<
  [string | null],
  OrganizationResponsePagedList
>({
  handler: (city) =>
    axios.get(`/Dashboard/filter/organizations`, { params: { city } }),
});

export const dashboardPiperuptersQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskResourceResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/common/piperuptures${getDetailSuffix(params)}`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardMalfunctionsQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskMalfunctionResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/common/malfunctions${getDetailSuffix(params)}`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardResourcedisconnectsQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskResourceResponse[]
>({
  handler: (params) =>
    axios.get(
      `/Dashboard/common/resourcedisconnects${getDetailSuffix(params)}`,
      {
        params,
        paramsSerializer: (params) => stringify(params),
      },
    ),
});
