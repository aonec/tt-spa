import {
  closeReadingsHistoryModal,
  openReadingsHistoryModal,
} from '../readingsHistoryService/models/index';
import { combine, createDomain, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import {
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'myApi';
import { getIndividualDevices } from './apartmentIndividualDevicesMetersService.api';
import { PREVIOUS_READING_INDEX_LIMIT } from './apartmentIndividualDevicesMetersService.constants';
import { GetIndividualDevicesParams } from './apartmentIndividualDevicesMetersService.types';
import { managementFirmConsumptionRatesService } from '../managementFirmConsumptionRatesService';

const domain = createDomain('apartmentIndividualDevicesMetersService');

const $individualDevicesPagedData =
  domain.createStore<IndividualDeviceListItemResponsePagedList | null>(null);

const fetchIndividualDevicesFx = domain.createEffect<
  GetIndividualDevicesParams,
  IndividualDeviceListItemResponsePagedList
>(getIndividualDevices);

const $isShowClosedIndividualDevices = domain.createStore(false);

const setIsShowClosedDevices = domain.createEvent<boolean>();

const $sliderIndex = domain.createStore(0);

const upSliderIndex = domain.createEvent();
const downSliderIndex = domain.createEvent();

const $individualDevicesList = domain
  .createStore<IndividualDeviceListItemResponse[]>([])
  .on($individualDevicesPagedData, (_, data) => data?.items || []);

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

const refetchIndividualDevices = domain.createEvent();

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

forward({
  from: closeReadingsHistoryModal,
  to: refetchIndividualDevices,
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

export const apartmentIndividualDevicesMetersService = {
  inputs: {
    refetchIndividualDevices,
    setIsShowClosedDevices,
    upSliderIndex,
    downSliderIndex,
    openReadingsHistoryModal,
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
