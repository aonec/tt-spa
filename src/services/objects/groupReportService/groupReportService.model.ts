import { message } from 'antd';
import { combine, createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';
import {
  EReportType,
  GroupReportFormResponse,
  SendGroupReportRequest,
} from 'api/types';
import {
  downloadGroupReportRequest,
  fetchFilters,
  fetchGroupReport,
  sendByEmail,
} from './groupReportService.api';
import {
  MAX_DAILY_TYPE_DAYS,
  MAX_HOURLY_TYPE_DAYS,
} from './groupReportService.constants';
import { GroupReportRequestPayload } from './groupReportService.types';
import { sendReportToEmailService } from './sendReportToEmailService';
import { BlobResponseErrorType, EffectFailDataAxiosError } from 'types';

const domain = createDomain('groupReportService');

const openModal = domain.createEvent();
const closeModal = domain.createEvent();

const $isOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

const getReportFiltersFx = domain.createEffect<void, GroupReportFormResponse>(
  fetchFilters,
);
const $reportFilters = domain
  .createStore<GroupReportFormResponse | null>(null)
  .on(getReportFiltersFx.doneData, (_, filter) => filter);

const downloadGroupReportFx = domain.createEffect<
  GroupReportRequestPayload,
  void,
  BlobResponseErrorType
>(downloadGroupReportRequest);

const getGroupReport = domain.createEvent<GroupReportRequestPayload>();
const getGroupReportFx = domain.createEffect<GroupReportRequestPayload, string>(
  fetchGroupReport,
);
const sendByEmailFx = domain.createEffect<
  SendGroupReportRequest,
  void,
  EffectFailDataAxiosError
>(sendByEmail);

const setGroupReportPayload =
  domain.createEvent<Partial<GroupReportRequestPayload>>();
const $downloadReportPayload =
  domain.createStore<GroupReportRequestPayload | null>(null);

const $isFiltersLoading = getReportFiltersFx.pending;
const $isDownloading = combine(
  downloadGroupReportFx.pending,
  getGroupReportFx.pending,
  sendByEmailFx.pending,
  (...isLoading) => isLoading.includes(true),
);

const GroupReportGate = createGate();

guard({
  clock: setGroupReportPayload,
  filter: (payload): payload is GroupReportRequestPayload =>
    Boolean(
      payload.From &&
        payload.To &&
        payload.FileName &&
        payload.NodeResourceTypes &&
        payload.ReportType,
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

sample({
  clock: [
    downloadGroupReportFx.doneData,
    getGroupReportFx.doneData,
    sendByEmailFx.doneData,
  ],
  target: closeModal,
});

const delayFx = domain.createEffect<void, void>(
  () => new Promise((resolve) => setTimeout(resolve, 1000)),
);

const $isSendByEmailWithError = domain
  .createStore<boolean>(false)
  .on(sendByEmailFx.failData, (_, err) => Boolean(err))
  .reset(closeModal);

sample({
  clock: sendByEmailFx.pending,
  target: delayFx,
});

sample({
  clock: delayFx.done,
  source: $isSendByEmailWithError,
  filter: (isSendByEmailWithError) => !isSendByEmailWithError,
  target: closeModal,
});

sample({
  clock: sendReportToEmailService.inputs.submitEmail,
  source: combine(
    $downloadReportPayload,
    sendReportToEmailService.outputs.$defaultEmail,
    (payload, DelayedEmailTarget) => {
      if (!payload) {
        return null;
      }
      return {
        email: DelayedEmailTarget,
        report: {
          from: payload.From,
          to: payload.To,
          houseManagementId: payload.HouseManagementId,
          nodeResourceTypes: payload.NodeResourceTypes,
          nodeStatus: payload.NodeStatus,
          reportFormat: payload.ReportFormat,
          reportType: payload.ReportType,
          fileName: payload.FileName,
        },
      } as SendGroupReportRequest;
    },
  ),
  filter: Boolean,
  target: sendByEmailFx,
});

downloadGroupReportFx.failData.watch(async (error) => {
  const jsonData = await error.response.data.text();
  const errObject = JSON.parse(jsonData);

  return message.error(
    errObject.error.Text ||
      errObject.error.Message ||
      'Не удалось выгрузить отчёт',
  );
});

sendByEmailFx.failData.watch((error) => {
  message.destroy();

  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});
sendByEmailFx.pending.watch((isPending) => {
  isPending && message.info('Отчёт формируется для отправки на почту', 60);
});
sendByEmailFx.doneData.watch(() => {
  message.destroy();
  message.success('Отчёт успешно отправлен на почту');
});

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
