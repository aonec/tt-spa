import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { sample } from 'effector';
import _ from 'lodash';
import { resourceConsumptionFilterService } from './resourceConsumptionFilterService';
import { resourceConsumptionService } from './resourceConsumptionService.model';
import { ConsumptionDataFilter } from './resourceConsumptionService.types';

sample({
  source: resourceConsumptionFilterService.outputs.$resourceConsumptionFilter,
  clock: sample({
    source: resourceConsumptionService.outputs.$summaryConsumption,
    clock: resourceConsumptionFilterService.outputs.$addressesList,
    filter: (summary) => !Boolean(summary),
    fn: (_, addresses) => addresses,
  }),
  fn: (oldFilter, addresses) => {
    return {
      ...oldFilter,
      HousingStockIds: (addresses || []).map((address) => address.id),
    };
  },
  target: resourceConsumptionFilterService.inputs.setFilter,
});

sample({
  source: resourceConsumptionFilterService.outputs.$resourceConsumptionFilter,
  clock: sample({
    source: resourceConsumptionService.outputs.$summaryConsumption,
    clock: resourceConsumptionFilterService.outputs.$addressesList,
    filter: Boolean,
  }),
  fn: (oldFilter) => ({
    ...oldFilter,
    AdditionalHousingStockIds: [],
    HousingStockIds: [],
  }),
  target: resourceConsumptionFilterService.inputs.setFilter,
});

sample({
  source: sample({
    source: $existingCities,
    fn: (cities) => _.last(cities) || null,
  }),
  clock: [
    $existingCities,
    resourceConsumptionService.gates.ResourceConsumptionGate.open,
  ],
  filter: Boolean,
  target: resourceConsumptionFilterService.inputs.selectCity,
});

sample({
  source: resourceConsumptionFilterService.outputs.$houseManagements.map(
    (houseManagements) => _.last(houseManagements)?.id || null,
  ),
  clock: [
    resourceConsumptionFilterService.outputs.$houseManagements,
    resourceConsumptionService.gates.ResourceConsumptionGate.open,
  ],
  filter: Boolean,
  target: resourceConsumptionFilterService.inputs.selectHouseManagememt,
});

sample({
  clock: resourceConsumptionFilterService.outputs.$resourceConsumptionFilter,
  filter: (filter): filter is ConsumptionDataFilter =>
    Boolean(
      filter?.From &&
        filter?.To &&
        filter?.HousingStockIds?.length &&
        filter?.ResourceType,
    ),
  target: resourceConsumptionService.inputs.getConsumptionData,
});

sample({
  clock:
    resourceConsumptionFilterService.outputs.$resourceConsumptionFilter.map(
      (filter) => ({
        ...filter,
        HousingStockIds: filter?.AdditionalHousingStockIds,
      }),
    ),
  filter: (filter): filter is ConsumptionDataFilter =>
    Boolean(
      filter?.From &&
        filter?.To &&
        filter?.HousingStockIds?.length &&
        filter?.ResourceType,
    ),
  target: resourceConsumptionService.inputs.getAdditionalConsumptionData,
});

sample({
  clock: resourceConsumptionService.gates.ResourceConsumptionGate.close,
  target: resourceConsumptionFilterService.inputs.clearFilter,
});
