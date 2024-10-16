import { createEvent, createStore, sample, split } from 'effector';
import { createGate } from 'effector-react';
import {
  dashboardPiperuptersQuery,
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
  },
});

export const currentAnalyticsService = {
  inputs: { setCurrentDashboardType },
  outputs: { $currentDashboardType },
  gates: { CurrentAnalyticsGate },
};
