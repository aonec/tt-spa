import { createDomain, guard, sample } from 'effector';
import {
  HouseManagementResponse,
  OrganizationResponsePagedList,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import {
  getAdresses,
  getHouseManagements,
  getOrganizations,
} from './closedIndividualDevicesFormService.api';
import { UnloadingType } from './closedIndividualDevicesFormService.types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const domain = createDomain('closedIndividualDevicesFormService');

const setUnloadSelectType = domain.createEvent<UnloadingType>();

const $unloadSelectType = domain
  .createStore<UnloadingType | null>(null)
  .on(setUnloadSelectType, (_, unloadType) => unloadType);

const fetchAdressesFx = domain.createEffect<
  string,
  StreetWithBuildingNumbersResponsePagedList
>(getAdresses);

const selectCity = domain.createEvent<string>();

const $selectedCity = domain
  .createStore<string | null>(null)
  .on(selectCity, (_, city) => city);

sample({
  clock: $selectedCity,
  filter: Boolean,
  target: fetchAdressesFx,
});

sample({
  source: sample({
    source: addressSearchService.outputs.$existingCities,
    filter: (cities): cities is string[] =>
      Boolean(cities && cities.length === 1),
  }),
  clock: sample({
    clock: setUnloadSelectType,
    filter: (value) => value === UnloadingType.ByAddress,
  }),
  fn: (cities) => cities[0],
  target: selectCity,
});

const fetchOrganzationFx = domain.createEffect<
  void,
  OrganizationResponsePagedList
>(getOrganizations);

guard({
  source: $unloadSelectType,
  filter: (value) => value === UnloadingType.AllManagingFirm,
  target: fetchOrganzationFx,
});

const fetchHouseManagementsFx = domain.createEffect<
  void,
  HouseManagementResponse[] | null
>(getHouseManagements);

guard({
  source: $unloadSelectType,
  filter: (value) => value === UnloadingType.ByHouseManagement,
  target: fetchHouseManagementsFx,
});

const $addressesPagedList = domain
  .createStore<StreetWithBuildingNumbersResponsePagedList | null>(null)
  .on(fetchAdressesFx.doneData, (_, data) => data);

const $organizationPagedList = domain
  .createStore<OrganizationResponsePagedList | null>(null)
  .on(fetchOrganzationFx.doneData, (_, organizations) => organizations);

const $houseManagementList = domain
  .createStore<HouseManagementResponse[] | null>(null)
  .on(
    fetchHouseManagementsFx.doneData,
    (_, HouseManagements) => HouseManagements,
  );

export const closedIndividualDevicesFormService = {
  inputs: { setUnloadSelectType, selectCity },
  outputs: {
    $unloadSelectType,
    $addressesPagedList,
    $organizationPagedList,
    $houseManagementList,
    $selectedCity,
  },
};
