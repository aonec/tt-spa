import { combine, createEvent, createStore, sample, split } from 'effector';
import { createGate } from 'effector-react';
import {
  dashboardAverageTimeQuery,
  dashboardMalfunctionsQuery,
  dashboardPiperuptersQuery,
  dashboardResourceDisconnectionQuery,
  dashboardSummaryQuery,
} from './currentAnalyticsService.api';
import { DashboardDataType } from './currentAnalyticsService.types';

const CurrentAnalyticsGate = createGate();
const setCurrentDashboardType = createEvent<DashboardDataType>();

const $currentDashboardType = createStore<DashboardDataType>(
  DashboardDataType.PipeRupturesCount,
).on(setCurrentDashboardType, (_, type) => type);

sample({
  clock: CurrentAnalyticsGate.open,
  target: [dashboardSummaryQuery.start],
});

split({
  source: $currentDashboardType,
  clock: [$currentDashboardType.updates, CurrentAnalyticsGate.open],
  match: (type: DashboardDataType) => type,
  cases: {
    [DashboardDataType.PipeRupturesCount]: dashboardPiperuptersQuery.start,
    [DashboardDataType.ResourceDisconnectsCount]:
      dashboardResourceDisconnectionQuery.start,
    [DashboardDataType.MalfunctionsCount]: dashboardMalfunctionsQuery.start,
    [DashboardDataType.AverageCompletionTime]: dashboardAverageTimeQuery.start,
  },
});

const $isLoading = combine(
  dashboardPiperuptersQuery.$pending,
  dashboardResourceDisconnectionQuery.$pending,
  dashboardMalfunctionsQuery.$pending,
  dashboardAverageTimeQuery.$pending,
  (...params) => params.some((value) => value),
);

export const currentAnalyticsService = {
  inputs: { setCurrentDashboardType },
  outputs: { $currentDashboardType, $isLoading },
  gates: { CurrentAnalyticsGate },
};
