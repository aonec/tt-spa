import { createEffect, createEvent, createStore } from 'effector';
import { combine, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'api/types';
import { getIndividualDevices } from './apartmentIndividualDevicesMetersService.api';
import { PREVIOUS_READING_INDEX_LIMIT } from './apartmentIndividualDevicesMetersService.constants';
import { GetIndividualDevicesParams } from './apartmentIndividualDevicesMetersService.types';
import { managementFirmConsumptionRatesService } from '../managementFirmConsumptionRatesService';
import { readingsHistoryService } from '../readingsHistoryService/readingsHistoryService.model';

const $individualDevicesPagedData =
  createStore<IndividualDeviceListItemResponsePagedList | null>(null);

const fetchIndividualDevicesFx = createEffect<
  GetIndividualDevicesParams,
  IndividualDeviceListItemResponsePagedList
>(getIndividualDevices);

const $isShowClosedIndividualDevices = createStore(false);

const setIsShowClosedDevices = createEvent<boolean>();

const $sliderIndex = createStore(0);

const upSliderIndex = createEvent();
const downSliderIndex = createEvent();

const $individualDevicesList = createStore<IndividualDeviceListItemResponse[]>(
  [],
).on($individualDevicesPagedData, (_, data) => data?.items || []);

const $filteredIndividualDevicesList = combine(
  $individualDevicesList,
  $isShowClosedIndividualDevices,
).map(([devices, isShowClosed]) => {
  if (isShowClosed) {
    return devices;
  }

  return devices.filter(
    (device: IndividualDeviceListItemResponse) => !device.closingDate,
  );
});

const $closedDevicesCount = $individualDevicesPagedData.map((data) => {
  const devices = data?.items;

  if (!devices) return null;

  return devices.filter((device: IndividualDeviceListItemResponse) =>
    Boolean(device.closingDate),
  ).length;
});

const refetchIndividualDevices = createEvent();

const $isLoading = fetchIndividualDevicesFx.pending;

const IndividualDevicesGate = createGate<GetIndividualDevicesParams>();

$individualDevicesPagedData.on(
  fetchIndividualDevicesFx.doneData,
  (_, data) => data,
);

guard({
  clock: [IndividualDevicesGate.state, refetchIndividualDevices],
  source: IndividualDevicesGate.state,
  filter: (params) => Boolean(params.ApartmentId),
  target: fetchIndividualDevicesFx,
});

$isShowClosedIndividualDevices.on(setIsShowClosedDevices, (_, value) => value);

$sliderIndex
  .on(upSliderIndex, (index) => {
    if (index === PREVIOUS_READING_INDEX_LIMIT) return index;

    return ++index;
  })
  .on(downSliderIndex, (index) => {
    if (index === 0) return index;

    return --index;
  });

sample({
  clock: readingsHistoryService.inputs.closeReadingsHistoryModal,
  target: refetchIndividualDevices,
});

export const apartmentIndividualDevicesMetersService = {
  inputs: {
    refetchIndividualDevices,
    setIsShowClosedDevices,
    upSliderIndex,
    downSliderIndex,
    openReadingsHistoryModal:
      readingsHistoryService.inputs.openReadingsHistoryModal,
    loadConsumptionRates:
      managementFirmConsumptionRatesService.inputs
        .loadManagemenFirmConsumptionRates,
  },
  outputs: {
    $individualDevicesList,
    $filteredIndividualDevicesList,
    $isLoading,
    $isShowClosedIndividualDevices,
    $closedDevicesCount,
    $sliderIndex,
    $individualDevicesPagedData,
    $consumptionRates:
      managementFirmConsumptionRatesService.outputs.$consumptionRates,
  },
  gates: { IndividualDevicesGate },
};
