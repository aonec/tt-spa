import { $actTypes } from '01/features/actsJournal/displayActTypes/models';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import {  ApartmentActResponse, ApartmentCheckResponse } from 'myApi';
import {
  getapartmentActsList,
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

sample({
  source: ApartmentActsListGate.state.map(({ apartmentId }) => apartmentId),
  clock: [ApartmentActsListGate.state, refetchApartmentActs],
  target: fetchActsListFx,
});


$actsList.on(fetchActsListFx.doneData, (_, actsList) => actsList);

export const apartmentActsListService = {
  inputs: {
    refetchApartmentActs
  },
  outputs: {
    $actsList,
    $isLoading,
    $actTypes,
  },
  gates: { ApartmentActsListGate },
};
