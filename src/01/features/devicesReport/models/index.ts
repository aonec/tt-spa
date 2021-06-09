import { createEffect, createEvent, createStore } from 'effector';
import { DeviceSearchReducerStateType } from '../../../_pages/Devices/devicesSearchReducer';
import { RequestDevicesReportQueryType } from '../../../_api/devicesReport';

export const $devicesSearchState = createStore<Partial<DeviceSearchReducerStateType> | null>(
  null
);

// searchTerm: string;
// expirationDate: string;
// diameterRange: [number, number];
// destination: 'Descending' | 'Ascending';
// rule: 'FutureCheckingDate' | 'Street';

export const mapDeviceSearchStateToDownloadQuery = (
  searchState: Partial<DeviceSearchReducerStateType>
): RequestDevicesReportQueryType => {
  const {
    searchTerm,
    expirationDate,
    diameterRange,
    destination,
    rule,
  } = searchState;

  return {
    ...(searchTerm ? { Question: searchTerm } : {}),
    ...(expirationDate
      ? { 'Filter.ExpiresCheckingDateAt': expirationDate }
      : {}),
    ...(diameterRange && diameterRange[0]
      ? { 'Filter.DiameterRange.From': diameterRange[0] }
      : {}),
    ...(diameterRange && diameterRange[1]
      ? { 'Filter.DiameterRange.To': diameterRange[1] }
      : {}),
    ...(destination ? { OrderBy: destination } : {}),
    ...(rule ? { OrderRule: rule } : {}),
  };
};

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

// const reportName = `Сводный_отчёт_${street}_${number}.xlsx`;
