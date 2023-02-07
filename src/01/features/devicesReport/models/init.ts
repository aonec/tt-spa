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
import { merge, sample } from 'effector';
import { downloadDevicesReport } from '../../../_api/devicesReport';

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

sample({
  clock: downloadDeviceReportConfirmButtonClicked,
  source: $devicesSearchState,
  target: downloadDevicesReportFx,
});

$downloadDevicesReportError
  .on(downloadDevicesReportFx.failData, (_, error) => error.message)
  .reset(downloadDevicesReportFx);
