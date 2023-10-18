import { createEffect, createEvent, createStore } from 'effector';
import { forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentResponse } from 'api/types';
import { getApartment } from './apartmentService.api';

const ApartmentGate = createGate<{ id: number }>();
const ApartmentEditModeGate = createGate();

const fetchApartmentFx = createEffect<number, ApartmentResponse>(getApartment);

const refetchApartment = createEvent();

const resetApartment = createEvent();

const switchApartmentEditMode = createEvent();

const $apartmentEditMode = createStore(false)
  .on(switchApartmentEditMode, (mode) => !mode)
  .reset(ApartmentEditModeGate.close);

const $apartment = createStore<ApartmentResponse | null>(null)
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
