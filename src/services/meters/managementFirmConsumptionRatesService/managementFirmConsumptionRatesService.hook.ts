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
    | null = useMemo(() => {
    if (!managementFirmId) return null;

    const consumptionRatesArray = consumptionRates[managementFirmId];

    if (!consumptionRatesArray) return null;

    return consumptionRatesArray.reduce(
      (acc, elem) => ({
        ...acc,
        [elem.key!.toString()]: elem.value,
      }),
      {} as ConsumptionRatesDictionary
    );
  }, [consumptionRates, managementFirmId]);

  useEffect(() => {
    console.log(managementFirmId)
    if (managementFirmId) loadConsumptionRates(managementFirmId);
  }, [managementFirmId]);

  return { managementFirmConsumptionRates };
}
