import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
import {
  getContractors,
  getCurrentManagingFirm,
  getManagingFirmUsers,
} from './companyProfileService.api';
import {
  ContractorListResponsePagedList,
  OrganizationResponse,
  OrganizationUserListResponsePagedList,
} from 'api/types';
import { createGate } from 'effector-react';
import { changeStatusEmployeeService } from 'services/employee/changeStatusEmployeeService';
import { deleteEmployeeService } from 'services/employee/deleteEmployeeService';
import { createEmployeeService } from 'services/employee/createEmployeeService';
import { addContractorService } from 'services/contractors/addContractorService';
import { deleteContractorService } from 'services/contractors/deleteContractorService';
import { editContractorService } from 'services/contractors/editContractorService';

const FetchingCurrentManagingFirmGate = createGate();
const FetchingStaffGate = createGate();
const FetchingContractorsGate = createGate();

const successDeleteEmployee = deleteEmployeeService.inputs.successDelete;
const successUpdateStatus =
  changeStatusEmployeeService.inputs.successUpdateStatus;
const successCreateEmloyee = createEmployeeService.inputs.createEmloyeeSuccess;
const successAddContractor = addContractorService.inputs.addContractorSuccess;
const successDeleteContractor =
  deleteContractorService.inputs.deleteContractorSuccess;
const successEditContractor =
  editContractorService.inputs.editContractorSuccess;

const fetchCurrentManagingFirmFx = createEffect<
  void,
  OrganizationResponse | null
>(getCurrentManagingFirm);

const fetchStaffFx = createEffect<
  void,
  OrganizationUserListResponsePagedList | null
>(getManagingFirmUsers);

const fetchContractorsFx = createEffect<
  void,
  ContractorListResponsePagedList | null
>(getContractors);

const $currentManagingFirm = createStore<OrganizationResponse | null>(null).on(
  fetchCurrentManagingFirmFx.doneData,
  (_, data) => data,
);

const $staffList = createStore<OrganizationUserListResponsePagedList | null>(
  null,
).on(fetchStaffFx.doneData, (_, data) => data);

const $contractorsList = createStore<ContractorListResponsePagedList | null>(
  null,
).on(fetchContractorsFx.doneData, (_, data) => data);

sample({
  clock: FetchingCurrentManagingFirmGate.open,
  target: fetchCurrentManagingFirmFx,
});

sample({
  clock: [
    FetchingStaffGate.open,
    successDeleteEmployee,
    successUpdateStatus,
    successCreateEmloyee,
  ],
  target: fetchStaffFx,
});

sample({
  clock: [
    FetchingContractorsGate.open,
    successAddContractor,
    successDeleteContractor,
    successEditContractor,
  ],
  target: fetchContractorsFx,
});

const $fetchStaffPending = fetchStaffFx.pending;
const $isLoadingContractors = fetchContractorsFx.pending;

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
    catchContractorId: deleteContractorService.inputs.catchContractorId,
    handleOpenEditContractorModal: editContractorService.inputs.handleOpenModal,
    catchContractorData: editContractorService.inputs.catchContractorData,
  },
  outputs: {
    $currentManagingFirm,
    $staffList,
    $fetchStaffPending,
    $contractorsList,
    $isLoadingContractors,
  },
  gates: {
    FetchingCurrentManagingFirmGate,
    FetchingStaffGate,
    FetchingContractorsGate,
  },
};
