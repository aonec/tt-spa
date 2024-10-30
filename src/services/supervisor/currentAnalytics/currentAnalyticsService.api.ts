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

export const dashboardSummaryQuery = createQuery<
  [void],
  DashboardSummaryResponse
>({
  handler: () => axios.get(`/Dashboard/summary`),
});

export const managementFirmsWithObjectsQuery = createQuery<
  [void],
  HouseManagementWithStreetsResponse[]
>({
  handler: (): Promise<HouseManagementWithStreetsResponse[]> =>
    axios.get(`/Dashboard/managementfirms`),
});

export const dashboardPiperuptersQuery = createQuery<
  [void],
  DashboardTaskResourceResponse[]
>({
  handler: () => axios.get(`/Dashboard/current/piperuptures`),
});

export const dashboardResourceDisconnectionQuery = createQuery<
  [void],
  DashboardTaskResourceResponse[]
>({
  handler: () => axios.get(`/Dashboard/current/resourcedisconnects`),
});

export const dashboardMalfunctionsQuery = createQuery<
  [void],
  DashboardTaskMalfunctionResponse[]
>({
  handler: () => axios.get(`/Dashboard/current/malfunctions`),
});

export const dashboardAverageTimeQuery = createQuery<
  [void],
  DashboardTaskAverageTimeResponse[]
>({
  handler: () => axios.get(`/Dashboard/current/averagetime`),
});

export const dashboardServiceQualityQuery = createQuery<
  [void],
  DashboardTaskQualityResponse[]
>({
  handler: () =>
    axios.get(`/Dashboard/current/servicequality`, {
      params: { isTest: true },
    }),
});
