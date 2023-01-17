import { createDomain, forward } from 'effector';
import {
  getCurrentManagingFirm,
  getManagingFirmUsers,
} from './companyProfileService.api';
import {
  OrganizationResponse,
  OrganizationUserListResponsePagedList,
} from 'myApi';
import { createGate } from 'effector-react';
import { changeStatusEmployeeService } from 'services/employee/changeStatusEmployeeService';
import { deleteEmployeeService } from 'services/employee/deleteEmployeeService';
import { createEmployeeService } from 'services/employee/createEmployeeService';

const domain = createDomain('companyProfileService');

const FetchingCurrentManagingFirmGate = createGate();
const FetchingStaffGate = createGate();

const successDeleteEmployee = deleteEmployeeService.inputs.successDelete;
const successUpdateStatus =
  changeStatusEmployeeService.inputs.successUpdateStatus;
const successCreateEmloyee = createEmployeeService.inputs.createEmloyeeSuccess;

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

forward({
  from: [
    FetchingStaffGate.open,
    successDeleteEmployee,
    successUpdateStatus,
    successCreateEmloyee,
  ],
  to: fetchStaffFx,
});

const $fetchStaffPending = fetchStaffFx.pending;

export const companyProfileService = {
  inputs: {
    handleOpenStatusChangeModal:
      changeStatusEmployeeService.inputs.handleOpenModal,
    handleCatchEmployeeStatusData:
      changeStatusEmployeeService.inputs.handleCatchEmployeeStatusData,
    handleOpenDeleteModal: deleteEmployeeService.inputs.handleOpenModal,
    handleCatchEmployeeId: deleteEmployeeService.inputs.handleCatchEmployeeId,
    handleOpenCreateEmployeeModal: createEmployeeService.inputs.handleOpenModal,
  },
  outputs: { $currentManagingFirm, $staffList, $fetchStaffPending },
  gates: { FetchingCurrentManagingFirmGate, FetchingStaffGate },
};
