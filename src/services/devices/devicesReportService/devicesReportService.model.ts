import { createDomain, sample } from 'effector';
import { fetchDownloadDevicesReport } from './devicesReportService.api';
import { DevicesReportPayload } from './devicesReportService.types';
import { displayDevicesService } from '../displayDevicesService';
import { BlobResponseErrorType } from 'types';
import { message } from 'antd';

const domain = createDomain('devicesReportService');

const openModal = domain.createEvent();
const closeModal = domain.createEvent();
const $isOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const downloadDeviceReport = domain.createEvent<string>();
const downloadDeviceReportFx = domain.createEffect<
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
      'Невозможно выгрузить отчёт',
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
