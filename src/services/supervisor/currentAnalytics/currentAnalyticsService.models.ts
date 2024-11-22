import { combine, createEvent, createStore, sample, split } from 'effector';
import { createGate } from 'effector-react';
import {
  dashboardAverageTimeQuery,
  dashboardMalfunctionsQuery,
  dashboardOrganizationsQuery,
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
  .on(setCurrentDashboardType, (prev) => ({
    ...prev,
    ResourceType: null,
    DeviationType: null,
    MalfunctionType: null,
  }))
  .reset(resetDashboardFilters);

const $dashboardParams = combine(
  $dashboardFilters,
  $currentDashboardType,
  (params, dashboardType) => ({ ...params, dashboardType }),
);

const setPeriodType = createEvent<'today' | 'period'>();

const $periodType = createStore<'today' | 'period'>('today').on(
  setPeriodType,
  (_, type) => type,
);

sample({
  clock: $periodType.updates,
  fn: (type) => {
    if (type === 'today') {
      return {
        From: dayjs().startOf('day').utc(true).toISOString(),
        To: dayjs().endOf('day').utc(true).toISOString(),
      };
    } else {
      return {
        From: dayjs().subtract(7, 'day').startOf('day').utc(true).toISOString(),
        To: dayjs().subtract(1, 'day').endOf('day').utc(true).toISOString(),
      };
    }
  },
  target: setDashboardFilters,
});

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

const $city = $dashboardFilters.map(({ City }) => City || null);

sample({
  source: $city,
  clock: [CurrentAnalyticsGate.open, $city.updates],
  target: dashboardOrganizationsQuery.start,
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
    setPeriodType,
  },
  outputs: {
    $currentDashboardType,
    $isLoading,
    $dashboardFilters,
    $periodType,
  },
  gates: { CurrentAnalyticsGate },
};
