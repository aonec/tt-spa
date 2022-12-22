import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';
import { EReportType, GroupReportFormResponse } from 'myApi';
import {
  downloadGroupReportRequest,
  fetchFilters,
  fetchGroupReport,
} from './groupReportService.api';
import {
  MAX_DAILY_TYPE_DAYS,
  MAX_HOURLY_TYPE_DAYS,
} from './groupReportService.constants';
import { GroupReportRequestPayload } from './groupReportService.types';
import { sendReportToEmailService } from './sendReportToEmailService';

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

const downloadGroupReportFx = domain.createEffect<
  GroupReportRequestPayload,
  void
>(downloadGroupReportRequest);

const getGroupReport = domain.createEvent<GroupReportRequestPayload>();
const getGroupReportFx = domain.createEffect<GroupReportRequestPayload, string>(
  fetchGroupReport
);

const setGroupReportPayload = domain.createEvent<
  Partial<GroupReportRequestPayload>
>();
const $downloadReportPayload = domain.createStore<GroupReportRequestPayload | null>(
  null
);

const $isFiltersLoading = getReportFiltersFx.pending;
const $isDownloading = downloadGroupReportFx.pending;

const GroupReportGate = createGate();

guard({
  clock: setGroupReportPayload,
  filter: (payload): payload is GroupReportRequestPayload =>
    Boolean(
      payload.From &&
        payload.To &&
        payload.Name &&
        payload.HouseManagementId &&
        payload.NodeResourceTypes &&
        payload.ReportType
    ),
  target: $downloadReportPayload,
});

guard({
  clock: $downloadReportPayload,
  filter: (payload): payload is GroupReportRequestPayload => {
    const isExist = Boolean(payload);
    const { From, To, ReportType } = payload || {};
    const isNotTooLongDaily =
      ReportType === EReportType.Daily &&
      moment(To).diff(moment(From), 'day') < MAX_DAILY_TYPE_DAYS;
    const isNotTooLongHourly =
      ReportType === EReportType.Hourly &&
      moment(To).diff(moment(From), 'day') < MAX_HOURLY_TYPE_DAYS;

    return isExist && (isNotTooLongDaily || isNotTooLongHourly);
  },
  target: downloadGroupReportFx,
});

guard({
  clock: $downloadReportPayload,
  filter: (payload): payload is GroupReportRequestPayload => {
    const isExist = Boolean(payload);
    const { From, To, ReportType } = payload || {};
    const isTooLongDaily =
      ReportType === EReportType.Daily &&
      moment(To).diff(moment(From), 'day') >= MAX_DAILY_TYPE_DAYS;
    const isTooLongHourly =
      ReportType === EReportType.Hourly &&
      moment(To).diff(moment(From), 'day') >= MAX_HOURLY_TYPE_DAYS;

    return isExist && (isTooLongDaily || isTooLongHourly);
  },
  target: sendReportToEmailService.inputs.openModal,
});

forward({
  from: getGroupReport,
  to: getGroupReportFx,
});

guard({
  source: $reportFilters,
  clock: GroupReportGate.open,
  filter: (filter) => !Boolean(filter),
  target: getReportFiltersFx,
});

forward({
  from: [downloadGroupReportFx.doneData, getGroupReportFx.doneData],
  to: closeModal,
});

downloadGroupReportFx.failData.watch(() =>
  message.error('Не удалось скачать отчёт')
);

export const groupReportService = {
  inputs: {
    openModal,
    closeModal,
    setGroupReportPayload,
    getGroupReport,
  },
  outputs: {
    $isOpen,
    $reportFilters,
    $isFiltersLoading,
    $isDownloading,
    $downloadReportPayload,
  },
  gates: {
    GroupReportGate,
  },
};
