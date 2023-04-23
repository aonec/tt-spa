import { createDomain, sample } from 'effector';
import { addAct, fetchActs } from './actsJournalService.api';
import { AddApartmentActRequest, ApartmentActResponsePagedList } from 'myApi';
import { message } from 'antd';
import { createGate } from 'effector-react';
import { $apartmentSearchId } from '01/features/addressIdSearch/models';
import { ActsJournalRequestParams } from './actsJournalService.types';
import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { last } from 'lodash';

const domain = createDomain('actsJournalService');

const setActsFilter = domain.createEvent<ActsJournalRequestParams>();
const setPageNumber = domain.createEvent<number>();
const $actsFilter = domain
  .createStore<ActsJournalRequestParams>({ PageSize: 20, PageNumber: 1 })
  .on(setActsFilter, (oldFilter, newFilter) => ({
    ...oldFilter,
    ...newFilter,
    PageNumber: 1,
  }))
  .on(setPageNumber, (oldFilter, PageNumber) => ({ ...oldFilter, PageNumber }));

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

const ActsJournalGate = createGate();

const $isCreateLoading = createActFx.pending;
const $isActsLoading = getActsFx.pending;

const actCreated = createActFx.doneData;

actCreated.watch(() => message.success('Акт успешно добавлен'));
createActFx.failData.watch(() => message.error('Ошибка при добавлении акта'));

sample({
  clock: $existingCities,
  fn: (cities) => ({ City: last(cities) }),
  target: setActsFilter,
});

sample({
  source: sample({
    source: $apartmentSearchId,
    filter: Boolean,
  }),
  clock: createAct,
  fn: (apartmentId, payload) => ({ ...payload, apartmentId }),
  target: createActFx,
});

sample({
  clock: [ActsJournalGate.open, $actsFilter, actCreated],
  target: getActs,
});

sample({
  source: $actsFilter,
  filter: (filter) => Boolean(filter.City),
  clock: getActs,
  target: getActsFx,
});

export const actsJournalService = {
  inputs: {
    createAct,
    setActsFilter,
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
