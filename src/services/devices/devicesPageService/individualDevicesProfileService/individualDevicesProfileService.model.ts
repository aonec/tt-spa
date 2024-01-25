import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { IndividualDeviceMountPlaceForFilterResponse } from 'api/types';
import { DevicesSearchType } from '../devicesPageService.types';
import { fetchMouintPlaces } from './individualDevicesProfileService.api';

const getMountPlacesFx = createEffect<
  void,
  IndividualDeviceMountPlaceForFilterResponse[]
>(fetchMouintPlaces);

const $mountPlaces = createStore<IndividualDeviceMountPlaceForFilterResponse[]>(
  [],
).on(getMountPlacesFx.doneData, (_, places) => places);

const setDevicesSearchType = createEvent<DevicesSearchType>();

export const $devicesSearchType = createStore<DevicesSearchType>(
  DevicesSearchType.SearialNumber,
).on(setDevicesSearchType, (_, type) => type);

const IndividualDevicesGate = createGate();

sample({
  clock: IndividualDevicesGate.open,
  target: getMountPlacesFx,
});

export const individualDevicesProfileService = {
  inputs: {
    setDevicesSearchType,
  },
  outputs: {
    $devicesSearchType,
    $mountPlaces,
  },
  gates: { IndividualDevicesGate },
};
