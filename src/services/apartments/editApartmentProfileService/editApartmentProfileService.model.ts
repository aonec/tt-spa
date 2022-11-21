import { getApartment } from './editApartmentProfileService.api';
import { ApartmentResponse } from 'myApi';
import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';

const domain = createDomain('editApartmentProfileService');

const fetchApartment = domain.createEffect<number, ApartmentResponse>(
  getApartment
);

const ApartmentGate = createGate<{ apartmentId: number }>();

const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(fetchApartment.doneData, (_, apartment) => apartment)
  .reset(ApartmentGate.close);

forward({
  from: ApartmentGate.open.map(({ apartmentId }) => apartmentId),
  to: fetchApartment,
});

const $isLoading = fetchApartment.pending;

export const editApartmentProfileService = {
  outputs: {
    $apartment,
    $isLoading,
  },
  gates: { ApartmentGate },
};
