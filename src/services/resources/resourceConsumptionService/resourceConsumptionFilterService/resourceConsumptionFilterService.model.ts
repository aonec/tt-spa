import { combine, createDomain, sample } from 'effector';
import {
  EResourceType,
  HouseManagementWithStreetsResponse,
  StreetWithBuildingNumbersResponse,
} from 'myApi';
import {
  prepareAddressesForTreeSelect,
  prepareAddressesWithParentsForTreeSelect,
} from 'ui-kit/shared_components/AddressTreeSelect/AddressTreeSelect.utils';
import { getAddressSearchData } from '../resourceConsumptionService.utils';
import { fetchAddresses } from './resourceConsumptionFilterService.api';
import moment from 'moment';
import { resourceConsumptionService } from '../resourceConsumptionService.model';
import { ConsumptionDataFilter } from './resourceConsumptionFilterService.types';

const domain = createDomain('resourceConsumptionFilterService');

const clearFilter = domain.createEvent();

const setResourceConsumptionAddressLoading =
  resourceConsumptionService.inputs.setResourceConsumptionAddressLoading;

const getAddressesFx = domain.createEffect<
  string,
  HouseManagementWithStreetsResponse[]
>(fetchAddresses);

const selectCity = domain.createEvent<string>();
const $selectedCity = domain
  .createStore<string | null>(null)
  .on(selectCity, (_, city) => city)
  .reset(resourceConsumptionService.gates.ResourceConsumptionGate.close);

const selectHouseManagememt = domain.createEvent<string | null>();
const $selectedHouseManagement = domain
  .createStore<string | null>(null)
  .on(selectHouseManagememt, (_, id) => id)
  .reset(clearFilter);

const $houseManagements = domain
  .createStore<HouseManagementWithStreetsResponse[]>([])
  .on(getAddressesFx.doneData, (_, houseManagements) => houseManagements)
  .reset(resourceConsumptionService.gates.ResourceConsumptionGate.close);

const setResource = domain.createEvent<EResourceType>();
const $selectedResource = domain
  .createStore<EResourceType>(EResourceType.ColdWaterSupply)
  .on(setResource, (_, resource) => resource)
  .reset(clearFilter);

const setFilter = domain.createEvent<ConsumptionDataFilter>();
const $resourceConsumptionFilter = domain
  .createStore<ConsumptionDataFilter>({
    From: moment().startOf('month').utcOffset(0, true).format(),
    To: moment().endOf('month').utcOffset(0, true).format(),
    AdditionalHousingStockIds: [],
    BuildingIds: [],
  })
  .on(setFilter, (oldFilter, filter) => ({
    ...oldFilter,
    ...filter,
  }))
  .reset(clearFilter);

const $addressesList = combine(
  $houseManagements,
  $selectedHouseManagement,
  (houseManagements, selectedHouseManagement) => {
    if (!selectedHouseManagement) {
      const streets = houseManagements.reduce(
        (acc, houseManagement) => [...acc, ...(houseManagement.streets || [])],
        [] as StreetWithBuildingNumbersResponse[],
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
  clock: $selectedCity,
  filter: Boolean,
  target: getAddressesFx,
});

const $isResourceConsumptionAddressLoading = getAddressesFx.pending;

sample({
  clock: $isResourceConsumptionAddressLoading,
  target: setResourceConsumptionAddressLoading,
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
    $selectedResource,
    $isResourceConsumptionAddressLoading,
  },
};
