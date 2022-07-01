import { useEffect, useMemo } from 'react';
import { useStore, useEvent } from 'effector-react';
import { managementFirmConsumptionRatesService } from './managementFirmConsumptionRatesService.model';
import { ConsumptionRatesDictionary } from './managementFirmConsumptionRatesService.types';

const { outputs, inputs } = managementFirmConsumptionRatesService;

export function useManagingFirmConsumptionRates(
  managementFirmId?: number | null
) {
  const consumptionRates = useStore(outputs.$consumptionRates);

  const managementFirmConsumptionRates: ConsumptionRatesDictionary | void = useMemo(() => {
    if (!managementFirmId) return;

    const consumptionRatesArray = consumptionRates[managementFirmId];

    if (!consumptionRatesArray) return;

    return consumptionRatesArray.reduce(
      (acc, elem) => ({ ...acc, [elem.key!.toString()]: elem.value }),
      {} as ConsumptionRatesDictionary
    );
  }, [consumptionRates]);

  const loadConsumptionRates = useEvent(
    inputs.loadManagemenFirmConsumptionRates
  );

  useEffect(() => {
    if (managementFirmId) loadConsumptionRates(managementFirmId);
  }, [managementFirmId]);

  return managementFirmConsumptionRates;
}
