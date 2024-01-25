import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import {
  HouseManagementResponse,
  HousingStockResponse,
  OrganizationResponsePagedList,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import {
  getAdresses,
  getHouseManagements,
  getHousingStockData,
  getOrganizations,
} from './closedIndividualDevicesFormService.api';
import { UnloadingType } from './closedIndividualDevicesFormService.types';

const handleFetchHousingStockData = createEvent<number>();

const setUnloadSelectType = createEvent<UnloadingType>();

const $unloadSelectType = createStore<UnloadingType | null>(null).on(
  setUnloadSelectType,
  (_, unloadType) => unloadType,
);

const fetchAdressesFx = createEffect<
  string,
  StreetWithBuildingNumbersResponsePagedList
>(getAdresses);

const selectCity = createEvent<string>();

const $selectedCity = createStore<string | null>(null).on(
  selectCity,
  (_, city) => city,
);

const fetchHousingStockDataFx = createEffect<number, HousingStockResponse>(
  getHousingStockData,
);

sample({
  clock: handleFetchHousingStockData,
  target: fetchHousingStockDataFx,
});

const $reopenReportsHousingStockCity = createStore<string | null>(null).on(
  fetchHousingStockDataFx.doneData,
  (_, data) => data.address?.mainAddress?.city || null,
);

sample({
  clock: $selectedCity,
  filter: Boolean,
  target: fetchAdressesFx,
});

sample({
  clock: $reopenReportsHousingStockCity,
  filter: Boolean,
  target: selectCity,
});

const fetchOrganzationFx = createEffect<void, OrganizationResponsePagedList>(
  getOrganizations,
);

sample({
  source: $unloadSelectType,
  filter: (value) => value === UnloadingType.AllManagingFirm,
  target: fetchOrganzationFx,
});

const fetchHouseManagementsFx = createEffect<
  void,
  HouseManagementResponse[] | null
>(getHouseManagements);

sample({
  source: $unloadSelectType,
  filter: (value) => value === UnloadingType.ByHouseManagement,
  target: fetchHouseManagementsFx,
});

const $addressesPagedList =
  createStore<StreetWithBuildingNumbersResponsePagedList | null>(null).on(
    fetchAdressesFx.doneData,
    (_, data) => data,
  );

const $organizationPagedList =
  createStore<OrganizationResponsePagedList | null>(null).on(
    fetchOrganzationFx.doneData,
    (_, organizations) => organizations,
  );

const $houseManagementList = createStore<HouseManagementResponse[] | null>(
  null,
).on(
  fetchHouseManagementsFx.doneData,
  (_, HouseManagements) => HouseManagements,
);

export const closedIndividualDevicesFormService = {
  inputs: { setUnloadSelectType, selectCity, handleFetchHousingStockData },
  outputs: {
    $unloadSelectType,
    $addressesPagedList,
    $organizationPagedList,
    $houseManagementList,
    $selectedCity,
  },
};
