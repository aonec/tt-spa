import { createDomain, forward, guard, sample } from 'effector';
import { ApartmentResponse } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { SearchMode } from './view/ApartmentsReadings/ApartmentsReadings.types';
import { GetApartmentsRequestPayload } from './ApartmentReadingsService.types';
import { getApartment } from './ApartmentReadingsService.api';
import { createGate } from 'effector-react';

const domain = createDomain('apartmentReadingsService');

const setSearchMode = domain.createEvent<SearchMode>();

const handleSearchApartment = domain.createEvent<GetApartmentsRequestPayload>();

const ApartmentGate = createGate<{ id?: number }>();

const fetchApartmentFx = domain.createEffect<
  GetApartmentsRequestPayload,
  ApartmentResponse | null,
  EffectFailDataAxiosError
>(getApartment);

const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(fetchApartmentFx.doneData, (_, apartment) => apartment);

const $searchMode = domain
  .createStore(SearchMode.Apartment)
  .on(setSearchMode, (_, mode) => mode);

forward({
  from: handleSearchApartment,
  to: fetchApartmentFx,
});

sample({
  source: ApartmentGate.state.map(({ id }) => ({ ApartmentId: id })),
  clock: guard({
    source: $apartment,
    clock: ApartmentGate.open,
    filter: (apartment, { id }) => Boolean(id && !apartment),
  }),
  target: fetchApartmentFx,
});

const $isLoadingApartment = fetchApartmentFx.pending;

export const apartmentReadingsService = {
  inputs: {
    setSearchMode,
    handleSearchApartment,
  },
  outputs: { $searchMode, $apartment, $isLoadingApartment },
  gates: { ApartmentGate },
};
