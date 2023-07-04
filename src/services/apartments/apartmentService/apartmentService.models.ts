import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentResponse } from 'myApi';
import { getApartment } from './apartmentService.api';

const domain = createDomain('apartmentService');

const ApartmentGate = createGate<{ id: number }>();
const ApartmentEditModeGate = createGate();

const fetchApartmentFx = domain.createEffect<number, ApartmentResponse>(
  getApartment,
);

const refetchApartment = domain.createEvent();

const resetApartment = domain.createEvent();

const switchApartmentEditMode = domain.createEvent();

const $apartmentEditMode = domain
  .createStore(false)
  .on(switchApartmentEditMode, (mode) => !mode)
  .reset(ApartmentEditModeGate.close);

const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(fetchApartmentFx.doneData, (_, apartment) => {
    return apartment;
  })
  .reset(resetApartment);

sample({
  clock: ApartmentGate.open,
  source: ApartmentGate.state.map((state) => state.id),
  target: fetchApartmentFx,
});

forward({
  from: ApartmentGate.close,
  to: resetApartment,
});

export const apartmentService = {
  inputs: { refetchApartment, resetApartment, switchApartmentEditMode },
  outputs: { $apartment, $apartmentEditMode },
  gates: { ApartmentEditModeGate, ApartmentGate },
};
