import { createDomain, sample } from 'effector';
import {
  ApartmentResponse,
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'myApi';
import {
  fetchApartment,
  fetchIndividualDevices,
} from './ConfirmUsingExistingApartmentService.api';
import { $checkedExistingApartmentId } from '../../models';

const domain = createDomain('ConfirmUsingExistingApartmentService');

const getApartmentFx = domain.createEffect<number, ApartmentResponse>(
  fetchApartment,
);
const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(getApartmentFx.doneData, (_, apartment) => apartment);

const getDevicesFx = domain.createEffect<
  number,
  IndividualDeviceListItemResponsePagedList
>(fetchIndividualDevices);

const $devices = domain
  .createStore<IndividualDeviceListItemResponse[]>([])
  .on(getDevicesFx.doneData, (_, devices) => devices.items || []);

const $isApartmentLoading = getApartmentFx.pending;
const $isDeviceLoading = getDevicesFx.pending;

sample({
  clock: $checkedExistingApartmentId,
  filter: Boolean,
  target: getDevicesFx,
});

sample({
  clock: $checkedExistingApartmentId,
  filter: Boolean,
  target: getApartmentFx,
});

export const confirmUsingExistingApartmentService = {
  outputs: {
    $apartment,
    $isApartmentLoading,
    $devices,
    $isDeviceLoading,
  },
};
