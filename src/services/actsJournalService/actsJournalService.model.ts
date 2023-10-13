import { combine, createDomain, sample } from 'effector';
import { addAct, fetchActs } from './actsJournalService.api';
import {
  AddApartmentActRequest,
  ApartmentActResponsePagedList,
} from 'api/types';
import { message } from 'antd';
import { createGate } from 'effector-react';
import { ActsJournalRequestParams } from './actsJournalService.types';
import { last } from 'lodash';
import dayjs from 'api/dayjs';
import { addressIdSearchService } from './addressIdSearchService';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const domain = createDomain('actsJournalService');

const ActsJournalGate = createGate();

const updateActsFilter = domain.createEvent<ActsJournalRequestParams>();

const setPageNumber = domain.createEvent<number>();

const $actsFilter = domain
  .createStore<ActsJournalRequestParams>({ PageSize: 20, PageNumber: 1 })
  .on(updateActsFilter, (oldFilter, newFilter) => {
    return {
      ...oldFilter,
      ...newFilter,
      PageNumber: 1,
    };
  })
  .on(setPageNumber, (oldFilter, PageNumber) => {
    return { ...oldFilter, PageNumber };
  })
  .reset(ActsJournalGate.close);

const getActs = domain.createEvent();
const getActsFx = domain.createEffect<
  ActsJournalRequestParams,
  ApartmentActResponsePagedList
>(fetchActs);

const $actsPagedData = domain
  .createStore<ApartmentActResponsePagedList | null>(null)
  .on(getActsFx.doneData, (_, data) => data);

const createAct =
  domain.createEvent<Omit<AddApartmentActRequest, 'apartmentId'>>();
const createActFx = domain.createEffect<AddApartmentActRequest, void>(addAct);

const $isCreateLoading = createActFx.pending;
const $isActsLoading = getActsFx.pending;

const actCreated = createActFx.doneData;

actCreated.watch(() => message.success('Акт успешно добавлен'));
createActFx.failData.watch(() => message.error('Ошибка при добавлении акта'));

sample({
  clock: addressSearchService.outputs.$existingCities,
  fn: (cities) => ({ City: last(cities) }),
  target: updateActsFilter,
});

sample({
  source: sample({
    source: addressIdSearchService.outputs.$apartmentSearchId,
    filter: Boolean,
  }),
  clock: createAct,
  fn: (apartmentId, payload) => ({
    ...payload,
    apartmentId,
    actJobDate: dayjs(payload.actJobDate).format('YYYY-MM-DD'),
  }),
  target: createActFx,
});

sample({
  clock: [ActsJournalGate.open, $actsFilter, actCreated],
  target: getActs,
});

sample({
  clock: getActs,
  source: combine(
    $actsFilter,
    ActsJournalGate.status,
    (actsFilter, gateStatus) => ({
      actsFilter,
      gateStatus,
    }),
  ),
  filter: ({ actsFilter, gateStatus }) => {
    return Boolean(actsFilter.City) && gateStatus;
  },
  fn: ({ actsFilter }) => actsFilter,
  target: getActsFx,
});

export const actsJournalService = {
  inputs: {
    createAct,
    updateActsFilter,
    setPageNumber,
    actCreated,
  },
  outputs: {
    $isCreateLoading,
    $actsPagedData,
    $actsFilter,
    $isActsLoading,
  },
  gates: { ActsJournalGate },
};
