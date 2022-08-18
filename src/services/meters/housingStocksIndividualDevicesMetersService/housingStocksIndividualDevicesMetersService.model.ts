import { createDomain } from 'effector';
import { IndividualDeviceListItemResponsePagedList } from 'myApi';

const domain = createDomain('housingStocksIndividualDevicesMetersService');

const $devicesPagedList = domain.createStore<IndividualDeviceListItemResponsePagedList | null>(
  null
);

const fetchDevicesListFx = domain.createEffect<
  number,
  IndividualDeviceListItemResponsePagedList | null
>();

export const housingStocksIndividualDevicesMetersService = {
  inputs: {},
  outputs: {},
};
