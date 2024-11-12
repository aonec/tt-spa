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
import { getDetailSuffix } from './currentAnalyticsService.utils';

export const dashboardSummaryQuery = createQuery<
  [DashboardQueryParams],
  DashboardSummaryResponse
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/summary`, {
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
  DashboardTaskResourceResponse | DashboardTaskResourceResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/piperuptures/${getDetailSuffix(params)}`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardResourceDisconnectionQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskResourceResponse | DashboardTaskResourceResponse[]
>({
  handler: (params) =>
    axios.get(
      `/Dashboard/current/resourcedisconnects/${getDetailSuffix(params)}`,
      {
        params,
        paramsSerializer: (params) => stringify(params),
      },
    ),
});

export const dashboardMalfunctionsQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskMalfunctionResponse | DashboardTaskMalfunctionResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/malfunctions/${getDetailSuffix(params)}`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardAverageTimeQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskAverageTimeResponse | DashboardTaskAverageTimeResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/averagetime/${getDetailSuffix(params)}`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});

export const dashboardServiceQualityQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskQualityResponse | DashboardTaskQualityResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/servicequality/${getDetailSuffix(params)}`, {
      params: {
        params,
        paramsSerializer: (params: Record<string, any>) => stringify(params),
      },
    }),
});
