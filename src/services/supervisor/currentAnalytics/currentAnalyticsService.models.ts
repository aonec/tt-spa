import { sample } from 'effector';
import { createGate } from 'effector-react';
import { dashboardDataQuery } from './currentAnalyticsService.api';

const CurrentAnalyticsGate = createGate();

sample({ clock: CurrentAnalyticsGate.open, target: dashboardDataQuery.start });

export const currentAnalyticsService = {
  inputs: {},
  outputs: {},
  gates: { CurrentAnalyticsGate },
};
