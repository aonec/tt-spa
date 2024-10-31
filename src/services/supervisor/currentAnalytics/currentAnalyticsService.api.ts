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

export const dashboardSummaryQuery = createQuery<
  [DashboardQueryParams],
  DashboardSummaryResponse
>({
  handler: (params) => axios.get(`/Dashboard/summary`, { params }),
});

export const managementFirmsWithBuildingsQuery = createQuery<
  [ManagementFirmsQueryParams],
  HouseManagementWithStreetsResponse[]
>({
  handler: (params): Promise<HouseManagementWithStreetsResponse[]> =>
    axios.get(`/Dashboard/managementfirms`, { params }),
});

export const dashboardPiperuptersQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskResourceResponse[]
>({
  handler: (params) => axios.get(`/Dashboard/current/piperuptures`, { params }),
});

export const dashboardResourceDisconnectionQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskResourceResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/resourcedisconnects`, { params }),
});

export const dashboardMalfunctionsQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskMalfunctionResponse[]
>({
  handler: (params) => axios.get(`/Dashboard/current/malfunctions`, { params }),
});

export const dashboardAverageTimeQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskAverageTimeResponse[]
>({
  handler: (params) => axios.get(`/Dashboard/current/averagetime`, { params }),
});

export const dashboardServiceQualityQuery = createQuery<
  [DashboardQueryParams],
  DashboardTaskQualityResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/current/servicequality`, {
      params: { params },
    }),
});
