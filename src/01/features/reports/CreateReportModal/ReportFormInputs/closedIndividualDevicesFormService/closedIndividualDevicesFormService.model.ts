import { createDomain, guard } from 'effector';
import {
  HouseManagementResponse,
  OrganizationResponsePagedList,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import {
  getAdresses,
  getHouseManagements,
  getOrganizations,
} from './closedIndividualDevicesFormService.api';
import { UnloadingType } from './closedIndividualDevicesFormService.types';

const domain = createDomain('closedIndividualDevicesFormService');

const setUnloadSelectType = domain.createEvent<UnloadingType>();

const $unloadSelectType = domain
  .createStore<UnloadingType | null>(null)
  .on(setUnloadSelectType, (_, unloadType) => unloadType);

const fetchAdressesFx = domain.createEffect<
  void,
  StreetWithHousingStockNumbersResponsePagedList
>(getAdresses);

guard({
  source: $unloadSelectType,
  filter: (value) => value === UnloadingType.ByAddress,
  target: fetchAdressesFx,
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
  .createStore<StreetWithHousingStockNumbersResponsePagedList | null>(null)
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
  inputs: { setUnloadSelectType },
  outputs: {
    $unloadSelectType,
    $addressesPagedList,
    $organizationPagedList,
    $houseManagementList,
  },
};
