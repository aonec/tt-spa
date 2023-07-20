import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentResponse } from 'api/myApi';
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

sample({
  clock: ApartmentGate.open,
  source: $apartment,
  filter: (apartment, gateData) => gateData.apartmentId !== apartment?.id,
  fn: (source, clock) => clock.apartmentId,
  target: fetchApartmentFx,
});

const $isApartmentLoading = fetchApartmentFx.pending;

export const apartmentProfileService = {
  outputs: { $apartment, $isApartmentLoading },
  gates: { ApartmentGate },
};
