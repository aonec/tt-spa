import { createDomain } from 'effector';
import { DevicesSearchType } from './individualDevicesProfileService.types';

const domain = createDomain('individualDevicesProfileService');

const setDevicesSearchType = domain.createEvent<DevicesSearchType>();

export const $devicesSearchType = domain
  .createStore<DevicesSearchType>(DevicesSearchType.SearialNumber)
  .on(setDevicesSearchType, (_, type) => type);

export const individualDevicesProfileService = {
  inputs: {
    setDevicesSearchType,
  },
  outputs: {
    $devicesSearchType,
  },
};
