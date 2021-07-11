import {
  $devicesSearchState,
  $downloadDevicesReportError,
  $isDeviceReportModalVisible,
  downloadDeviceReportCancelButtonClicked,
  downloadDeviceReportConfirmButtonClicked,
  downloadDevicesReportFx,
  searchStateChanged,
  showDownloadDeviceReportButtonClicked,
} from './index';
import { guard, merge } from 'effector';
import { downloadDevicesReport } from '../../../_api/devicesReport';
import { DeviceSearchReducerStateType } from '../../../_pages/Devices/devicesSearchReducer';
import { mapDeviceSearchStateToDownloadQuery } from '../lib/mapDeviceSearchStateToDownloadQuery';

downloadDevicesReportFx.use(downloadDevicesReport);

$devicesSearchState.on(searchStateChanged, (_, searchState) => searchState);

$isDeviceReportModalVisible.on(
  merge([
    showDownloadDeviceReportButtonClicked,
    downloadDeviceReportCancelButtonClicked,
    downloadDevicesReportFx.done,
  ]),
  (x) => !x,
);

guard({
  clock: downloadDeviceReportConfirmButtonClicked,
  filter: (searchState): searchState is Partial<DeviceSearchReducerStateType> =>
    searchState !== null,
  source: $devicesSearchState,
  target: downloadDevicesReportFx.prepend(mapDeviceSearchStateToDownloadQuery),
});

$downloadDevicesReportError
  .on(downloadDevicesReportFx.failData, (_, error) => error.message)
  .reset(downloadDevicesReportFx);
