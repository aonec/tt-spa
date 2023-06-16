import { createDomain, forward, sample } from 'effector';
import { IndividualDeviceResponse } from 'myApi';
import { createGate } from 'effector-react';
import {
  getIndividualDevice,
  getIndividualDevicesModels,
} from './displayIndividualDeviceAndNamesService.api';
import { GetMeteringDevicesModelsRequest } from './displayIndividualDeviceAndNamesService.types';

const domain = createDomain('displayIndividualDeviceAndNamesService');

const IndividualDeviceGate = createGate<{ id: number }>();
const IndividualDevicecModelsGate = createGate<{ model: string }>();

const handleFetchIndividualDevice = domain.createEvent<number>();

const fetchIndividualDeviceFx = domain.createEffect<
  number,
  IndividualDeviceResponse
>(getIndividualDevice);
const fetchIndividualDeviceNamesFx = domain.createEffect<
  GetMeteringDevicesModelsRequest,
  string[]
>(getIndividualDevicesModels);

const $individualDevice = domain
  .createStore<IndividualDeviceResponse | null>(null)
  .on(fetchIndividualDeviceFx.doneData, (_, device) => device)
  .reset(IndividualDeviceGate.close);
const $individualDevicesNames = domain
  .createStore<string[] | null>(null)
  .on(fetchIndividualDeviceNamesFx.doneData, (_, value) => value);

const $isIndividualDeviceLoading = fetchIndividualDeviceFx.pending;
const $isIndividualDeviceNamesLoading = fetchIndividualDeviceNamesFx.pending;

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
  clock: IndividualDevicecModelsGate.state.map((value) => ({
    Text: value.model,
  })),
  filter: ({ Text }) => Boolean(Text),
  target: fetchIndividualDeviceNamesFx,
});

export const displayIndividualDeviceAndNamesService = {
  inputs: { handleFetchIndividualDevice },
  outputs: {
    $isIndividualDeviceLoading,
    $individualDevice,
    $isIndividualDeviceNamesLoading,
    $individualDevicesNames,
  },
  gates: { IndividualDeviceGate, IndividualDevicecModelsGate },
};
