import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { combine, sample } from 'effector';
import { delay, not } from 'patronum';
import { createGate } from 'effector-react';
import dayjs from 'api/dayjs';
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
import { houseManagementsService } from '../houseManagementsService';

const openModal = createEvent();
const closeModal = createEvent();

const $isOpen = createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

const getReportFiltersFx = createEffect<void, GroupReportFormResponse>(
  fetchFilters,
);
const $reportFilters = createStore<GroupReportFormResponse | null>(null).on(
  getReportFiltersFx.doneData,
  (_, filter) => filter,
);

const downloadGroupReportFx = createEffect<
  GroupReportRequestPayload,
  void,
  BlobResponseErrorType
>(downloadGroupReportRequest);

const getGroupReport = createEvent<GroupReportRequestPayload>();
const getGroupReportFx = createEffect<GroupReportRequestPayload, string>(
  fetchGroupReport,
);
const sendByEmailFx = createEffect<
  SendGroupReportRequest,
  void,
  EffectFailDataAxiosError
>(sendByEmail);

const setGroupReportPayload = createEvent<Partial<GroupReportRequestPayload>>();
const $downloadReportPayload = createStore<GroupReportRequestPayload | null>(
  null,
);

const $isFiltersLoading = getReportFiltersFx.pending;
const $isDownloading = combine(
  downloadGroupReportFx.pending,
  getGroupReportFx.pending,
  sendByEmailFx.pending,
  (...isLoading) => isLoading.includes(true),
);

const GroupReportGate = createGate();


sample({
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

sample({
  clock: $downloadReportPayload,
  filter: (payload): payload is GroupReportRequestPayload => {
    const isExist = Boolean(payload);
    const { From, To, ReportType } = payload || {};
    const isNotTooLongDaily =
      ReportType === EReportType.Daily &&
      dayjs(To).diff(dayjs(From), 'day') < MAX_DAILY_TYPE_DAYS;
    const isNotTooLongHourly =
      ReportType === EReportType.Hourly &&
      dayjs(To).diff(dayjs(From), 'day') < MAX_HOURLY_TYPE_DAYS;

    return isExist && (isNotTooLongDaily || isNotTooLongHourly);
  },
  target: downloadGroupReportFx,
});

sample({
  clock: $downloadReportPayload,
  filter: (payload): payload is GroupReportRequestPayload => {
    const isExist = Boolean(payload);
    const { From, To, ReportType } = payload || {};
    const isTooLongDaily =
      ReportType === EReportType.Daily &&
      dayjs(To).diff(dayjs(From), 'day') >= MAX_DAILY_TYPE_DAYS;
    const isTooLongHourly =
      ReportType === EReportType.Hourly &&
      dayjs(To).diff(dayjs(From), 'day') >= MAX_HOURLY_TYPE_DAYS;

    return isExist && (isTooLongDaily || isTooLongHourly);
  },
  target: sendReportToEmailService.inputs.openModal,
});

sample({
  clock: getGroupReport,
  target: getGroupReportFx,
});

sample({
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

const delayedPendingByEmailFx = delay({
  source: sendByEmailFx.pending,
  timeout: 1000,
});

const $isSendByEmailWithError = createStore<boolean>(false)
  .on(sendByEmailFx.failData, (_, err) => Boolean(err))
  .reset([closeModal, sendByEmailFx]);

sample({
  clock: delayedPendingByEmailFx,
  source: $isSendByEmailWithError,
  // filter: (isSendByEmailWithError) => !isSendByEmailWithError, //todo: регулярная выгрузка
  filter: not($isSendByEmailWithError),
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
