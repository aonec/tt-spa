import { getConsuptionRates } from './managementFirmConsumptionRatesService.api';
import { MangingFirmsConsumptionRatesDictionary } from './managementFirmConsumptionRatesService.types';
import { EResourceTypeConsumptionRateResponseDictionaryItem } from 'myApi';
import { createDomain, guard, sample } from 'effector';

const domain = createDomain('managementFirmConsumptionRatesService');

const $consumptionRates = domain.createStore<MangingFirmsConsumptionRatesDictionary>(
  {}
);

const fetchConsumptionRatesFx = domain.createEffect<
  number,
  EResourceTypeConsumptionRateResponseDictionaryItem[]
>(getConsuptionRates);

const loadManagemenFirmConsumptionRates = domain.createEvent<number>();

$consumptionRates.on(
  fetchConsumptionRatesFx.done,
  (prev, { params: managementFirmId, result }) => ({
    ...prev,
    [managementFirmId]: result,
  })
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
