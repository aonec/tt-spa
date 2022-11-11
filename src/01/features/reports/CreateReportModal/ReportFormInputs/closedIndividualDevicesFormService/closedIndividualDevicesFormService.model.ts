import { createDomain, guard, sample } from 'effector';
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
import {
  GetAddressesRequestPayload,
  GetHouseManagementsPayload,
  GetOrganizationsPayload,
  UnloadingType,
} from './closedIndividualDevicesFormService.types';

const domain = createDomain('closedIndividualDevicesFormService');

const setUnloadSelectType = domain.createEvent<UnloadingType>();

const $unloadSelectType = domain
  .createStore<UnloadingType | null>(null)
  .on(setUnloadSelectType, (_, unloadType) => unloadType);

const fetchAdressesFx = domain.createEffect<
  GetAddressesRequestPayload,
  StreetWithHousingStockNumbersResponsePagedList
>(getAdresses);

guard({
  source: $unloadSelectType,
  filter: (value: UnloadingType | null) => {
    return value === 'ByAddress';
  },
  target: fetchAdressesFx.prepend(() => {
    return {};
  }),
});

const fetchOrganzationFx = domain.createEffect<
  GetOrganizationsPayload,
  OrganizationResponsePagedList
>(getOrganizations);
guard({
  source: $unloadSelectType,
  filter: (value: UnloadingType | null) => {
    return value === 'AllManagingFirm';
  },
  target: fetchOrganzationFx.prepend(() => {
    return {};
  }),
});

const fetchHouseManagementsFx = domain.createEffect<
  GetHouseManagementsPayload,
  HouseManagementResponse[] | null
>(getHouseManagements);
guard({
  source: $unloadSelectType,
  filter: (value: UnloadingType | null) => {
    return value === 'ByHouseManagement';
  },
  target: fetchHouseManagementsFx.prepend(() => {
    return {};
  }),
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
    (_, HouseManagements) => HouseManagements
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
