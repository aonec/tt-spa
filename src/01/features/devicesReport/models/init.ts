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
// import { mapDeviceSearchStateToDownloadQuery } from '../lib/mapDeviceSearchStateToDownloadQuery';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculators/types';

downloadDevicesReportFx.use(downloadDevicesReport);

$devicesSearchState.on(searchStateChanged, (_, searchState) => searchState);
$devicesSearchState.watch(console.log)
searchStateChanged.watch(console.log)
showDownloadDeviceReportButtonClicked.watch(console.log)

$isDeviceReportModalVisible.on(
  merge([
    showDownloadDeviceReportButtonClicked,
    downloadDeviceReportCancelButtonClicked,
    downloadDevicesReportFx.done,
  ]),
  (x) => !x
);

guard({
  clock: downloadDeviceReportConfirmButtonClicked,
  filter: (searchState): searchState is Partial<CalculatorsListRequestPayload> =>
    searchState !== null,
  source: $devicesSearchState,
  target: downloadDevicesReportFx,
});

$downloadDevicesReportError
  .on(downloadDevicesReportFx.failData, (_, error) => error.message)
  .reset(downloadDevicesReportFx);
