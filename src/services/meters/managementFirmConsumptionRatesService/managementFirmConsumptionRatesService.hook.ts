import { useEffect, useMemo } from 'react';
import {
  ConsumptionRatesDictionary,
  MangingFirmsConsumptionRatesDictionary,
} from './managementFirmConsumptionRatesService.types';

export function useManagingFirmConsumptionRates(
  consumptionRates: MangingFirmsConsumptionRatesDictionary,
  loadConsumptionRates: (payload: number) => number,
  managementFirmId?: number | null
) {
  const managementFirmConsumptionRates:
    | ConsumptionRatesDictionary
    | undefined = useMemo(() => {
    if (!managementFirmId) return;

    const consumptionRatesArray = consumptionRates[managementFirmId];

    if (!consumptionRatesArray) return;

    return consumptionRatesArray.reduce(
      (acc, elem) => ({
        ...acc,
        [elem.key!.toString()]: elem.value,
      }),
      {} as ConsumptionRatesDictionary
    );
  }, [consumptionRates, managementFirmId]);

  useEffect(() => {
    if (managementFirmId) loadConsumptionRates(managementFirmId);
  }, [managementFirmId]);

  return { managementFirmConsumptionRates };
}
