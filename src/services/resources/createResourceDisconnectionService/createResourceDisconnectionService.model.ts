import { resourceDisablingScheduleServiceService } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleService.model';
import { message } from 'antd';
import { combine, createDomain, forward, sample, split } from 'effector';
import {
  ResourceDisconnectingCreateRequest,
  StreetWithBuildingNumbersResponsePagedList,
  StreetWithBuildingNumbersResponse,
  EResourceDisconnectingType,
  HeatingStationWithStreetsResponse,
  HouseManagementWithStreetsResponse,
  BuildingListResponse,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { chooseTypeOfResourceDisconnectionModalService } from '../chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.model';
import { editResourceDisconnectionService } from '../editResourceDisconnectionService';
import { resourceDisconnectionFiltersService } from '../resourceDisconnectionFiltersService';
import {
  fetchCreateResourceDisconnection,
  fetchExistingBuildings,
  fetchExistingBuildingsWithHeatingStation,
  fetchExistingBuildingsWithHouseManagement,
} from './createResourceDisconnectionService.api';
import { EAddressDetails } from './createResourceDisconnectionService.types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const domain = createDomain('createResourceDisconnectionService');

const $resourceTypes =
  resourceDisconnectionFiltersService.outputs.$resourceDisconnectionFilters.map(
    (store) => store?.resourceTypes || [],
  );
const $disconnectingTypes = combine(
  chooseTypeOfResourceDisconnectionModalService.outputs.$isInterHeatingSeason,
  resourceDisconnectionFiltersService.outputs.$resourceDisconnectionFilters,
  (isInterHeatingSeason, filter) => {
    const types = filter?.disconnectingTypes;

    if (!types) {
      return [];
    }
    if (isInterHeatingSeason) {
      return types.filter(
        (type) => type.key === EResourceDisconnectingType.InterHeatingSeason,
      );
    }
    return types.filter(
      (type) => type.key !== EResourceDisconnectingType.InterHeatingSeason,
    );
  },
);

const openModal = domain.createEvent();
const closeModal = domain.createEvent();
const clearHousingStocks = domain.createEvent();
const clearTypeOfAddress = domain.createEvent();

const $selectedBuilding = domain
  .createStore<BuildingListResponse | null>(null)
  .on(
    chooseTypeOfResourceDisconnectionModalService.inputs.openModal,
    (_, Building) => Building || null,
  )
  .reset(closeModal);

const $isModalOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const setTypeOfAddress = domain.createEvent<EAddressDetails>();
const $typeOfAddress = domain
  .createStore<EAddressDetails>(EAddressDetails.All)
  .on(setTypeOfAddress, (_, type) => type)
  .reset(clearTypeOfAddress);

const selectCity = domain.createEvent<string>();

const $selectedCity = domain
  .createStore<string | null>(null)
  .on(selectCity, (_, city) => city)
  .on(
    chooseTypeOfResourceDisconnectionModalService.inputs.openModal,
    (prev, building) => {
      if (!building) return prev;

      return building.address?.mainAddress?.city || prev;
    },
  )
  .reset(closeModal);

const getBuildings = domain.createEvent();
const getExistingBuildingsFx = domain.createEffect<
  string,
  StreetWithBuildingNumbersResponsePagedList
>(fetchExistingBuildings);

const $existingBuildings = domain
  .createStore<StreetWithBuildingNumbersResponse[]>([])
  .on(
    getExistingBuildingsFx.doneData,
    (_, housingStocks) => housingStocks.items || [],
  )
  .reset(clearHousingStocks);

const getHeatingStationFx = domain.createEffect<
  void,
  HeatingStationWithStreetsResponse[]
>(fetchExistingBuildingsWithHeatingStation);

const $buildingWithHeatingStations = domain
  .createStore<HeatingStationWithStreetsResponse[]>([])
  .on(getHeatingStationFx.doneData, (_, housingStocks) => housingStocks)
  .reset(clearHousingStocks);

const getHouseManagementsFx = domain.createEffect<
  void,
  HouseManagementWithStreetsResponse[]
>(fetchExistingBuildingsWithHouseManagement);

const $buildingWithHouseManagements = domain
  .createStore<HouseManagementWithStreetsResponse[]>([])
  .on(getHouseManagementsFx.doneData, (_, housingStocks) => housingStocks)
  .reset(clearHousingStocks);

const $isHousingStocksLoading = combine(
  getHouseManagementsFx.pending,
  getHeatingStationFx.pending,
  getExistingBuildingsFx.pending,
  (...isLoading) => isLoading.includes(true),
);

const createResourceDisconnection =
  domain.createEvent<ResourceDisconnectingCreateRequest>();
const createResourceDisconnectionFx = domain.createEffect<
  ResourceDisconnectingCreateRequest,
  void,
  EffectFailDataAxiosError
>(fetchCreateResourceDisconnection);

sample({
  clock: setTypeOfAddress,
  target: clearHousingStocks,
});

sample({
  clock: editResourceDisconnectionService.inputs.openEditModal,
  fn: () => undefined,
  target: openModal,
});

sample({
  clock: sample({
    clock: editResourceDisconnectionService.outputs.$resourceDisconnection,
    fn: (disconnection) =>
      (disconnection?.buildings || [])[0]?.address?.mainAddress?.city || null,
  }),
  filter: Boolean,
  target: selectCity,
});

forward({
  from: createResourceDisconnection,
  to: createResourceDisconnectionFx,
});

forward({
  from: createResourceDisconnectionFx.done,
  to: closeModal,
});

forward({
  from: closeModal,
  to: [clearHousingStocks, clearTypeOfAddress],
});

sample({
  source: $selectedCity,
  clock: [$selectedCity, getBuildings],
  filter: Boolean,
  fn: (city) => city,
  target: getExistingBuildingsFx,
});

sample({
  source: sample({
    source: addressSearchService.outputs.$existingCities,
    filter: (cities): cities is string[] =>
      Boolean(cities && cities.length === 1),
  }),
  clock: [openModal],
  fn: (cities) => cities[0],
  target: selectCity,
});

split({
  source: $typeOfAddress,
  match: {
    [EAddressDetails.All]: (type) => type === EAddressDetails.All,
    [EAddressDetails.HeatingStation]: (type) =>
      type === EAddressDetails.HeatingStation,
    [EAddressDetails.HouseManagements]: (type) =>
      type === EAddressDetails.HouseManagements,
  },
  cases: {
    [EAddressDetails.All]: getBuildings,
    [EAddressDetails.HeatingStation]: getHeatingStationFx,
    [EAddressDetails.HouseManagements]: getHouseManagementsFx,
  },
});

forward({
  from: createResourceDisconnectionFx.doneData,
  to: resourceDisablingScheduleServiceService.inputs
    .refetchResourceDisconnections,
});

createResourceDisconnectionFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const createResourceDisconnectionService = {
  inputs: {
    openModal,
    closeModal,
    createResourceDisconnection,
    setTypeOfAddress,
    selectCity,
  },
  fx: { createResourceDisconnectionFx },
  outputs: {
    $isModalOpen,
    $resourceTypes,
    $disconnectingTypes,
    $existingBuildings,
    $buildingWithHeatingStations,
    $buildingWithHouseManagements,
    $typeOfAddress,
    $isHousingStocksLoading,
    $selectedCity,
    $selectedBuilding,
  },
};
