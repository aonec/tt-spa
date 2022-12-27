import { createDomain, forward } from 'effector';
import {
  getCurrentManagingFirm,
  getManagingFirmUsers,
} from './companyProfileService.api';
import {
  OrganizationResponse,
  OrganizationUserListResponse,
  OrganizationUserListResponsePagedList,
} from 'myApi';
import { createGate } from 'effector-react';

const domain = createDomain('companyProfileService');

const FetchingCurrentManagingFirmGate = createGate();
const FetchingStaffGate = createGate();

const fetchCurrentManagingFirmFx = domain.createEffect<
  void,
  OrganizationResponse | null
>(getCurrentManagingFirm);

const fetchStaffFx = domain.createEffect<
  void,
  OrganizationUserListResponsePagedList | null
>(getManagingFirmUsers);

const $currentManagingFirm = domain
  .createStore<OrganizationResponse | null>(null)
  .on(fetchCurrentManagingFirmFx.doneData, (_, data) => data);

const $staffList = domain
  .createStore<OrganizationUserListResponsePagedList | null>(null)
  .on(fetchStaffFx.doneData, (_, data) => data);

forward({
  from: FetchingCurrentManagingFirmGate.open,
  to: fetchCurrentManagingFirmFx,
});

forward({ from: FetchingStaffGate.open, to: fetchStaffFx });

export const companyProfileService = {
  inputs: {},
  outputs: { $currentManagingFirm, $staffList },
  gates: { FetchingCurrentManagingFirmGate, FetchingStaffGate },
};
