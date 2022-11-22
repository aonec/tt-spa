import { ApartmentResponse } from 'myApi';
import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { PutApartment, TabsSection } from './editApartmentProfileService.types';
import { getApartment, putApartment } from './editApartmentProfileService.api';

const domain = createDomain('editApartmentProfileService');

const fetchApartmentFx = domain.createEffect<number, ApartmentResponse>(
  getApartment
);

const handleUpdateApartment = domain.createEvent<PutApartment>();

const updateApartmentFx = domain.createEffect<PutApartment, ApartmentResponse>(
  putApartment
);

const ApartmentGate = createGate<{ apartmentId: number }>();

const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(
    [fetchApartmentFx.doneData, updateApartmentFx.doneData],
    (_, apartment) => apartment
  )
  .reset(ApartmentGate.close);

forward({
  from: ApartmentGate.open.map(({ apartmentId }) => apartmentId),
  to: fetchApartmentFx,
});

forward({
  from: handleUpdateApartment,
  to: updateApartmentFx,
});

const $isLoading = fetchApartmentFx.pending;

const $isUpdatingApartmentLoading = updateApartmentFx.pending;

const setTabSection = domain.createEvent<TabsSection>();

const $tabSection = domain
  .createStore<TabsSection>(TabsSection.CommonData)
  .on(setTabSection, (_, tab) => tab)
  .reset(ApartmentGate.close);

export const editApartmentProfileService = {
  inputs: { setTabSection, handleUpdateApartment },
  outputs: {
    $apartment,
    $isLoading,
    $tabSection,
    $isUpdatingApartmentLoading,
  },
  gates: { ApartmentGate },
};
