import { createEffect, createEvent, createStore } from 'effector';
import { forward, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  IndividualDeviceListResponseFromDevicePagePagedList,
  IndividualDeviceResponse,
} from 'api/types';
import {
  getIndividualDevice,
  getIndividualDevicesModels,
  getSerialNumberForCheck,
} from './displayIndividualDeviceAndNamesService.api';
import { GetMeteringDevicesModelsRequest } from './displayIndividualDeviceAndNamesService.types';

const IndividualDeviceGate = createGate<{ id: number }>();

const handleFetchModels = createEvent<string>();
const handleFetchSerialNumberForCheck = createEvent<string>();

const fetchIndividualDeviceFx = createEffect<number, IndividualDeviceResponse>(
  getIndividualDevice,
);

const fetchIndividualDeviceNamesFx = createEffect<
  GetMeteringDevicesModelsRequest,
  string[]
>(getIndividualDevicesModels);

const fetchSerialNumberForCheckFx = createEffect<
  string,
  IndividualDeviceListResponseFromDevicePagePagedList
>(getSerialNumberForCheck);

const $individualDevice = createStore<IndividualDeviceResponse | null>(null)
  .on(fetchIndividualDeviceFx.doneData, (_, device) => device)
  .reset(IndividualDeviceGate.close);

const $individualDevicesNames = createStore<string[] | null>(null).on(
  fetchIndividualDeviceNamesFx.doneData,
  (_, value) => value,
);

const $serialNumberForChecking =
  createStore<IndividualDeviceListResponseFromDevicePagePagedList | null>(null)
    .on(fetchSerialNumberForCheckFx.doneData, (_, data) => data)
    .reset(fetchSerialNumberForCheckFx);

const $isIndividualDeviceLoading = fetchIndividualDeviceFx.pending;
const $isIndividualDeviceNamesLoading = fetchIndividualDeviceNamesFx.pending;
const $isFetchSerialNumberLoading = fetchSerialNumberForCheckFx.pending;

sample({
  clock: IndividualDeviceGate.open,
  source: IndividualDeviceGate.state.map((state) => state.id),
  filter: Boolean,
  target: fetchIndividualDeviceFx,
});

sample({
  clock: handleFetchModels,
  filter: Boolean,
  fn: (Text) => ({ Text }),
  target: fetchIndividualDeviceNamesFx,
});

forward({
  from: handleFetchSerialNumberForCheck,
  to: fetchSerialNumberForCheckFx,
});

export const displayIndividualDeviceAndNamesService = {
  inputs: {
    handleFetchSerialNumberForCheck,
    handleFetchModels,
  },
  outputs: {
    $isIndividualDeviceLoading,
    $individualDevice,
    $isIndividualDeviceNamesLoading,
    $individualDevicesNames,
    $serialNumberForChecking,
    $isFetchSerialNumberLoading,
  },
  gates: { IndividualDeviceGate },
};
