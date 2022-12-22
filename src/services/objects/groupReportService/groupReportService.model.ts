import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { GroupReportFormResponse } from 'myApi';
import { fetchFilters, fetchGroupReport } from './groupReportService.api';
import { GroupReportRequestPayload } from './groupReportService.types';

const domain = createDomain('groupReportService');

const openModal = domain.createEvent();
const closeModal = domain.createEvent();

const $isOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

const getReportFiltersFx = domain.createEffect(fetchFilters);
const $reportFilters = domain
  .createStore<GroupReportFormResponse | null>(null)
  .on(getReportFiltersFx.doneData, (_, filter) => filter);

const donwloadGroupReport = domain.createEvent<
  Partial<GroupReportRequestPayload>
>();
const downloadGroupReportFx = domain.createEffect<
  GroupReportRequestPayload,
  void
>(fetchGroupReport);

const $isFiltersLoading = getReportFiltersFx.pending;
const $isDownloading = downloadGroupReportFx.pending;

const GroupReportGate = createGate();

guard({
  clock: donwloadGroupReport,
  filter: (payload): payload is GroupReportRequestPayload =>
    Boolean(
      payload.From &&
        payload.To &&
        payload.Name &&
        payload.HouseManagementId &&
        payload.NodeResourceTypes &&
        payload.ReportType
    ),
  target: downloadGroupReportFx,
});

guard({
  source: $reportFilters,
  clock: GroupReportGate.open,
  filter: (filter) => !Boolean(filter),
  target: getReportFiltersFx,
});

forward({
  from: downloadGroupReportFx.doneData,
  to: closeModal,
});

downloadGroupReportFx.failData.watch(() =>
  message.error('Не удалось скачать отчёт')
);

export const groupReportService = {
  inputs: {
    openModal,
    closeModal,
    donwloadGroupReport,
  },
  outputs: {
    $isOpen,
    $reportFilters,
    $isFiltersLoading,
    $isDownloading,
  },
  gates: {
    GroupReportGate,
  },
};
