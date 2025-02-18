import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { combine, sample } from 'effector';
import { delay } from 'patronum';
import { createGate } from 'effector-react';
import dayjs from 'api/dayjs';
import {
  CreateGroupReportConfigurationRequest,
  EReportType,
  GroupReportFormResponse,
  SendGroupReportRequest,
} from 'api/types';
import {
  downloadGroupReportRequest,
  fetchFilters,
  fetchGroupReport,
  postRegularUpload,
  sendByEmail,
} from './groupReportService.api';
import {
  MAX_DAILY_TYPE_DAYS,
  MAX_HOURLY_TYPE_DAYS,
} from './groupReportService.constants';
import { GroupReportRequestPayload } from './groupReportService.types';
import { sendReportToEmailService } from './sendReportToEmailService';
import { BlobResponseErrorType, EffectFailDataAxiosError } from 'types';

const openModal = createEvent();
const closeModal = createEvent();

const $isOpen = createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

const setRegularUpload = createEvent<boolean>();
const $isRegularUpload = createStore(false).on(
  setRegularUpload,
  (_, data) => data,
);

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

const postRegularUploadFx = createEffect<
  CreateGroupReportConfigurationRequest,
  void,
  EffectFailDataAxiosError
>(postRegularUpload);

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
  filter: $isRegularUpload,
  fn: (clock) => {
    const payload = {
      report: {
        fileName: clock?.FileName,
        buildingIds: clock?.BuildingIds,
        from: clock?.From,
        houseManagementId: clock?.HouseManagementId,
        managementFirmId: clock?.ManagementFirmId,
        nodeResourceTypes: clock?.NodeResourceTypes,
        nodeStatus: clock?.NodeStatus,
        reportFormat: clock?.ReportFormat,
        reportType: clock?.ReportType,
        to: clock?.To,
      },
      reportConfigurationDetails: {
        organizationUserIds: clock?.['Subscription.OrganizationUserIds'],
        contractorIds: clock?.['Subscription.ContractorIds'],
        initialDate: clock?.['Subscription.TriggerAt'],
        reportConfigurationPeriod: clock?.['Subscription.Type'],
        sendingPeriodType: clock?.['Subscription.Type'],
      },
    } as CreateGroupReportConfigurationRequest;

    return payload;
  },
  target: postRegularUploadFx,
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
  filter: (filter) => !filter,
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
  if (isPending) message.info('Отчёт формируется для отправки на почту', 60);
});
sendByEmailFx.doneData.watch(() => {
  message.destroy();
  message.success('Отчёт успешно отправлен на почту');
});

postRegularUploadFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Не удалось создать расписание выгрузок',
  );
});

postRegularUploadFx.doneData.watch(() => {
  message.success('Регулярная выгрузка успешно создана');
});

export const groupReportService = {
  inputs: {
    openModal,
    closeModal,
    setGroupReportPayload,
    getGroupReport,
    setRegularUpload,
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
