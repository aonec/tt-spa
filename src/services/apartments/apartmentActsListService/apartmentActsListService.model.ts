import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample } from 'effector';
import { createGate } from 'effector-react';
import dayjs from 'api/dayjs';
import {
  ApartmentActResponse,
  DocumentResponse,
  EActResourceType,
  EActType,
} from 'api/types';
import {
  getapartmentActsList,
  saveFileRequest,
} from './apartmentActsListService.api';
import { ActsFilter } from './apartmentActsListService.types';

const $actsList = createStore<ApartmentActResponse[]>([]);
const $actsFilter = createStore<ActsFilter>({
  actTypes: [],
  resources: [],
} as ActsFilter);

const fetchActsListFx = createEffect<number, ApartmentActResponse[]>(
  getapartmentActsList,
);

const ApartmentActsListGate = createGate<{ apartmentId: number }>();

const $isLoading = fetchActsListFx.pending;

const refetchApartmentActs = createEvent();

const saveFile = createEvent<DocumentResponse>();
const saveFileFx = createEffect<DocumentResponse, void>(saveFileRequest);

const updateType = createEvent<EActType[]>();
const updateResources = createEvent<EActResourceType[]>();
$actsFilter
  .on(updateType, (filter, actTypes) => ({ ...filter, actTypes }))
  .on(updateResources, (filter, resources) => ({ ...filter, resources }));

const $filteredActsList = combine($actsList, $actsFilter, (acts, filters) => {
  const hasActTypes = filters.actTypes?.length;
  const hasActResources = filters.resources?.length;

  let filteredActs = acts.sort((first, second) =>
    dayjs(second.actJobDate).diff(dayjs(first.actJobDate)),
  );

  if (hasActTypes) {
    filteredActs = filteredActs.filter((act) =>
      filters.actTypes.includes(act.actType),
    );
  }
  if (hasActResources) {
    filteredActs = filteredActs.filter((act) =>
      filters.resources.includes(act.actResourceType),
    );
  }

  return filteredActs;
});

sample({
  clock: saveFile,
  target: saveFileFx,
});

const $apartmentId = ApartmentActsListGate.state.map(
  ({ apartmentId }) => apartmentId || null,
);

sample({
  clock: refetchApartmentActs,
  source: $apartmentId,
  filter: (id): id is number => Boolean(id),
  target: fetchActsListFx,
});

sample({
  clock: ApartmentActsListGate.state.map(
    ({ apartmentId }) => apartmentId || null,
  ),
  filter: (id): id is number => Boolean(id),
  target: fetchActsListFx,
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
    $actsFilter,
  },
  gates: { ApartmentActsListGate },
};
