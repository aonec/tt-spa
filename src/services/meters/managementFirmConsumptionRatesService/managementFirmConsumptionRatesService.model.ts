import { createEffect, createEvent, createStore } from 'effector';
import { getConsuptionRates } from './managementFirmConsumptionRatesService.api';
import { MangingFirmsConsumptionRatesDictionary } from './managementFirmConsumptionRatesService.types';
import { EResourceTypeConsumptionRateResponseDictionaryItem } from 'api/types';
import { guard, sample } from 'effector';

const $consumptionRates = createStore<MangingFirmsConsumptionRatesDictionary>(
  {},
);

const fetchConsumptionRatesFx = createEffect<
  number,
  EResourceTypeConsumptionRateResponseDictionaryItem[]
>(getConsuptionRates);

const loadManagemenFirmConsumptionRates = createEvent<number>();

$consumptionRates.on(
  fetchConsumptionRatesFx.done,
  (prev, { params: managementFirmId, result }) => ({
    ...prev,
    [managementFirmId]: result,
  }),
);

sample({
  clock: guard({
    source: [$consumptionRates, fetchConsumptionRatesFx.inFlight],
    clock: loadManagemenFirmConsumptionRates,
    filter: ([consumptionRates, inFlight], managementFirmId) => {
      const isLimitsForManagementFirmExists =
        consumptionRates[managementFirmId];

      return inFlight === 0 || !isLimitsForManagementFirmExists;
    },
  }),
  source: loadManagemenFirmConsumptionRates,
  fn: (managementFirmId) => managementFirmId,
  target: fetchConsumptionRatesFx,
});

export const managementFirmConsumptionRatesService = {
  inputs: { loadManagemenFirmConsumptionRates },
  outputs: {
    $consumptionRates,
  },
};
