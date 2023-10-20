import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { IndividualDeviceListResponseFromDevicePagePagedList } from 'api/types';
import { individualDevicesProfileService } from '../../../individualDevicesProfileService.model';
import { fetchIndividualDevices } from './individualDevicesViesBySerialNumberService.api';
import { DEVICES_LIST_BY_SERIAL_NUMBER_SIZE } from './individualDevicesViesBySerialNumberService.constants';
import { IndividualDeviceSearchbySerialNumberPayload } from './individualDevicesViesBySerialNumberService.types';

const clearFilter = createEvent();

const getDevicesFx = createEffect<
  IndividualDeviceSearchbySerialNumberPayload,
  IndividualDeviceListResponseFromDevicePagePagedList
>(fetchIndividualDevices);

const $pagedList =
  createStore<IndividualDeviceListResponseFromDevicePagePagedList | null>(null)
    .on(getDevicesFx.doneData, (_, response) => response)
    .reset(clearFilter);

const $devices = $pagedList.map((list) => list?.items || []);

const changePageNumber = createEvent<number>();
const $totalItems = $pagedList.map((list) => list?.totalItems || 0);

const setFilter = createEvent<IndividualDeviceSearchbySerialNumberPayload>();
const $searchPayload = createStore<IndividualDeviceSearchbySerialNumberPayload>(
  {
    SerialNumber: '',
    Resource: null,
    ApartmentStatus: null,
    IsAlsoClosing: false,
    PageNumber: 1,
  },
)
  .on(setFilter, (_, filter) => ({ ...filter, PageNumber: 1 }))
  .on(changePageNumber, (filter, PageNumber) => ({ ...filter, PageNumber }))
  .reset(clearFilter);

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
    clearFilter,
  },
  outputs: {
    $searchPayload,
    $devices,
    $totalItems,
    $isLoading,
    $mountPlaces: individualDevicesProfileService.outputs.$mountPlaces,
  },
};
