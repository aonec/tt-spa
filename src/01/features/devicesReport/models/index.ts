import { createEffect, createEvent, createStore } from 'effector';
import { DeviceSearchReducerStateType } from '../../../_pages/Devices/devicesSearchReducer';
import { RequestDevicesReportQueryType } from '../../../_api/devicesReport';

export const $devicesSearchState = createStore<Partial<DeviceSearchReducerStateType> | null>(
  null
);

export const searchStateChanged = createEvent<
  Partial<DeviceSearchReducerStateType>
>();

export const $isDeviceReportModalVisible = createStore(false);

export const showDownloadDeviceReportButtonClicked = createEvent();

export const downloadDeviceReportConfirmButtonClicked = createEvent();

export const downloadDeviceReportCancelButtonClicked = createEvent();

export const downloadDevicesReportFx = createEffect<
  RequestDevicesReportQueryType,
  void
>();

export const $downloadDevicesReportError = createStore<string | null>(null);
