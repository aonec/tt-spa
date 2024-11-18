import { combine, createEvent, createStore, sample, split } from 'effector';
import { createGate } from 'effector-react';
import {
  DashboardDataType,
  DashboardQueryParams,
} from '../currentAnalytics/currentAnalyticsService.types';
import {
  commonSummaryQuery,
  dashboardMalfunctionsQuery,
  dashboardPiperuptersQuery,
  dashboardResourcedisconnectsQuery,
} from './commonAnalyticsService.api';
import dayjs from 'dayjs';
import {
  DashboardTaskMalfunctionResponse,
  DashboardTaskResourceResponse,
} from 'api/types';

const CommonAnalyticsGate = createGate();
const setCurrentDashboardType = createEvent<DashboardDataType>();
const setDashboardFilters = createEvent<DashboardQueryParams>();
const resetDashboardFilters = createEvent();

const $currentDashboardType = createStore<DashboardDataType>(
  DashboardDataType.PipeRupturesCount,
).on(setCurrentDashboardType, (_, type) => type);

const $dashboardFilters = createStore<DashboardQueryParams>({
  From: dayjs().subtract(1, 'week').startOf('day').utc(true).toISOString(),
  To: dayjs().endOf('day').utc(true).toISOString(),
})
  .on(setDashboardFilters, (prev, data) => ({
    ...prev,
    ...data,
    From: data.From,
  }))
  .reset(resetDashboardFilters);

sample({ clock: CommonAnalyticsGate.close, target: resetDashboardFilters });

sample({
  source: $dashboardFilters,
  clock: CommonAnalyticsGate.open,
  target: [commonSummaryQuery.start],
});

sample({
  source: $dashboardFilters,
  target: [commonSummaryQuery.start],
});

const $dashboardParams = combine(
  $dashboardFilters,
  $currentDashboardType,
  (params, dashboardType) => ({ ...params, dashboardType }),
);

split({
  source: $dashboardParams,
  clock: [$dashboardParams.updates, CommonAnalyticsGate.open],
  match: (data) => data.dashboardType,
  cases: {
    [DashboardDataType.PipeRupturesCount]: dashboardPiperuptersQuery.start,
    [DashboardDataType.ResourceDisconnectsCount]:
      dashboardResourcedisconnectsQuery.start,
    [DashboardDataType.MalfunctionsCount]: dashboardMalfunctionsQuery.start,
  },
});

const $isLoading = combine(
  dashboardPiperuptersQuery.$pending,
  dashboardResourcedisconnectsQuery.$pending,
  dashboardMalfunctionsQuery.$pending,
  (...params) => params.some((value) => value),
);

const $analyticsData = createStore<
  DashboardTaskResourceResponse[] | DashboardTaskMalfunctionResponse[] | null
>(null)
  .on(dashboardPiperuptersQuery.$data, (_, data) => data)
  .on(dashboardResourcedisconnectsQuery.$data, (_, data) => data)
  .on(dashboardMalfunctionsQuery.$data, (_, data) => data);

export const commonAnalyticsService = {
  inputs: {
    setDashboardFilters,
    resetDashboardFilters,
    setCurrentDashboardType,
  },
  outputs: {
    $dashboardFilters,
    $currentDashboardType,
    $isLoading,
    $analyticsData,
  },
  gates: { CommonAnalyticsGate },
};
