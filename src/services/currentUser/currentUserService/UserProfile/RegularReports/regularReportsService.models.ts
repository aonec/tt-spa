import { createEffect, createStore, sample } from 'effector';
import { getCurrentUser } from './regularReportsService.api';
import { createGate } from 'effector-react';
import { GroupReportConfigurationServiceModel } from 'api/types';

const PageGate = createGate();

const getCurrentUserFx = createEffect<
  void,
  GroupReportConfigurationServiceModel[]
>(getCurrentUser);

const $reportsData = createStore<GroupReportConfigurationServiceModel[] | null>(
  null,
).on(getCurrentUserFx.doneData, (_, data) => data);

sample({ clock: PageGate.open, target: getCurrentUserFx });

export const regularReportsService = {
  inputs: {},
  outputs: { $reportsData },
  gates: { PageGate },
};
