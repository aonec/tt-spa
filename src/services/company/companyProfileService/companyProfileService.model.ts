import { createDomain, forward } from 'effector';
import {
  getContractors,
  getCurrentManagingFirm,
  getManagingFirmUsers,
} from './companyProfileService.api';
import {
  ContractorListResponsePagedList,
  OrganizationResponse,
  OrganizationUserListResponsePagedList,
} from 'myApi';
import { createGate } from 'effector-react';
import { changeStatusEmployeeService } from 'services/employee/changeStatusEmployeeService';
import { deleteEmployeeService } from 'services/employee/deleteEmployeeService';
import { createEmployeeService } from 'services/employee/createEmployeeService';
import { addContractorService } from 'services/contractors/addContractorService';

const domain = createDomain('companyProfileService');

const FetchingCurrentManagingFirmGate = createGate();
const FetchingStaffGate = createGate();
const FetchingContractorsGate = createGate();

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

const fetchContractorsFx = domain.createEffect<
  void,
  ContractorListResponsePagedList | null
>(getContractors);

const $currentManagingFirm = domain
  .createStore<OrganizationResponse | null>(null)
  .on(fetchCurrentManagingFirmFx.doneData, (_, data) => data);

const $staffList = domain
  .createStore<OrganizationUserListResponsePagedList | null>(null)
  .on(fetchStaffFx.doneData, (_, data) => data);

const $contractorsList = domain
  .createStore<ContractorListResponsePagedList | null>(null)
  .on(fetchContractorsFx.doneData, (_, data) => data);

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

forward({
  from: FetchingContractorsGate.open,
  to: fetchContractorsFx,
});

const $fetchStaffPending = fetchStaffFx.pending;
const $fetchContractorsPending = fetchContractorsFx.pending;

export const companyProfileService = {
  inputs: {
    handleOpenStatusChangeModal:
      changeStatusEmployeeService.inputs.handleOpenModal,
    handleCatchEmployeeStatusData:
      changeStatusEmployeeService.inputs.handleCatchEmployeeStatusData,
    handleOpenDeleteModal: deleteEmployeeService.inputs.handleOpenModal,
    handleCatchEmployeeId: deleteEmployeeService.inputs.handleCatchEmployeeId,
    handleOpenCreateEmployeeModal: createEmployeeService.inputs.handleOpenModal,
    handleOpenAddContractorModal: addContractorService.inputs.handleOpenModal,
  },
  outputs: {
    $currentManagingFirm,
    $staffList,
    $fetchStaffPending,
    $contractorsList,
    $fetchContractorsPending,
  },
  gates: {
    FetchingCurrentManagingFirmGate,
    FetchingStaffGate,
    FetchingContractorsGate,
  },
};
