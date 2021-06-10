import { createEffect, createEvent, createStore } from 'effector';
import { DeviceSearchReducerStateType } from '../../../_pages/Devices/devicesSearchReducer';
import { RequestDevicesReportQueryType } from '../../../_api/devicesReport';

export const $devicesSearchState = createStore<Partial<DeviceSearchReducerStateType> | null>(
  null
);

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

  const formDiameterParams = (diameters: [number, number] | undefined) => {
    if (!diameters || (diameters[0] === 0 && diameters[1] === 255)) return {};
    return {
      'Filter.DiameterRange.From': diameters[0],
      'Filter.DiameterRange.To': diameters[1],
    };
  };

  return {
    ...(searchTerm ? { Question: searchTerm } : {}),
    ...(expirationDate
      ? { 'Filter.ExpiresCheckingDateAt': expirationDate }
      : {}),
    ...formDiameterParams(diameterRange),
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
