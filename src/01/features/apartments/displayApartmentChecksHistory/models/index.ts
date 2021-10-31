import { DocumentResponse } from 'myApi';
import { createEffect, createStore } from 'effector';
import { createGate } from '../../../../../../node_modules/effector-react';

export const $apartmentChecksDocuments = createStore<DocumentResponse[] | null>(
  null
);

export const fetchApartmentChecksDocumentsFx = createEffect<
  number,
  DocumentResponse[] | null
>();

export const ApartmentChecksDocuments = createGate<{ apartmentId: number }>();
