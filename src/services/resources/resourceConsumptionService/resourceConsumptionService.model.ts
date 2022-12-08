import { combine, createDomain, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';
import { EResourceType, HouseManagementWithStreetsResponse } from 'myApi';
import {
  fetchAddresses,
  fetchHousingConsumptionsForTwoMonth,
} from './resourceConsumptionService.api';
import {
  HousingConsumptionDataFilter,
  GetHousingConsumptionDataFormik,
  HousingConsumptionDataForTwoMonth,
} from './resourceConsumptionService.types';
import { getAddressSearchData } from './resourceConsumptionService.utils';

const domain = createDomain('resourceConsumptionService');

const clearStore = domain.createEvent();

const getAddressesFx = domain.createEffect<
  void,
  HouseManagementWithStreetsResponse[]
>(fetchAddresses);

const selectHouseManagememt = domain.createEvent<string>();
const $selectedHouseManagement = domain
  .createStore<string>('')
  .on(selectHouseManagememt, (_, id) => id)
  .reset(getAddressesFx.doneData);

const $houseManagements = domain
  .createStore<HouseManagementWithStreetsResponse[]>([])
  .on(getAddressesFx.doneData, (_, houseManagements) => houseManagements);

const $addressesList = combine(
  $houseManagements,
  $selectedHouseManagement,
  (houseManagements, selectedHouseManagement) => {
    const requiredHouseManagements = houseManagements.find(
      (houseManagement) => houseManagement.id === selectedHouseManagement
    );

    return getAddressSearchData(requiredHouseManagements?.streets || []);
  }
);

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

const clearData = domain.createEvent();

const $housingConsumptionData = domain
  .createStore<HousingConsumptionDataForTwoMonth | null>(null)
  .on(getHousingConsumptionFx.doneData, (_, data) => data)
  .reset(clearData);

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
  to: [clearStore, clearData],
});

forward({
  from: getHousingConsumptionFx.failData,
  to: clearData,
});

guard({
  source: $houseManagements,
  clock: ResourceConsumptionGate.open,
  filter: (arr) => !arr.length,
  target: getAddressesFx,
});

export const resourceConsumptionService = {
  inputs: {
    setResource,
    setFilter,
    selectHouseManagememt,
  },
  outputs: {
    $housingConsumptionData,
    $isLoading,
    $resourceConsumptionFilter,
    $addressesList,
    $selectedHouseManagement,
    $houseManagements,
  },
  gates: { ResourceConsumptionGate },
};
