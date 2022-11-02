import { createDomain, forward, sample } from 'effector';
import {
  IndividualDeviceListResponseFromDevicePage,
  IndividualDeviceListResponseFromDevicePagePagedList,
} from 'myApi';
import { fetchIndividualDevices } from './individualDevicesViesBySerialNumberService.api';
import { DEVICES_LIST_BY_SERIAL_NUMBER_SIZE } from './individualDevicesViesBySerialNumberService.constants';
import { IndividualDeviceSearchbySerialNumberPayload } from './individualDevicesViesBySerialNumberService.types';

const domain = createDomain('individualDevicesViewBySerialNumberService');

const getDevicesFx = domain.createEffect<
  IndividualDeviceSearchbySerialNumberPayload,
  IndividualDeviceListResponseFromDevicePagePagedList
>(fetchIndividualDevices);

const $pagedList = domain
  .createStore<IndividualDeviceListResponseFromDevicePagePagedList | null>(null)
  .on(getDevicesFx.doneData, (_, response) => response);

const $devices = $pagedList.map((list) => list?.items || []);

const changePageNumber = domain.createEvent<number>();
const $totalItems = $pagedList.map((list) => list?.totalItems || 0);

const setFilter = domain.createEvent<IndividualDeviceSearchbySerialNumberPayload>();
const $searchPayload = domain
  .createStore<IndividualDeviceSearchbySerialNumberPayload>({
    SerialNumber: '',
    Resource: null,
    ApartmentStatus: null,
    IsAlsoClosing: false,
    PageNumber: 1,
  })
  .on(setFilter, (_, filter) => ({ ...filter, PageNumber: 1 }))
  .on(changePageNumber, (filter, PageNumber) => ({ ...filter, PageNumber }));

const $isLoading = getDevicesFx.pending;

sample({
  clock: $searchPayload,
  fn: (payload) => ({
    ...payload,
    PageSize: DEVICES_LIST_BY_SERIAL_NUMBER_SIZE,
  }),
  target: getDevicesFx,
});

export const individualDevicesViewBySerialNumberService = {
  inputs: {
    setFilter,
    changePageNumber,
  },
  outputs: {
    $searchPayload,
    $devices,
    $totalItems,
    $isLoading,
  },
};
