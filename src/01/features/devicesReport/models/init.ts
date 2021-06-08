import {
  $devicesSearchState,
  $isDeviceReportModalVisible,
  downloadDeviceReportCancelButtonClicked,
  downloadDeviceReportConfirmButtonClicked,
  downloadDevicesReportFx,
  searchStateChanged,
  showDownloadDeviceReportButtonClicked,
} from './index';
import { forward, sample } from 'effector';
import { requestDevicesReport } from '../../../_api/devicesReport';

downloadDevicesReportFx.use(requestDevicesReport);

$devicesSearchState.on(searchStateChanged, (_, searchState) => searchState);

$isDeviceReportModalVisible.on(
  [
    showDownloadDeviceReportButtonClicked,
    downloadDeviceReportCancelButtonClicked,
  ],
  (x) => x!
);

sample({
  source: $devicesSearchState,
  clock: downloadDeviceReportConfirmButtonClicked,
  target: downloadDevicesReportFx,
});
