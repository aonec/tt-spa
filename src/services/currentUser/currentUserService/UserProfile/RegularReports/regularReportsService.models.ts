import { createEffect, createEvent, createStore, sample } from 'effector';
import {
  deleteGroupReportConfiguration,
  getGroupReportConfigurations,
  updateGroupReportConfiguration,
} from './regularReportsService.api';
import { createGate } from 'effector-react';
import {
  GroupReportConfigurationServiceModel,
  UpdateGroupReportConfigurationRequest,
} from 'api/types';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const PageGate = createGate();

const handleDeleteReport = createEvent<number>();

const handleFilterReportData = createEvent<number>();

const handleChangeActivity =
  createEvent<GroupReportConfigurationServiceModel>();

const getGroupReportConfigurationsFx = createEffect<
  void,
  GroupReportConfigurationServiceModel[]
>(getGroupReportConfigurations);

const deleteGroupReportConfigurationFx = createEffect<
  number,
  void,
  EffectFailDataAxiosError
>(deleteGroupReportConfiguration);

const updateGroupReportConfigurationFx = createEffect<
  UpdateGroupReportConfigurationRequest,
  GroupReportConfigurationServiceModel,
  EffectFailDataAxiosError
>(updateGroupReportConfiguration);

const $reportsData = createStore<GroupReportConfigurationServiceModel[] | null>(
  null,
)
  .on(getGroupReportConfigurationsFx.doneData, (_, data) => data)
  .on(handleFilterReportData, (prev, id) =>
    prev?.filter((report) => report.id !== id),
  )
  .on(updateGroupReportConfigurationFx.doneData, (prev, updatedReport) =>
    prev?.map((report) =>
      report.id === updatedReport.id ? updatedReport : report,
    ),
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

sample({
  clock: handleChangeActivity,
  fn: (report) =>
    ({
      report: report.report,
      reportConfigurationDetails: {
        contractorIds: report.reportConfigurationDetails?.contractorIds,
        organizationUserIds:
          report.reportConfigurationDetails?.organizationUserIds,
        initialDate: report.reportConfigurationDetails?.initialDate,
        sendingPeriodType: report.reportConfigurationDetails?.sendingPeriodType,
        nextDate: report.reportConfigurationDetails?.nextDate,
        isActive: !report.reportConfigurationDetails?.isActive,
      },
      id: report.id,
    } as UpdateGroupReportConfigurationRequest),
  target: updateGroupReportConfigurationFx,
});

deleteGroupReportConfigurationFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

updateGroupReportConfigurationFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

const $isReportUpdating = updateGroupReportConfigurationFx.pending;

export const regularReportsService = {
  inputs: { handleDeleteReport, handleChangeActivity },
  outputs: { $reportsData, $isReportUpdating },
  gates: { PageGate },
};
