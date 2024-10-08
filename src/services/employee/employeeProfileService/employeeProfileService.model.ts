import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { OrganizationUserResponse } from 'api/types';
import { getUserData } from './employeeProfileService.api';
import { changeStatusEmployeeService } from 'services/employee/changeStatusEmployeeService';
import { deleteEmployeeService } from 'services/employee/deleteEmployeeService';

const FetchUserDataGate = createGate<{ id: string }>();

const fetchUserDataFx = createEffect<string, OrganizationUserResponse | null>(
  getUserData,
);

const $userData = createStore<OrganizationUserResponse | null>(null)
  .reset(FetchUserDataGate.close)
  .on(fetchUserDataFx.doneData, (_, data) => data);

sample({
  clock: FetchUserDataGate.open,
  fn: ({ id }) => id,
  target: fetchUserDataFx,
});

const $employeeDataPending = fetchUserDataFx.pending;

export const employeeProfileService = {
  inputs: {
    handleOpenChangeStatusModal:
      changeStatusEmployeeService.inputs.handleOpenModal,
    handleOpenDeleteEmployeeModal: deleteEmployeeService.inputs.handleOpenModal,
  },
  outputs: { $userData, $employeeDataPending },
  gates: { FetchUserDataGate },
};
