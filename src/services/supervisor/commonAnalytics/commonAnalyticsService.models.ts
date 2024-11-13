import { combine, createEvent, createStore, sample, split } from 'effector';
import { createGate } from 'effector-react';
import {
  DashboardDataType,
  DashboardQueryParams,
} from '../currentAnalytics/currentAnalyticsService.types';
import { managementFirmsWithBuildingsQuery } from '../currentAnalytics/currentAnalyticsService.api';
import { CommonDashboardQueryParams } from './commonAnalyticsService.types';
import {
  commonSummaryQuery,
  dashboardPiperuptersQuery,
} from './commonAnalyticsService.api';
import dayjs from 'dayjs';

const CommonAnalyticsGate = createGate();
const setCurrentDashboardType = createEvent<DashboardDataType>();
const setDashboardFilters = createEvent<DashboardQueryParams>();
const resetDashboardFilters = createEvent();

const $currentDashboardType = createStore<DashboardDataType>(
  DashboardDataType.PipeRupturesCount,
).on(setCurrentDashboardType, (_, type) => type);

const $dashboardFilters = createStore<DashboardQueryParams>({
  From: dayjs().subtract(1, 'week').format(),
  To: dayjs().format(),
})
  .on(setDashboardFilters, (prev, data) => ({ ...prev, ...data }))
  .reset(resetDashboardFilters);

sample({
  source: $dashboardFilters,
  clock: CommonAnalyticsGate.open,
  target: [commonSummaryQuery.start],
});

sample({
  source: $dashboardFilters,
  clock: CommonAnalyticsGate.open,
  target: [dashboardPiperuptersQuery.start],
});

sample({
  source: $dashboardFilters,
  target: [dashboardPiperuptersQuery.start, commonSummaryQuery.start],
});

$dashboardFilters.watch((data) => {
  console.log(data);
});

sample({
  source: {},
  clock: CommonAnalyticsGate.open,
  target: managementFirmsWithBuildingsQuery.start,
});

const $dashboardParams = combine(
  $dashboardFilters,
  $currentDashboardType,
  (params, dashboardType) => ({ ...params, dashboardType }),
);

// split({
//   source: $dashboardParams,
//   clock: [$dashboardParams.updates, CurrentAnalyticsGate.open],
//   match: (data) => data.dashboardType,
//   cases: {
//     [DashboardDataType.PipeRupturesCount]: dashboardPiperuptersQuery.start,
//     [DashboardDataType.ResourceDisconnectsCount]:
//       dashboardResourceDisconnectionQuery.start,
//     [DashboardDataType.MalfunctionsCount]: dashboardMalfunctionsQuery.start,
//     [DashboardDataType.AverageCompletionTime]: dashboardAverageTimeQuery.start,
//     [DashboardDataType.TasksCount]: dashboardServiceQualityQuery.start,
//   },
// });

// const $isLoading = combine(
//   dashboardPiperuptersQuery.$pending,
//   dashboardResourceDisconnectionQuery.$pending,
//   dashboardMalfunctionsQuery.$pending,
//   dashboardAverageTimeQuery.$pending,
//   dashboardServiceQualityQuery.$pending,
//   (...params) => params.some((value) => value),
// );

export const commonAnalyticsService = {
  inputs: {
    setDashboardFilters,
    resetDashboardFilters,
    setCurrentDashboardType,
  },
  outputs: { $dashboardFilters, $currentDashboardType },
  gates: { CommonAnalyticsGate },
};
