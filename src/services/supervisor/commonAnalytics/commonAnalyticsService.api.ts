import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { DashboardSummaryResponse } from 'api/types';
import { stringify } from 'query-string';
import { DashboardQueryParams } from '../currentAnalytics/currentAnalyticsService.types';

export const commonSummaryQuery = createQuery<
  [DashboardQueryParams],
  DashboardSummaryResponse[]
>({
  handler: (params) =>
    axios.get(`/Dashboard/common/summary`, {
      params,
      paramsSerializer: (params) => stringify(params),
    }),
});
