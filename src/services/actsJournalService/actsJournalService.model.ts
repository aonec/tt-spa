import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { addAct, fetchActs } from './actsJournalService.api';
import {
  AddApartmentActRequest,
  ApartmentActResponsePagedList,
} from 'api/types';
import { message } from 'antd';
import { createGate } from 'effector-react';
import { ActsJournalRequestParams } from './actsJournalService.types';
import dayjs from 'api/dayjs';
import { addressIdSearchService } from './addressIdSearchService';

const ActsJournalGate = createGate();

const updateActsFilter = createEvent<ActsJournalRequestParams>();

const setPageNumber = createEvent<number>();

const $actsFilter = createStore<ActsJournalRequestParams>({
  PageSize: 20,
  PageNumber: 1,
})
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

const getActs = createEvent();
const getActsFx = createEffect<
  ActsJournalRequestParams,
  ApartmentActResponsePagedList
>(fetchActs);

const $actsPagedData = createStore<ApartmentActResponsePagedList | null>(
  null,
).on(getActsFx.doneData, (_, data) => data);

const createAct = createEvent<Omit<AddApartmentActRequest, 'apartmentId'>>();
const createActFx = createEffect<AddApartmentActRequest, void>(addAct);

const $isCreateLoading = createActFx.pending;
const $isActsLoading = getActsFx.pending;

const actCreated = createActFx.doneData;

actCreated.watch(() => message.success('Акт успешно добавлен'));
createActFx.failData.watch(() => message.error('Ошибка при добавлении акта'));

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
  source: { actsFilter: $actsFilter, gateStatus: ActsJournalGate.status },
  filter: ({ gateStatus }) => gateStatus,
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
