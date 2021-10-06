import { createGate } from 'effector-react';
import { ApartmentResponse } from './../../../../../myApi';
import { createStore, createEffect, createEvent } from 'effector';

export const $apartment = createStore<ApartmentResponse | null>(null);

export const fetchApartmentFx = createEffect<number, ApartmentResponse>();

export const ApartmentGate = createGate<{ id: number }>();

export const refetchApartment = createEvent();

export const resetApartment = createEvent();
