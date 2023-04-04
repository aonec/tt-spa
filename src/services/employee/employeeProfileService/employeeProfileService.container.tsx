import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { employeeProfileService } from './employeeProfileService.model';
import { EmployeeProfile } from './view/EmployeeProfile';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { ChangeStatusEmployeeContainer } from 'services/employee/changeStatusEmployeeService';
import { DeleteEmployeeContainer } from 'services/employee/deleteEmployeeService';

export const EmployeeProfileContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { inputs, outputs, gates } = employeeProfileService;

  const { FetchUserDataGate } = gates;
  const userData = useStore(outputs.$userData);

  const employeeDataPending = useStore(outputs.$employeeDataPending);
  const handleOpenChangeStatusModal = useEvent(
    inputs.handleOpenChangeStatusModal,
  );
  const handleOpenDeleteEmployeeModal = useEvent(
    inputs.handleOpenDeleteEmployeeModal,
  );

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
