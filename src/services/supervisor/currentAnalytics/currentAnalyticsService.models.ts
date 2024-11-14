import { combine, createEvent, createStore, sample, split } from 'effector';
import { createGate } from 'effector-react';
import {
  dashboardAverageTimeQuery,
  dashboardMalfunctionsQuery,
  dashboardPiperuptersQuery,
  dashboardResourceDisconnectionQuery,
  dashboardServiceQualityQuery,
  dashboardSummaryQuery,
} from './currentAnalyticsService.api';
import {
  DashboardDataType,
  DashboardQueryParams,
} from './currentAnalyticsService.types';
import dayjs from 'dayjs';

const CurrentAnalyticsGate = createGate();
const setCurrentDashboardType = createEvent<DashboardDataType>();
const setDashboardFilters = createEvent<DashboardQueryParams>();
const resetDashboardFilters = createEvent();

const $currentDashboardType = createStore<DashboardDataType>(
  DashboardDataType.PipeRupturesCount,
).on(setCurrentDashboardType, (_, type) => type);

const $dashboardFilters = createStore<DashboardQueryParams>({
  From: dayjs().startOf('day').utc(true).toISOString(),
  To: dayjs().endOf('day').utc(true).toISOString(),
})
  .on(setDashboardFilters, (prev, data) => ({ ...prev, ...data }))
  .reset(resetDashboardFilters);

const $dashboardParams = combine(
  $dashboardFilters,
  $currentDashboardType,
  (params, dashboardType) => ({ ...params, dashboardType }),
);

sample({
  source: $dashboardFilters,
  clock: [CurrentAnalyticsGate.open, $dashboardFilters.updates],
  target: [dashboardSummaryQuery.start],
});

split({
  source: $dashboardParams,
  clock: [$dashboardParams.updates, CurrentAnalyticsGate.open],
  match: (data) => data.dashboardType,
  cases: {
    [DashboardDataType.PipeRupturesCount]: dashboardPiperuptersQuery.start,
    [DashboardDataType.ResourceDisconnectsCount]:
      dashboardResourceDisconnectionQuery.start,
    [DashboardDataType.MalfunctionsCount]: dashboardMalfunctionsQuery.start,
    [DashboardDataType.AverageCompletionTime]: dashboardAverageTimeQuery.start,
    [DashboardDataType.TasksCount]: dashboardServiceQualityQuery.start,
  },
});

const $isLoading = combine(
  dashboardPiperuptersQuery.$pending,
  dashboardResourceDisconnectionQuery.$pending,
  dashboardMalfunctionsQuery.$pending,
  dashboardAverageTimeQuery.$pending,
  dashboardServiceQualityQuery.$pending,
  (...params) => params.some((value) => value),
);

export const currentAnalyticsService = {
  inputs: {
    setCurrentDashboardType,
    setDashboardFilters,
    resetDashboardFilters,
  },
  outputs: { $currentDashboardType, $isLoading, $dashboardFilters },
  gates: { CurrentAnalyticsGate },
};
