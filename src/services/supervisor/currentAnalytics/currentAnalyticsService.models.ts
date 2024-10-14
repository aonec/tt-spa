import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { dashboardSummaryQuery } from './currentAnalyticsService.api';
import { DashboardDataType } from './currentAnalyticsService.types';

const CurrentAnalyticsGate = createGate();
const setCurrentDashboardType = createEvent<DashboardDataType>();

const $currentDashboardType = createStore<DashboardDataType>(
  DashboardDataType.PipeRupturesCount,
).on(setCurrentDashboardType, (_, type) => type);

sample({
  clock: CurrentAnalyticsGate.open,
  target: dashboardSummaryQuery.start,
});

export const currentAnalyticsService = {
  inputs: { setCurrentDashboardType },
  outputs: { $currentDashboardType },
  gates: { CurrentAnalyticsGate },
};
