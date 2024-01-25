import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { fetchDownloadDevicesReport } from './devicesReportService.api';
import { DevicesReportPayload } from './devicesReportService.types';
import { displayDevicesService } from '../displayDevicesService';
import { BlobResponseErrorType } from 'types';
import { message } from 'antd';

const openModal = createEvent();
const closeModal = createEvent();
const $isOpen = createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const downloadDeviceReport = createEvent<string>();
const downloadDeviceReportFx = createEffect<
  DevicesReportPayload,
  void,
  BlobResponseErrorType
>(fetchDownloadDevicesReport);

const $isLoading = downloadDeviceReportFx.pending;

sample({
  clock: downloadDeviceReportFx.doneData,
  target: closeModal,
});

sample({
  source: displayDevicesService.outputs.$searchPayload,
  clock: downloadDeviceReport,
  fn: (source, title) => ({ ...source, title }),
  target: downloadDeviceReportFx,
});

downloadDeviceReportFx.failData.watch(async (error) => {
  const jsonData = await error.response.data.text();
  const errObject = JSON.parse(jsonData);

  return message.error(
    errObject.error.Text ||
      errObject.error.Message ||
      'Невозможно выгрузить список',
  );
});

export const devicesReportService = {
  inputs: {
    closeModal,
    openModal,
    downloadDeviceReport,
  },
  outputs: {
    $isOpen,
    $isLoading,
  },
};
