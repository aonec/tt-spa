import { createEffect, createEvent, createStore } from 'effector';
import { forward } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentActResponse,
  ApartmentActResponsePagedList,
  DocumentResponse,
} from 'api/types';
import { fetchPreviousActs, fetchSaveFile } from './actsCardService.api';

const $acts = createStore<ApartmentActResponse[]>([]);
const getPreviousActs = createEffect<number, ApartmentActResponsePagedList>(
  fetchPreviousActs,
);

const saveFile = createEvent<DocumentResponse>();
const saveFileFx = createEffect<DocumentResponse, void>(fetchSaveFile);

$acts.on(
  getPreviousActs.doneData,
  (_, actsPagedList) => actsPagedList.items || [],
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
  },
  gates: { ActsCardGate },
};
