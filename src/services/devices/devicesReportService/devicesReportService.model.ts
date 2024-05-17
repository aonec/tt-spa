import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { fetchDownloadDevicesReport } from './devicesReportService.api';
import { DevicesReportPayload } from './devicesReportService.types';
import { displayDevicesService } from '../displayDevicesService';
import { BlobResponseErrorType } from 'types';
import { message } from 'antd';
import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';

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
  fn: (source, title) => {
    const preparedPayload: CalculatorsListRequestPayload = {
      'Filter.PipeDiameters': source['DevicesFilter.PipeDiameters'],
      'Filter.ExpiresCheckingDateAt':
        source['DevicesFilter.ExpiresCheckingDateAt'],
      'Filter.ExpiresAdmissionActDateAt': source.ExpiresAdmissionActDateAt,
      'Filter.Resource': source.Resource,
      'Filter.Model': source['DevicesFilter.Model'],
      'Filter.CommercialDateRange.From': source['CommercialDateRange.From'],
      'Filter.CommercialDateRange.To': source['CommercialDateRange.To'],
      'Filter.Address.City': source['Address.City'],
      'Filter.Address.Street': source['Address.Street'],
      'Filter.Address.HousingStockNumber': source['Address.HousingStockNumber'],
      'Filter.Address.Corpus': source['Address.Corpus'],
      'Filter.Address.HouseCategory': source['Address.HouseCategory'],
      'Filter.HousingStockId': source.BuildingId,
      'Filter.NodeStatus': source.CommercialStatus,
      'Filter.NodeRegistrationType': source.RegistrationType,
      Question: source['DevicesFilter.Question'],
      IsConnected: source.IsConnected,
      PageNumber: source.PageNumber,
      PageSize: source.PageSize,
      OrderBy: source.OrderBy,
      Skip: source.Skip,
      Take: source.Take,
    };

    return { ...preparedPayload, title };
  },
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
