import { combine, createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'myApi';
import { openReadingsHistoryModal } from './../../../01/features/readings/displayReadingHistory/models/index';
import { getIndividualDevices } from './apartmentIndividualDevicesMetersService.api';
import { PREVIOUS_READING_INDEX_LIMIT } from './apartmentIndividualDevicesMetersService.constants';
import { GetIndividualDevicesParams } from './apartmentIndividualDevicesMetersService.types';

const domain = createDomain('apartmentIndividualDevicesMetersService');

const upSliderIndex = domain.createEvent();
const downSliderIndex = domain.createEvent();

const setIsShowClosedDevices = domain.createEvent<boolean>();

const $individualDevicesPagedData = domain.createStore<IndividualDeviceListItemResponsePagedList | null>(
  null
);

const $isShowClosedIndividualDevices = domain
  .createStore(false)
  .on(setIsShowClosedDevices, (_, value) => value);

const $sliderIndex = domain
  .createStore(0)
  .on(upSliderIndex, (index) => {
    if (index === PREVIOUS_READING_INDEX_LIMIT) return index;

    return ++index;
  })
  .on(downSliderIndex, (index) => {
    if (index === 0) return index;

    return --index;
  });

const $individualDevicesList = combine(
  $individualDevicesPagedData,
  $isShowClosedIndividualDevices
).map(([data, isShowClosed]) => {
  const devices = data?.items;

  if (!devices) return [];

  if (isShowClosed) {
    return devices;
  }

  return devices.filter(
    (device: IndividualDeviceListItemResponse) => !device.closingDate
  );
});

const $closedDevicesCount = $individualDevicesPagedData.map((data) => {
  const devices = data?.items;

  if (!devices) return null;

  return devices.filter((device: IndividualDeviceListItemResponse) =>
    Boolean(device.closingDate)
  ).length;
});

const fetchIndividualDevicesFx = domain.createEffect<
  GetIndividualDevicesParams,
  IndividualDeviceListItemResponsePagedList
>(getIndividualDevices);

const $isLoading = fetchIndividualDevicesFx.pending;

const IndividualDevicesGate = createGate<GetIndividualDevicesParams>();

$individualDevicesPagedData.on(
  fetchIndividualDevicesFx.doneData,
  (_, data) => data
);

forward({
  from: IndividualDevicesGate.state,
  to: fetchIndividualDevicesFx,
});

export const apartmentIndividualDevicesMetersService = {
  inputs: {
    setIsShowClosedDevices,
    upSliderIndex,
    downSliderIndex,
    openReadingsHistoryModal,
  },
  outputs: {
    $individualDevicesList,
    $isLoading,
    $isShowClosedIndividualDevices,
    $closedDevicesCount,
    $sliderIndex,
    $individualDevicesPagedData,
  },
  gates: { IndividualDevicesGate },
};
