import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { OrganizationUserResponse } from 'myApi';
import { getUserData } from './employeeProfileService.api';
import { changeStatusEmployeeService } from 'services/employee/changeStatusEmployeeService';
import { deleteEmployeeService } from 'services/employee/deleteEmployeeService';

const domain = createDomain('employeeProfileService');

const FetchUserDataGate = createGate<{ id: string }>();

const fetchUserDataFx = domain.createEffect<
  string,
  OrganizationUserResponse | null
>(getUserData);

const $userData = domain
  .createStore<OrganizationUserResponse | null>(null)
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
