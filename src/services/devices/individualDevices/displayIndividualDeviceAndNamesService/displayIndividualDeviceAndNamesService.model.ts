import { createDomain, forward, sample } from 'effector';
import {
  IndividualDeviceListResponseFromDevicePagePagedList,
  IndividualDeviceResponse,
} from 'myApi';
import { createGate } from 'effector-react';
import {
  getIndividualDevice,
  getIndividualDevicesModels,
  getSerialNumberForCheck,
} from './displayIndividualDeviceAndNamesService.api';
import { GetMeteringDevicesModelsRequest } from './displayIndividualDeviceAndNamesService.types';

const domain = createDomain('displayIndividualDeviceAndNamesService');

const IndividualDeviceGate = createGate<{ id: number }>();

const handleFetchModels = domain.createEvent<string>();
const handleFetchIndividualDevice = domain.createEvent<number>();
const handleFetchSerialNumberForCheck = domain.createEvent<string>();

const fetchIndividualDeviceFx = domain.createEffect<
  number,
  IndividualDeviceResponse
>(getIndividualDevice);

const fetchIndividualDeviceNamesFx = domain.createEffect<
  GetMeteringDevicesModelsRequest,
  string[]
>(getIndividualDevicesModels);

const fetchSerialNumberForCheckFx = domain.createEffect<
  string,
  IndividualDeviceListResponseFromDevicePagePagedList
>(getSerialNumberForCheck);

const $individualDevice = domain
  .createStore<IndividualDeviceResponse | null>(null)
  .on(fetchIndividualDeviceFx.doneData, (_, device) => device)
  .reset(IndividualDeviceGate.close);

const $individualDevicesNames = domain
  .createStore<string[] | null>(null)
  .on(fetchIndividualDeviceNamesFx.doneData, (_, value) => value);

const $serialNumberForChecking = domain
  .createStore<IndividualDeviceListResponseFromDevicePagePagedList | null>(null)
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

forward({
  from: handleFetchIndividualDevice,
  to: fetchIndividualDeviceFx,
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
    handleFetchIndividualDevice,
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
