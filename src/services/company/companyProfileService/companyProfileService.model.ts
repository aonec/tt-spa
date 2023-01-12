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
import { changeStatusEmployeeService } from 'services/employee/changeStatusEmployeeService';

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

const $fetchStaffPending = fetchStaffFx.pending;

export const companyProfileService = {
  inputs: {
    handleOpenStatusChangeModal:
      changeStatusEmployeeService.inputs.handleOpenModal,
      handleCatchEmployeeStatusData:
      changeStatusEmployeeService.inputs.handleCatchEmployeeStatusData,
  },
  outputs: { $currentManagingFirm, $staffList, $fetchStaffPending },
  gates: { FetchingCurrentManagingFirmGate, FetchingStaffGate },
};
