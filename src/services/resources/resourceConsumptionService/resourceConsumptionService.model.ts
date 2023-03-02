import { combine, createDomain, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';
import {
  EResourceType,
  HouseManagementWithStreetsResponse,
  StreetWithHousingStockNumbersResponse,
} from 'myApi';
import {
  fetchAddresses,
  fetchConsumptionsForMonth,
  fetchConsumptionsForTwoMonth,
} from './resourceConsumptionService.api';
import { initialSelectedGraphTypes } from './resourceConsumptionService.constants';
import {
  ConsumptionDataFilter,
  GetConsumptionDataFilter,
  ConsumptionDataForTwoMonth,
  MonthConsumptionData,
} from './resourceConsumptionService.types';
import { getAddressSearchData } from './resourceConsumptionService.utils';
import { BooleanTypesOfResourceConsumptionGraphForTwoMonth } from './view/ResourceConsumptionProfile/ResourceConsumptionProfile.types';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('resourceConsumptionService');

const clearStore = domain.createEvent();

const getAddressesFx = domain.createEffect<
  void,
  HouseManagementWithStreetsResponse[]
>(fetchAddresses);

const selectHouseManagememt = domain.createEvent<string | null>();

const $selectedHouseManagement = domain
  .createStore<string | null>(null)
  .on(selectHouseManagememt, (_, id) => id)
  .reset(getAddressesFx.doneData);

const $houseManagements = domain
  .createStore<HouseManagementWithStreetsResponse[]>([])
  .on(getAddressesFx.doneData, (_, houseManagements) => houseManagements);

const $addressesList = combine(
  $houseManagements,
  $selectedHouseManagement,
  (houseManagements, selectedHouseManagement) => {
    if (!selectedHouseManagement) {
      const streets = houseManagements.reduce(
        (acc, houseManagement) => [...acc, ...(houseManagement.streets || [])],
        [] as StreetWithHousingStockNumbersResponse[],
      );

      return getAddressSearchData(streets);
    }

    const requiredHouseManagements = houseManagements.find(
      (houseManagement) => houseManagement.id === selectedHouseManagement,
    );

    return getAddressSearchData(requiredHouseManagements?.streets || []);
  },
);

const setFilter = domain.createEvent<GetConsumptionDataFilter>();
const setResource = domain.createEvent<EResourceType>();
const $resourceConsumptionFilter = domain
  .createStore<Partial<ConsumptionDataFilter> | null>(null)
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
  ConsumptionDataFilter,
  ConsumptionDataForTwoMonth,
  EffectFailDataAxiosError
>(fetchConsumptionsForTwoMonth);

const clearData = domain.createEvent();

const $housingConsumptionData = domain
  .createStore<ConsumptionDataForTwoMonth | null>(null)
  .on(getHousingConsumptionFx.doneData, (_, data) => data)
  .reset(clearData);

const clearAdditionalAddress = domain.createEvent();
const getAdditionalConsumptionFx = domain.createEffect<
  ConsumptionDataFilter,
  MonthConsumptionData
>(fetchConsumptionsForMonth);
const $additionalConsumption = domain
  .createStore<MonthConsumptionData | null>(null)
  .on(getAdditionalConsumptionFx.doneData, (_, data) => data)
  .reset(clearData)
  .reset(clearAdditionalAddress);

const setSelectedGraphTypes =
  domain.createEvent<BooleanTypesOfResourceConsumptionGraphForTwoMonth>();
const $selectedGraphTypes = domain
  .createStore<BooleanTypesOfResourceConsumptionGraphForTwoMonth>(
    initialSelectedGraphTypes,
  )
  .on(setSelectedGraphTypes, (_, selected) => selected)
  .reset(clearData);

const ResourceConsumptionGate = createGate();

const $isLoading = getHousingConsumptionFx.pending;

guard({
  clock: $resourceConsumptionFilter.map((filter) => ({
    ...filter,
    HousingStockId: filter?.AdditionalHousingStockId,
  })),
  filter: (filter): filter is ConsumptionDataFilter =>
    Boolean(
      filter?.From &&
        filter?.To &&
        filter?.HousingStockId &&
        filter?.ResourceType,
    ),
  target: getAdditionalConsumptionFx,
});

guard({
  source: $resourceConsumptionFilter,
  filter: (filter): filter is ConsumptionDataFilter =>
    Boolean(
      filter?.From &&
        filter?.To &&
        filter?.HousingStockId &&
        filter?.ResourceType,
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

getHousingConsumptionFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const resourceConsumptionService = {
  inputs: {
    setResource,
    setFilter,
    selectHouseManagememt,
    clearData,
    clearStore,
    setSelectedGraphTypes,
    clearAdditionalAddress,
  },
  outputs: {
    $housingConsumptionData,
    $isLoading,
    $resourceConsumptionFilter,
    $addressesList,
    $selectedHouseManagement,
    $houseManagements,
    $selectedGraphTypes,
    $additionalConsumption,
  },
  gates: { ResourceConsumptionGate },
};
