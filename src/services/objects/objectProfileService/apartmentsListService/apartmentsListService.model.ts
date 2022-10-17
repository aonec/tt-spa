import { combine, createDomain, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { ApartmentListResponsePagedList } from 'myApi';
import { getApartmentsList } from './apartmentsListService.api';

const domain = createDomain('apartmentsListService');

const fetchApartmentsList = domain.createEffect<
  number,
  ApartmentListResponsePagedList
>(getApartmentsList);

const ApartmentsListGate = createGate<{ housingStockId: number }>();

const $apartmentsPagedList = domain.createStore<ApartmentListResponsePagedList | null>(
  null
);

$apartmentsPagedList.on(fetchApartmentsList.doneData, (_, data) => data);

sample({
  source: ApartmentsListGate.state.map(({ housingStockId }) => housingStockId),
  clock: guard({
    source: combine(
      $apartmentsPagedList,
      ApartmentsListGate.state.map(({ housingStockId }) => housingStockId)
    ),
    clock: ApartmentsListGate.open,
    filter: ([apartmentsPagedList, housingStockId]) => {
      const apartment = apartmentsPagedList?.items?.[0];

      if (!apartment) return true;

      if (apartment.housingStock?.id === housingStockId) return false;

      return true;
    },
  }),
  target: fetchApartmentsList,
});

const $isLoading = fetchApartmentsList.pending;

export const apartmentsListService = {
  outputs: {
    $apartmentsPagedList,
    $isLoading,
  },
  gates: { ApartmentsListGate },
};
