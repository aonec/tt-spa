import { openReadingsHistoryModal } from './../../../01/features/readings/displayReadingHistory/models/index';
import { combine, createDomain, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import {
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'myApi';
import { getIndividualDevices } from './apartmentIndividualDevicesMetersService.api';
import { previousReadingIndexLimit } from './apartmentIndividualDevicesMetersService.constants';
import { GetIndividualDevicesParams } from './apartmentIndividualDevicesMetersService.types';

const domain = createDomain('apartmentIndividualDevicesMetersService');

const $individualDevicesPagedData = domain.createStore<IndividualDeviceListItemResponsePagedList | null>(
  null
);

const $isShowClosedIndividualDevices = domain.createStore(false);

const setIsShowClosedDevices = domain.createEvent<boolean>();

const $sliderIndex = domain.createStore(0);

const upSliderIndex = domain.createEvent();
const downSliderIndex = domain.createEvent();

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

$isShowClosedIndividualDevices.on(setIsShowClosedDevices, (_, value) => value);

$sliderIndex
  .on(upSliderIndex, (index) => {
    if (index === previousReadingIndexLimit) return index;

    return ++index;
  })
  .on(downSliderIndex, (index) => {
    if (index === 0) return index;

    return --index;
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
  },
  gates: { IndividualDevicesGate },
};
