import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import {
  fetchApartment,
  fetchIndividualDevices,
} from './confirmUsingExistingArartmentService.api';
import {
  ApartmentResponse,
  IndividualDeviceListItemResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'api/types';
import { splitPersonalNumberService } from '../../splitPersonalNumberService';

const handleCloseModal = createEvent();

const $checkedExistingApartmentId =
  splitPersonalNumberService.outputs.$checkedExistingApartmentId.reset(
    handleCloseModal,
  );

const $isConfirmExistingApartmentModalOpen =
  $checkedExistingApartmentId.map(Boolean);

const getApartmentFx = createEffect<number, ApartmentResponse>(fetchApartment);
const $apartment = createStore<ApartmentResponse | null>(null).on(
  getApartmentFx.doneData,
  (_, apartment) => apartment,
);

const getDevicesFx = createEffect<
  number,
  IndividualDeviceListItemResponsePagedList
>(fetchIndividualDevices);

const $devices = createStore<IndividualDeviceListItemResponse[]>([]).on(
  getDevicesFx.doneData,
  (_, devices) => devices.items || [],
);

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
  inputs: {
    handleCloseModal,
    handleSplitInExistApart:
      splitPersonalNumberService.inputs.handleSplitInExistApart,
  },
  outputs: {
    $devices,
    $apartment,
    $isConfirmExistingApartmentModalOpen,
    $isDeviceLoading,
    $isApartmentLoading,
  },
};
