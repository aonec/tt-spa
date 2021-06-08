import { createEffect, createEvent, createStore } from 'effector';
import { DeviceSearchReducerStateType } from '../../../_pages/Devices/devicesSearchReducer';
import { RequestDevicesReportQueryType } from '../../../_api/devicesReport';

export const $devicesSearchState = createStore<DeviceSearchReducerStateType | null>(
  null
);

export const searchStateChanged = createEvent<DeviceSearchReducerStateType>();

export const $isDeviceReportModalVisible = createStore(false);

export const showDownloadDeviceReportButtonClicked = createEvent();

export const downloadDeviceReportConfirmButtonClicked = createEvent();

export const downloadDeviceReportCancelButtonClicked = createEvent();

export const downloadDevicesReportFx = createEffect<
  RequestDevicesReportQueryType | undefined,
  File | null
>();
