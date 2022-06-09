import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { DocumentResponse } from 'myApi';
import { getapartmentActsList } from './apartmentActsListService.api';

const domain = createDomain('apartmentActsListService');

const $documentsList = domain.createStore<DocumentResponse[]>([]);

const fetchDocumentsListFx = domain.createEffect<number, DocumentResponse[]>(
  getapartmentActsList
);
const ApartmentActsListGate = createGate<{ apartmentId: number }>();

const $isLoading = fetchDocumentsListFx.pending;

forward({
  from: ApartmentActsListGate.state.map(({ apartmentId }) => apartmentId),
  to: fetchDocumentsListFx,
});

$documentsList.on(
  fetchDocumentsListFx.doneData,
  (_, documentsList) => documentsList
);

export const apartmentActsListService = {
  inputs: {},
  outputs: {
    $documentsList,
    $isLoading,
  },
  gates: { ApartmentActsListGate },
};
