import { $actTypes } from '01/features/actsJournal/displayActTypes/models';
import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentActResponse, DocumentResponse } from 'myApi';
import {
  getapartmentActsList,
  saveFileRequest,
} from './apartmentActsListService.api';

const domain = createDomain('apartmentActsListService');

const $actsList = domain.createStore<ApartmentActResponse[] | null>(null);

const fetchActsListFx = domain.createEffect<
  number,
  ApartmentActResponse[] | null
>(getapartmentActsList);

const ApartmentActsListGate = createGate<{ apartmentId: number }>();

const $isLoading = fetchActsListFx.pending;

const refetchApartmentActs = domain.createEvent();

const saveFile = domain.createEvent<DocumentResponse>();
const saveFileFx = domain.createEffect<DocumentResponse, void>(saveFileRequest);

forward({
  from: saveFile,
  to: saveFileFx,
});

sample({
  source: ApartmentActsListGate.state.map(({ apartmentId }) => apartmentId),
  clock: refetchApartmentActs,
  target: fetchActsListFx,
});

forward({
  from: ApartmentActsListGate.state.map(({ apartmentId }) => apartmentId),
  to: fetchActsListFx,
});

$actsList.on(fetchActsListFx.doneData, (_, actsList) => actsList);

export const apartmentActsListService = {
  inputs: {
    refetchApartmentActs,
    saveFile,
  },
  outputs: {
    $actsList,
    $isLoading,
    $actTypes,
  },
  gates: { ApartmentActsListGate },
};
