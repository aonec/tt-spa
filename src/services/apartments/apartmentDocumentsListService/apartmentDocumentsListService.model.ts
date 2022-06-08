import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { DocumentResponse } from 'myApi';
import { getApartmentDocumentsList } from './apartmentDocumentsListService.api';

const domain = createDomain('apartmentDocumentsListService');

const $documentsList = domain.createStore<DocumentResponse[]>([]);

const fetchDocumentsListFx = domain.createEffect<number, DocumentResponse[]>(
  getApartmentDocumentsList
);
const ApartmentDocumentsListGate = createGate<{ apartmentId: number }>();

const $isLoading = fetchDocumentsListFx.pending;

forward({
  from: ApartmentDocumentsListGate.state.map(({ apartmentId }) => apartmentId),
  to: fetchDocumentsListFx,
});

$documentsList.on(
  fetchDocumentsListFx.doneData,
  (_, documentsList) => documentsList
);

export const apartmentDocumentsListService = {
  inputs: {},
  outputs: {
    $documentsList,
    $isLoading,
  },
  gates: { ApartmentDocumentsListGate },
};
