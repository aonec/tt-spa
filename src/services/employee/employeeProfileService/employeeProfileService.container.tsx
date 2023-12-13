import { useUnit } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { employeeProfileService } from './employeeProfileService.model';
import { EmployeeProfile } from './view/EmployeeProfile';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { ChangeStatusEmployeeContainer } from 'services/employee/changeStatusEmployeeService';
import { DeleteEmployeeContainer } from 'services/employee/deleteEmployeeService';

const { inputs, outputs, gates } = employeeProfileService;
const { FetchUserDataGate } = gates;

export const EmployeeProfileContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    employeeDataPending,
    handleOpenChangeStatusModal,
    handleOpenDeleteEmployeeModal,
    userData,
  } = useUnit({
    userData: outputs.$userData,
    employeeDataPending: outputs.$employeeDataPending,
    handleOpenChangeStatusModal: inputs.handleOpenChangeStatusModal,
    handleOpenDeleteEmployeeModal: inputs.handleOpenDeleteEmployeeModal,
  });

  if (!id) return null;

  return (
    <>
      <FetchUserDataGate id={id} />
      <ChangeStatusEmployeeContainer />
      <DeleteEmployeeContainer />
      <WithLoader isLoading={employeeDataPending}>
        <EmployeeProfile
          userData={userData}
          handleOpenChangeStatusModal={() => handleOpenChangeStatusModal()}
          handleOpenDeleteEmployeeModal={() => handleOpenDeleteEmployeeModal()}
        />
      </WithLoader>
    </>
  );
};
