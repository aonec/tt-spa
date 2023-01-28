import { $actTypes } from '01/features/actsJournal/displayActTypes/models';
import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentActResponse,
  ApartmentActResponsePagedList,
  DocumentResponse,
} from 'myApi';
import { fetchPreviousActs, fetchSaveFile } from './actsCardService.api';

const domain = createDomain('actsCardService');

const $acts = domain.createStore<ApartmentActResponse[]>([]);
const getPreviousActs = domain.createEffect<
  number,
  ApartmentActResponsePagedList
>(fetchPreviousActs);

const saveFile = domain.createEvent<DocumentResponse>();
const saveFileFx = domain.createEffect<DocumentResponse, void>(fetchSaveFile);

$acts.on(
  getPreviousActs.doneData,
  (_, actsPagedList) => actsPagedList.items || []
);

const ActsCardGate = createGate<{ apartmentId: number }>();

forward({
  from: ActsCardGate.open.map(({ apartmentId }) => apartmentId),
  to: getPreviousActs,
});

forward({
  from: saveFile,
  to: saveFileFx,
});

export const actsCardService = {
  inputs: { saveFile },
  outputs: {
    $acts,
    $actTypes,
  },
  gates: { ActsCardGate },
};
