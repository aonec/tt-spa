import { createEffect, createEvent, createStore } from 'effector';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';

export const $devicesSearchState =
  createStore<Partial<CalculatorsListRequestPayload> | null>(null);

export const searchStateChanged =
  createEvent<Partial<CalculatorsListRequestPayload>>();

export const $isDeviceReportModalVisible = createStore(false);

export const showDownloadDeviceReportButtonClicked = createEvent();

export const downloadDeviceReportConfirmButtonClicked = createEvent();

export const downloadDeviceReportCancelButtonClicked = createEvent();

export const downloadDevicesReportFx = createEffect<
  CalculatorsListRequestPayload | null,
  void
>();

export const $downloadDevicesReportError = createStore<string | null>(null);
