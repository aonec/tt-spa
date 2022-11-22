import { getApartment } from './editApartmentProfileService.api';
import { ApartmentResponse } from 'myApi';
import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { TabsSection } from './editApartmentProfileService.types';

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

const setTabSection = domain.createEvent<TabsSection>();

const $tabSection = domain
  .createStore<TabsSection>(TabsSection.CommonData)
  .on(setTabSection, (_, tab) => tab)
  .reset(ApartmentGate.close);

export const editApartmentProfileService = {
  inputs: { setTabSection },
  outputs: {
    $apartment,
    $isLoading,
    $tabSection,
  },
  gates: { ApartmentGate },
};
