import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  DashboardSummaryResponse,
  DashboardTaskAverageTimeResponse,
  DashboardTaskMalfunctionResponse,
  DashboardTaskQualityResponse,
  DashboardTaskResourceResponse,
  OrganizationResponsePagedList,
} from 'api/types';
import { DashboardQueryParams } from './currentAnalyticsService.types';
import queryString from 'query-string';
import { getDetailSuffix } from './currentAnalyticsService.utils';

export const dashboardOrganizationsQuery = createQuery<
  [string | null],
  OrganizationResponsePagedList
>({
  handler: (city) =>
    axios.get(`/Dashboard/filter/organizations`, { params: { city } }),
});

export const dashboardSummaryQuery = createQuery<
  [DashboardQueryParams],
  DashboardSummaryResponse
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/summary`, {
      params,
      paramsSerializer: (params) => queryString.stringify(params),
    }),
});

export const dashboardPiperuptersQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskResourceResponse | DashboardTaskResourceResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/piperuptures/${getDetailSuffix(params)}`, {
      params,
      paramsSerializer: (params) => queryString.stringify(params),
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
        paramsSerializer: (params) => queryString.stringify(params),
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
      paramsSerializer: (params) => queryString.stringify(params),
    }),
});

export const dashboardAverageTimeQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskAverageTimeResponse | DashboardTaskAverageTimeResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/averagetime/${getDetailSuffix(params)}`, {
      params,
      paramsSerializer: (params) => queryString.stringify(params),
    }),
});

export const dashboardServiceQualityQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskQualityResponse | DashboardTaskQualityResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/servicequality/${getDetailSuffix(params)}`, {
      params,
      paramsSerializer: (params) => queryString.stringify(params),
    }),
});
