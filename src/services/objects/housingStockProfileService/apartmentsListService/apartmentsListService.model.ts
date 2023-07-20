import { combine, createDomain, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentListResponsePagedList } from 'api/myApi';
import { getApartmentsList } from './apartmentsListService.api';
import { SegmentType } from './view/ApartmentsView/ApartmentsView.types';

const domain = createDomain('apartmentsListService');

const fetchApartmentsList = domain.createEffect<
  number,
  ApartmentListResponsePagedList
>(getApartmentsList);

const ApartmentsListGate = createGate<{ housingStockId: number }>();

const setCurrentApartmentId = domain.createEvent<number>();

const clearCurrentApartmentId = domain.createEvent();

const $currentApartmentId = domain
  .createStore<number | null>(null)
  .on(setCurrentApartmentId, (_, id) => id)
  .reset(clearCurrentApartmentId);

const $apartmentsPagedList = domain
  .createStore<ApartmentListResponsePagedList | null>(null)
  .on(fetchApartmentsList.doneData, (_, data) => data);

const setCurrentSegment = domain.createEvent<SegmentType>();

const $currentSegment = domain
  .createStore<SegmentType>('cells')
  .on(setCurrentSegment, (_, segment) => segment);

sample({
  source: ApartmentsListGate.state.map(({ housingStockId }) => housingStockId),
  clock: guard({
    source: combine(
      $apartmentsPagedList,
      ApartmentsListGate.state.map(({ housingStockId }) => housingStockId),
    ),
    clock: ApartmentsListGate.open,
    filter: ([apartmentsPagedList, housingStockId]) => {
      const apartmentHosuingStockId =
        apartmentsPagedList?.items?.[0]?.housingStock?.id;

      return apartmentHosuingStockId !== housingStockId;
    },
  }),
  target: fetchApartmentsList,
});

const $isLoading = fetchApartmentsList.pending;

export const apartmentsListService = {
  outputs: {
    $apartmentsPagedList,
    $isLoading,
    $currentSegment,
    $currentApartmentId,
  },
  inputs: {
    setCurrentSegment,
    setCurrentApartmentId,
    clearCurrentApartmentId,
  },
  gates: { ApartmentsListGate, setCurrentSegment },
};
