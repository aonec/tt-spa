import { ApartmentCheckResponse } from 'myApi';
import { createEffect, createStore, createEvent } from 'effector';
import { createGate } from '../../../../../../node_modules/effector-react';

export const $apartmentChecksDocuments = createStore<ApartmentCheckResponse[] | null>(
  null
);

export const fetchApartmentChecksDocumentsFx = createEffect<
  number,
  ApartmentCheckResponse[] | null
>();

export const ApartmentChecksDocuments = createGate<{ apartmentId: number }>();

export const refetchApartmentCheckHistory = createEvent();
