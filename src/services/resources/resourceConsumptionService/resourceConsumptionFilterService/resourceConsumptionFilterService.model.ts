import { combine, createDomain, sample } from 'effector';
import {
  EResourceType,
  HouseManagementWithStreetsResponse,
  StreetWithHousingStockNumbersResponse,
} from 'myApi';
import {
  prepareAddressesForTreeSelect,
  prepareAddressesWithParentsForTreeSelect,
} from 'ui-kit/shared_components/AddressTreeSelect/AddressTreeSelect.utils';
import {
  ConsumptionDataFilter,
  GetConsumptionDataFilter,
} from '../resourceConsumptionService.types';
import { getAddressSearchData } from '../resourceConsumptionService.utils';
import { fetchAddresses } from './resourceConsumptionFilterService.api';
import moment from 'moment';
import { resourceConsumptionService } from '../resourceConsumptionService.model';

const domain = createDomain('resourceConsumptionFilterService');

const clearFilter = domain.createEvent();

const getAddressesFx = domain.createEffect<
  string,
  HouseManagementWithStreetsResponse[]
>(fetchAddresses);

const selectCity = domain.createEvent<string>();
const $selectedCity = domain
  .createStore<string | null>(null)
  .on(selectCity, (_, city) => city);

const selectHouseManagememt = domain.createEvent<string | null>();
const $selectedHouseManagement = domain
  .createStore<string | null>(null)
  .on(selectHouseManagememt, (_, id) => id)
  .reset(clearFilter);

const $houseManagements = domain
  .createStore<HouseManagementWithStreetsResponse[]>([])
  .on(getAddressesFx.doneData, (_, houseManagements) => houseManagements)
  .reset(resourceConsumptionService.inputs.clearSummary);

const setFilter = domain.createEvent<GetConsumptionDataFilter>();
const setResource = domain.createEvent<EResourceType>();
const $resourceConsumptionFilter = domain
  .createStore<ConsumptionDataFilter>({
    ResourceType: EResourceType.ColdWaterSupply,
    From: moment().startOf('month').utcOffset(0, true).format(),
    To: moment().endOf('month').utcOffset(0, true).format(),
    AdditionalHousingStockIds: [],
    HousingStockIds: [],
  })
  .on(setResource, (oldFilter, ResourceType) => ({
    ...oldFilter,
    ResourceType,
  }))
  .on(setFilter, (oldFilter, filter) => ({
    ...oldFilter,
    ...filter,
    To: moment(filter.From).endOf('month').utcOffset(0, true).format(),
  }))
  .reset(clearFilter);

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

const $treeData = combine(
  $houseManagements,
  $selectedHouseManagement,
  (houseManagements, selectedHouseManagement) => {
    if (!selectedHouseManagement) {
      return prepareAddressesWithParentsForTreeSelect(houseManagements);
    }
    const requiredHouseManagements = houseManagements.find(
      (houseManagement) => houseManagement.id === selectedHouseManagement,
    );
    return prepareAddressesForTreeSelect({
      items: requiredHouseManagements?.streets || [],
    });
  },
);

sample({
  source: $selectedCity,
  clock: [
    $selectedCity,
    resourceConsumptionService.gates.ResourceConsumptionGate.open,
  ],
  filter: Boolean,
  target: getAddressesFx,
});

export const resourceConsumptionFilterService = {
  inputs: {
    selectCity,
    selectHouseManagememt,
    setFilter,
    setResource,
    clearFilter,
  },
  outputs: {
    $treeData,
    $addressesList,
    $selectedHouseManagement,
    $selectedCity,
    $houseManagements,
    $resourceConsumptionFilter,
  },
};
