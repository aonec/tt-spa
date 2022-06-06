import { createDomain, guard, sample } from 'effector';
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

$calculatorsPagedData
  .on(fetchCalculatorsFx.doneData, (_, data) => data)
  .reset(fetchCalculatorsFx.failData);

$searchPayload.on(fetchCalculators, (_, payload) => payload);

sample({
  clock: guard({
    clock: $searchPayload,
    filter: Boolean,
  }),
  fn: (payload) => ({ ...payload, pageSize: 30 }),
  target: fetchCalculatorsFx,
});

export const displayDevicesService = {
  inputs: {
    fetchCalculators,
  },
  outputs: {
    $calculators,
    $loading,
  },
};
