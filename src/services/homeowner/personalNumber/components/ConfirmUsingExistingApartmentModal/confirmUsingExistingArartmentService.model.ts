import { createDomain, sample } from 'effector';
import {
  fetchApartment,
  fetchIndividualDevices,
} from './confirmUsingExistingArartmentService.api';
import {
  ApartmentResponse,
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'myApi';
import { splitPersonalNumberService } from '../../splitPersonalNumberService';

const domain = createDomain('confirmUsingExistingArartmentService');

const handleCloseModal = domain.createEvent();

const $checkedExistingApartmentId =
  splitPersonalNumberService.outputs.$checkedExistingApartmentId.reset(
    handleCloseModal,
  );

const $isConfirmExistingApartmentModalOpen =
  $checkedExistingApartmentId.map(Boolean);

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

export const confirmUsingExistingArartmentService = {
  inputs: { handleCloseModal },
  outputs: {
    $devices,
    $apartment,
    $isConfirmExistingApartmentModalOpen,
    $isDeviceLoading,
    $isApartmentLoading,
  },
};
