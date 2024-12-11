import { createEffect, createStore, sample } from 'effector';
import { getCurrentUser } from './regularReportsService.api';
import { createGate } from 'effector-react';
import { RegularReportItem } from './regularReportsService.types';

const PageGate = createGate();

const getCurrentUserFx = createEffect<void, RegularReportItem[]>(getCurrentUser);

const $reportsData = createStore<RegularReportItem[] | null>(null).on(
  getCurrentUserFx.doneData,
  (_, data) => data,
);

sample({ clock: PageGate.open, target: getCurrentUserFx });

export const regularReportsService = {
  inputs: {},
  outputs: { $reportsData },
  gates: { PageGate },
};
