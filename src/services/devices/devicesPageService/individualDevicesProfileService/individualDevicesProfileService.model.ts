import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { IndividualDeviceMountPlaceForFilterResponse } from 'myApi';
import { DevicesSearchType } from '../devicesPageService.types';
import { fetchMouintPlaces } from './individualDevicesProfileService.api';

const domain = createDomain('individualDevicesProfileService');

const getMountPlacesFx = domain.createEffect<
  void,
  IndividualDeviceMountPlaceForFilterResponse[]
>(fetchMouintPlaces);

const $mountPlaces = domain
  .createStore<IndividualDeviceMountPlaceForFilterResponse[]>([])
  .on(getMountPlacesFx.doneData, (_, places) => places);

const setDevicesSearchType = domain.createEvent<DevicesSearchType>();

export const $devicesSearchType = domain
  .createStore<DevicesSearchType>(DevicesSearchType.SearialNumber)
  .on(setDevicesSearchType, (_, type) => type);

const IndividualDevicesGate = createGate();

forward({
  from: IndividualDevicesGate.open,
  to: getMountPlacesFx,
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
