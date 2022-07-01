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
    source: $consumptionRates,
    clock: loadManagemenFirmConsumptionRates,
    filter: (consumptionRates, managementFirmId) => {
      return !consumptionRates[managementFirmId];
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
