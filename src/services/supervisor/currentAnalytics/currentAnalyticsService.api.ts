import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  DashboardSummaryResponse,
  DashboardTaskAverageTimeResponse,
  DashboardTaskMalfunctionResponse,
  DashboardTaskQualityResponse,
  DashboardTaskResourceResponse,
  HouseManagementWithStreetsResponse,
} from 'api/types';
import {
  DashboardQueryParams,
  ManagementFirmsQueryParams,
} from './currentAnalyticsService.types';
import { stringify } from 'query-string';

export const dashboardSummaryQuery = createQuery<
  [DashboardQueryParams],
  DashboardSummaryResponse
>({
  handler: (params) =>
    axios.get(`/Dashboard/summary`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const managementFirmsWithBuildingsQuery = createQuery<
  [ManagementFirmsQueryParams],
  HouseManagementWithStreetsResponse[]
>({
  handler: (params): Promise<HouseManagementWithStreetsResponse[]> =>
    axios.get(`/Dashboard/managementfirms`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardPiperuptersQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskResourceResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/piperuptures`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardResourceDisconnectionQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskResourceResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/resourcedisconnects`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardMalfunctionsQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskMalfunctionResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/malfunctions`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardAverageTimeQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskAverageTimeResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/averagetime`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardServiceQualityQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskQualityResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/servicequality`, {
      params: {
        params,
        paramsSerializer: (params: Record<string, any>) => stringify(params),
      },
    }),
});
