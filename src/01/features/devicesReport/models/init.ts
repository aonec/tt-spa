//@ts-nocheck

import {
  $devicesSearchState,
  $isDeviceReportModalVisible,
  downloadDeviceReportCancelButtonClicked,
  downloadDeviceReportConfirmButtonClicked,
  downloadDevicesReportFx,
  mapDeviceSearchStateToDownloadQuery,
  searchStateChanged,
  showDownloadDeviceReportButtonClicked,
} from './index';
import { forward, guard, sample } from 'effector';
import { downloadDevicesReport } from '../../../_api/devicesReport';

downloadDevicesReportFx.use(downloadDevicesReport);

$devicesSearchState.on(searchStateChanged, (_, searchState) => searchState);

$isDeviceReportModalVisible.on(
  [
    showDownloadDeviceReportButtonClicked,
    downloadDeviceReportCancelButtonClicked,
  ],
  (x) => !x
);

const isNull = (x: any): x is null => x === null;

const searchState = guard({
  clock: downloadDeviceReportConfirmButtonClicked,
  source: $devicesSearchState,
  filter: (searchState) => !isNull(searchState),
});

// sample({
//   source: $devicesSearchState.map(mapDeviceSearchStateToDownloadQuery),
//   clock: searchState,
//   target: downloadDevicesReportFx,
// });

// sample({
//   source: $store1.map(mapFn),
//   clock: clock,
//   target: effectFx,
// });

guard({
  clock: downloadDeviceReportConfirmButtonClicked,
  filter: (searchState) => searchState !== null,
  source: $devicesSearchState,
  target: downloadDevicesReportFx.prepend(mapDeviceSearchStateToDownloadQuery),
});
