import { createDomain, forward } from 'effector';
import { ApartmentResponse } from 'api/types';
import { getSamePersonalAccountNumderApartmentData } from './ConfirmationAddingExistingPersonalNumberModal.api';

const domain = createDomain('ConfirmationAddingExistingPersonalNumberModal');

const samePersonalAccountNumderId = domain.createEvent<number>();

const fetchSamePersonalAccountNumderApartmentDataFx = domain.createEffect<
  number,
  ApartmentResponse
>(getSamePersonalAccountNumderApartmentData);

const $samePersonalAccountNumderApartmentData =
  domain.createStore<ApartmentResponse | null>(null);

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
