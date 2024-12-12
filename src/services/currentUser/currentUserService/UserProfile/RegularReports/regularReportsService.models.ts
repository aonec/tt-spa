import { createEffect, createEvent, createStore, sample } from 'effector';
import {
  deleteGroupReportConfiguration,
  getGroupReportConfigurations,
} from './regularReportsService.api';
import { createGate } from 'effector-react';
import { GroupReportConfigurationServiceModel } from 'api/types';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const PageGate = createGate();

const handleDeleteReport = createEvent<number>();

const handleFilterReportData = createEvent<number>();

const getGroupReportConfigurationsFx = createEffect<
  void,
  GroupReportConfigurationServiceModel[]
>(getGroupReportConfigurations);

const deleteGroupReportConfigurationFx = createEffect<
  number,
  void,
  EffectFailDataAxiosError
>(deleteGroupReportConfiguration);

const $reportsData = createStore<GroupReportConfigurationServiceModel[] | null>(
  null,
)
  .on(getGroupReportConfigurationsFx.doneData, (_, data) => data)
  .on(handleFilterReportData, (prev, id) =>
    prev?.filter((report) => report.id !== id),
  );

const $deletingReportId = createStore<number | null>(null)
  .on(handleDeleteReport, (_, id) => id)
  .reset(handleFilterReportData);

sample({ clock: PageGate.open, target: getGroupReportConfigurationsFx });

sample({ clock: handleDeleteReport, target: deleteGroupReportConfigurationFx });

sample({
  clock: deleteGroupReportConfigurationFx.doneData,
  source: $deletingReportId,
  filter: Boolean,
  target: handleFilterReportData,
});

deleteGroupReportConfigurationFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const regularReportsService = {
  inputs: { handleDeleteReport },
  outputs: { $reportsData },
  gates: { PageGate },
};
