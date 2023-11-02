import { createEffect, createEvent, createStore } from 'effector';
import { forward } from 'effector';
import { ApartmentResponse } from 'api/types';
import { getSamePersonalAccountNumderApartmentData } from './ConfirmationAddingExistingPersonalNumberModal.api';

const samePersonalAccountNumderId = createEvent<number>();

const fetchSamePersonalAccountNumderApartmentDataFx = createEffect<
  number,
  ApartmentResponse
>(getSamePersonalAccountNumderApartmentData);

const $samePersonalAccountNumderApartmentData =
  createStore<ApartmentResponse | null>(null);

$samePersonalAccountNumderApartmentData.on(
  fetchSamePersonalAccountNumderApartmentDataFx.doneData,
  (_, data) => data,
);

forward({
  from: samePersonalAccountNumderId,
  to: fetchSamePersonalAccountNumderApartmentDataFx,
});

export const ConfirmationAddingExistingPersonalNumberModal = {
  inputs: { samePersonalAccountNumderId },
  outputs: { $samePersonalAccountNumderApartmentData },
};
