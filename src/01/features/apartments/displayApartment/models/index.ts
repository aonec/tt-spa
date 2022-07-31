import { createGate } from 'effector-react';
import { createStore, createEffect, createEvent } from 'effector';
import { ApartmentResponse } from '../../../../../api/types';

export const $apartment = createStore<ApartmentResponse | null>(null);

export const fetchApartmentFx = createEffect<number, ApartmentResponse>();

export const ApartmentGate = createGate<{ id: number }>();

export const refetchApartment = createEvent();

export const resetApartment = createEvent();

export const $apartmentEditMode = createStore(false);

export const ApartmentEditModeGate = createGate();

export const switchApartmentEditMode = createEvent<void>();
