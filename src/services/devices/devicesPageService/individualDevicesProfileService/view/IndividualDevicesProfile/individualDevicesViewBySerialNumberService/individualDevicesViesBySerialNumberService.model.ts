import { createDomain, forward } from 'effector';
import {
  EApartmentStatus,
  IndividualDeviceListResponseFromDevicePage,
  IndividualDeviceListResponseFromDevicePagePagedList,
} from 'myApi';
import { fetchIndividualDevices } from './individualDevicesViesBySerialNumberService.api';
import { IndividualDeviceSearchbySerialNumberPayload } from './individualDevicesViesBySerialNumberService.types';

const domain = createDomain('individualDevicesViewBySerialNumberService');

const getDevicesFx = domain.createEffect<
  IndividualDeviceSearchbySerialNumberPayload,
  IndividualDeviceListResponseFromDevicePagePagedList
>(fetchIndividualDevices);

const $devices = domain
  .createStore<IndividualDeviceListResponseFromDevicePage[]>([])
  .on(getDevicesFx.doneData, (_, pagedList) => pagedList?.items || []);

const setFilter = domain.createEvent<IndividualDeviceSearchbySerialNumberPayload>();
const $searchPayload = domain
  .createStore<IndividualDeviceSearchbySerialNumberPayload>({
    SerialNumber: '',
    Resource: null,
    IsAlsoClosing: false,
  })
  .on(setFilter, (_, filter) => filter);

forward({
  from: $searchPayload,
  to: getDevicesFx,
});

export const individualDevicesViewBySerialNumberService = {
  inputs: { setFilter },
  outputs: {
    $searchPayload,
    $devices,
  },
};
