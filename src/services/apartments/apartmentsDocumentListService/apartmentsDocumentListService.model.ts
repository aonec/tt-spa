import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';
import { DocumentResponse } from 'myApi';
import {
  fetchAparatmentsDocuments,
  fetchSaveFile,
} from './apartmentsDocumentListService.api';

const domain = createDomain('apartmentsDocumentListService');

const saveFile = domain.createEvent<DocumentResponse>();
const saveFileFx = domain.createEffect<DocumentResponse, void>(fetchSaveFile);

const getApartmentDocumentsFx = domain.createEffect<number, DocumentResponse[]>(
  fetchAparatmentsDocuments
);
const $apartmentDocumentsList = domain
  .createStore<DocumentResponse[]>([])
  .on(getApartmentDocumentsFx.doneData, (_, documents) => documents);

const $preparedDocumentsList = $apartmentDocumentsList.map((list) =>
  list.sort((first, second) =>
    moment(second.uploadingTime).diff(moment(first.uploadingTime))
  )
);

const $isLoading = getApartmentDocumentsFx.pending;

const ApartmentIdGate = createGate<{ apartmentId: number }>();

forward({
  from: ApartmentIdGate.open.map(({ apartmentId }) => apartmentId),
  to: getApartmentDocumentsFx,
});

forward({
  from: saveFile,
  to: saveFileFx,
});

export const apartmentsDocumentListService = {
  inputs: { saveFile },
  outputs: {
    $preparedDocumentsList,
    $isLoading,
  },
  gates: {
    ApartmentIdGate,
  },
};
