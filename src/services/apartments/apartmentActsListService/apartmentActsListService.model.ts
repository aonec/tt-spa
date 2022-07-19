import { $actTypes } from '01/features/actsJournal/displayActTypes/models';
import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentActResponse,
  DocumentResponse,
  EActResourceType,
  EActType,
} from 'myApi';
import {
  getapartmentActsList,
  saveFileRequest,
} from './apartmentActsListService.api';
import { ActsFilter } from './apartmentActsListService.types';

const domain = createDomain('apartmentActsListService');

const $actsList = domain.createStore<ApartmentActResponse[]>([]);
const $actsFilter = domain.createStore<ActsFilter>({} as ActsFilter);

const fetchActsListFx = domain.createEffect<number, ApartmentActResponse[]>(
  getapartmentActsList
);

const ApartmentActsListGate = createGate<{ apartmentId: number }>();

const $isLoading = fetchActsListFx.pending;

const refetchApartmentActs = domain.createEvent();

const saveFile = domain.createEvent<DocumentResponse>();
const saveFileFx = domain.createEffect<DocumentResponse, void>(saveFileRequest);

const updateType = domain.createEvent<EActType[]>();
const updateResources = domain.createEvent<EActResourceType[]>();
$actsFilter
  .on(updateType, (filter, actTypes) => ({ ...filter, actTypes }))
  .on(updateResources, (filter, resources) => ({ ...filter, resources }));

const $filteredActsList = combine($actsList, $actsFilter, (acts, filters) => {
  const hasActTypes = filters.actTypes?.length;
  const hasActResources = filters.resources?.length;

  let filteredActs = acts;

  if (hasActTypes) {
    filteredActs = filteredActs.filter((act) =>
      filters.actTypes.includes(act.actType)
    );
  }
  if (hasActResources) {
    filteredActs = filteredActs.filter((act) =>
      filters.resources.includes(act.actResourceType)
    );
  }

  return filteredActs;
});

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
    updateType,
    updateResources,
  },
  outputs: {
    $filteredActsList,
    $isLoading,
    $actTypes,
    $actsFilter,
  },
  gates: { ApartmentActsListGate },
};
