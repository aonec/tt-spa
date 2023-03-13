import { createDomain, sample } from 'effector';
import { fetchDownloadHeatIndividualDeviceReport } from './heatIndividualDevicesReportService.api';
import { HeatIndividualDevicesReportPayload } from './heatIndividualDevicesReportService.types';

const domain = createDomain('heatIndividualDevicesReportService');

const openModal = domain.createEvent();
const closeModal = domain.createEvent();
const $isOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const downloadReportFx = domain.createEffect<
  HeatIndividualDevicesReportPayload,
  void
>(fetchDownloadHeatIndividualDeviceReport);
const downloadReport = domain.createEvent<HeatIndividualDevicesReportPayload>();

sample({
  clock: downloadReport,
  target: downloadReportFx,
});

export const heatIndividualDevicesReportService = {
  inputs: { closeModal, openModal, downloadReport },
  outputs: {
    $isOpen,
  },
};
