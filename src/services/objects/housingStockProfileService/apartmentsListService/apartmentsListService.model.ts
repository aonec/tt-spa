import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentListResponsePagedList } from 'api/types';
import { getApartmentsList } from './apartmentsListService.api';
import { SegmentType } from './view/ApartmentsView/ApartmentsView.types';

const fetchApartmentsList = createEffect<
  number,
  ApartmentListResponsePagedList
>(getApartmentsList);

const ApartmentsListGate = createGate<{ housingStockId: number }>();

const setCurrentApartmentId = createEvent<number>();

const clearCurrentApartmentId = createEvent();

const $currentApartmentId = createStore<number | null>(null)
  .on(setCurrentApartmentId, (_, id) => id)
  .reset(clearCurrentApartmentId);

const $apartmentsPagedList = createStore<ApartmentListResponsePagedList | null>(
  null,
).on(fetchApartmentsList.doneData, (_, data) => data);

const setCurrentSegment = createEvent<SegmentType>();

const $currentSegment = createStore<SegmentType>('cells').on(
  setCurrentSegment,
  (_, segment) => segment,
);

const $housingStockId = ApartmentsListGate.state.map(
  ({ housingStockId }) => housingStockId || null,
);

sample({
  source: $housingStockId,
  filter: Boolean,
  clock: sample({
    source: combine($apartmentsPagedList, $housingStockId),
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
