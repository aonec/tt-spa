import { combine, sample } from 'effector';
import _ from 'lodash';
import { resourceConsumptionFilterService } from './resourceConsumptionFilterService';
import { resourceConsumptionService } from './resourceConsumptionService.model';
import { ConsumptionDataPayload } from './resourceConsumptionService.types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

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
      BuildingIds: (addresses || []).map((address) => address.id),
    };
  },
  target: resourceConsumptionFilterService.inputs.setFilter,
});

sample({
  source: sample({
    source: addressSearchService.outputs.$existingCities,
    fn: (cities) => _.last(cities) || null,
  }),
  clock: sample({
    source: resourceConsumptionService.gates.ResourceConsumptionGate.open,
    clock: [
      addressSearchService.outputs.$existingCities,
      resourceConsumptionService.gates.ResourceConsumptionGate.open,
    ],
    filter: (isOpen) => Boolean(isOpen),
  }),
  filter: Boolean,
  target: resourceConsumptionFilterService.inputs.selectCity,
});

sample({
  clock: [
    resourceConsumptionFilterService.outputs.$houseManagements,
    resourceConsumptionService.gates.ResourceConsumptionGate.open,
  ],
  source: resourceConsumptionFilterService.outputs.$houseManagements,
  fn: (houseManagements) => {
    const isHasGoldHouseManagement = Boolean(
      houseManagements.find(
        (houseManagement) =>
          houseManagement.id === 'c5760f48-6ea0-4267-a643-e84cfc78d9d0',
      )?.id,
    );
    if (isHasGoldHouseManagement) {
      return 'c5760f48-6ea0-4267-a643-e84cfc78d9d0';
    } else {
      return _.last(houseManagements)?.id || null;
    }
  },
  target: resourceConsumptionFilterService.inputs.selectHouseManagememt,
});

sample({
  source: combine(
    resourceConsumptionFilterService.outputs.$resourceConsumptionFilter,
    resourceConsumptionFilterService.outputs.$selectedResource,
    (filter, ResourceType) => {
      return {
        ...filter,
        ResourceType,
      };
    },
  ),
  clock: resourceConsumptionFilterService.outputs.$resourceConsumptionFilter,
  filter: (filter): filter is ConsumptionDataPayload =>
    Boolean(
      filter?.From &&
        filter?.To &&
        filter?.BuildingIds?.length &&
        filter?.ResourceType,
    ),
  target: resourceConsumptionService.inputs.getSummaryConsumptions,
});

sample({
  clock: combine(
    resourceConsumptionFilterService.outputs.$resourceConsumptionFilter,
    resourceConsumptionFilterService.outputs.$selectedResource,
    (filter, ResourceType) => {
      return {
        ...filter,
        ResourceType,
      };
    },
  ),
  filter: (filter): filter is ConsumptionDataPayload =>
    Boolean(filter?.From && filter?.To && filter?.BuildingIds?.length),
  target: resourceConsumptionService.inputs.getConsumptionData,
});

sample({
  clock: combine(
    resourceConsumptionFilterService.outputs.$resourceConsumptionFilter,
    resourceConsumptionFilterService.outputs.$selectedResource,
    (filter, ResourceType) => {
      return {
        ...filter,
        ResourceType,
        BuildingIds: filter?.AdditionalHousingStockIds,
      };
    },
  ),
  filter: (filter): filter is ConsumptionDataPayload =>
    Boolean(
      filter?.From &&
        filter?.To &&
        filter?.BuildingIds?.length &&
        filter?.ResourceType,
    ),
  target: resourceConsumptionService.inputs.getAdditionalConsumptionData,
});

sample({
  clock: resourceConsumptionService.gates.ResourceConsumptionGate.close,
  target: resourceConsumptionFilterService.inputs.clearFilter,
});

sample({
  clock: [
    resourceConsumptionService.inputs.getHousingConsumptionSuccess,
    resourceConsumptionService.inputs.getPrevHousingConsumptionSuccess,
    resourceConsumptionService.inputs
      .getNormativeAndSubscriberConsumptionSuccess,
    resourceConsumptionService.inputs
      .getPrevNormativeAndSubscriberConsumptionSuccess,
  ],
  source: resourceConsumptionFilterService.outputs.$selectedResource,
  target: resourceConsumptionFilterService.outputs.$selectedResourceForColor,
});
