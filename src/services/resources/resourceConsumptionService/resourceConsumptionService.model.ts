import { createDomain, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';
import {
  DateTimeDoubleDictionaryItem,
  EResourceType,
  GetDataForHousingConsumptionPlotResponse,
} from 'myApi';
import {
  fetchHousingConsumptionData,
  fetchHousingConsumptionsForTwoMonth,
} from './resourceConsumptionService.api';
import {
  HousingConsumptionDataFilter,
  GetHousingConsumptionDataFormik,
  HousingConsumptionDataForTwoMonth,
} from './resourceConsumptionService.types';

const domain = createDomain('resourceConsumptionService');

const clearStore = domain.createEvent();

const setFilter = domain.createEvent<GetHousingConsumptionDataFormik>();
const setResource = domain.createEvent<EResourceType>();
const $resourceConsumptionFilter = domain
  .createStore<Partial<HousingConsumptionDataFilter> | null>(null)
  .on(setResource, (oldFilter, ResourceType) => ({
    ...oldFilter,
    ResourceType,
  }))
  .on(setFilter, (oldFilter, filter) => ({
    ...oldFilter,
    ...filter,
    To: moment(filter.From).endOf('month').utcOffset(0, true).format(),
  }))
  .reset(clearStore);

const getHousingConsumptionFx = domain.createEffect<
  HousingConsumptionDataFilter,
  HousingConsumptionDataForTwoMonth
>(fetchHousingConsumptionsForTwoMonth);

const $housingConsumptionData = domain
  .createStore<HousingConsumptionDataForTwoMonth | null>(null)
  .on(getHousingConsumptionFx.doneData, (_, data) => data)
  .reset(clearStore);

const ResourceConsumptionGate = createGate();

const $isLoading = getHousingConsumptionFx.pending;

guard({
  source: $resourceConsumptionFilter,
  filter: (filter): filter is HousingConsumptionDataFilter =>
    Boolean(
      filter?.From &&
        filter?.To &&
        filter?.HousingStockId &&
        filter?.ResourceType
    ),
  target: getHousingConsumptionFx,
});

forward({
  from: ResourceConsumptionGate.close,
  to: clearStore,
});

export const resourceConsumptionService = {
  inputs: {
    setResource,
    setFilter,
  },
  outputs: {
    $housingConsumptionData,
    $isLoading,
    $resourceConsumptionFilter,
  },
  gates: { ResourceConsumptionGate },
};
$resourceConsumptionFilter.watch(console.log);
