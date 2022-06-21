import { createDomain, forward, guard, sample } from 'effector';
import { getCalculatorsList } from './displayDevicesService.api';
import { CalculatorListResponse, CalculatorListResponsePagedList } from 'myApi';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculators/types';

const domain = createDomain('displayDevicesService');

const $calculatorsPagedData = domain.createStore<CalculatorListResponsePagedList | null>(
  null
);

const $calculators = $calculatorsPagedData.map((data) => data?.items || []);

const fetchCalculatorsFx = domain.createEffect<
  CalculatorsListRequestPayload,
  CalculatorListResponsePagedList
>(getCalculatorsList);

const fetchCalculators = domain.createEvent<CalculatorsListRequestPayload>();

const $loading = fetchCalculatorsFx.pending;

const $searchPayload = domain.createStore<CalculatorsListRequestPayload | null>(
  null
);

const extendedSearchOpened = domain.createEvent<CalculatorsListRequestPayload | null>();
const extendedSearchClosed = domain.createEvent<CalculatorsListRequestPayload | null>();

const applyFilters = domain.createEvent<CalculatorsListRequestPayload | null>();
const clearForm = domain.createEvent<CalculatorsListRequestPayload | null>();

$calculatorsPagedData
  .on(fetchCalculatorsFx.doneData, (_, data) => data)
  .reset(fetchCalculatorsFx.failData);

const $total = $calculatorsPagedData.map((state) => state?.totalItems);
const $pageNumber = $calculatorsPagedData.map((state) => state?.pageNumber);
const $pageSize = $calculatorsPagedData.map((state) => state?.pageSize);

const setPageNumber = domain.createEvent<number>();

$searchPayload
  .on(fetchCalculators, (_, payload) => payload)
  .on(setPageNumber, (state, pageNumber) => ({
    ...state,
    PageNumber: pageNumber,
  }))

sample({
  clock: guard({
    clock: $searchPayload,
    filter: Boolean,
  }),
  fn: (payload) => ({ ...payload, pageSize: 10 }),
  target: fetchCalculatorsFx,
});

const $isExtendedSearchOpen = domain.createStore(false);

$isExtendedSearchOpen
  .on(extendedSearchOpened, () => true)
  .reset(extendedSearchClosed);

forward({
  from: applyFilters,
  to: [fetchCalculators, extendedSearchClosed],
});

export const displayDevicesService = {
  inputs: {
    fetchCalculators,
    extendedSearchOpened,
    extendedSearchClosed,
    setPageNumber,
    clearForm
  },
  outputs: {
    $total,
    $calculators,
    $loading,
    $isExtendedSearchOpen,
    $pageNumber,
    $pageSize,
  },
};
