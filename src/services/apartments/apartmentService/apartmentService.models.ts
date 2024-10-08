import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
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

const $apartmentId = ApartmentGate.state.map((state) => state.id || null);

sample({
  clock: ApartmentGate.open,
  source: $apartmentId,
  filter: (id): id is number => Boolean(id),
  target: fetchApartmentFx,
});

sample({
  clock: ApartmentGate.close,
  target: resetApartment,
});

export const apartmentService = {
  inputs: { refetchApartment, resetApartment, switchApartmentEditMode },
  outputs: { $apartment, $apartmentEditMode },
  gates: { ApartmentEditModeGate, ApartmentGate },
};
