import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentResponse } from 'myApi';
import { getApartment } from './apartmentProfileService.api';

const domain = createDomain('apartmentProfileService');

const fetchApartmentFx = domain.createEffect<number, ApartmentResponse>(
  getApartment,
);

const ApartmentGate = createGate<{ apartmentId: number }>();

const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(fetchApartmentFx.doneData, (_, apartment) => apartment)
  .reset(ApartmentGate.close);

forward({
  from: ApartmentGate.open.map(({ apartmentId }) => apartmentId),
  to: fetchApartmentFx,
});

const $isApartmentLoading = fetchApartmentFx.pending;

export const apartmentProfileService = {
  outputs: { $apartment, $isApartmentLoading },
  gates: { ApartmentGate },
};
