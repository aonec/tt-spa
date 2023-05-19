import React from 'react';
import { ChangeStatusEmployeeModal } from './view/ChangeStatusEmployeeModal';
import { changeStatusEmployeeService } from './changeStatusEmployeeService.model';
import { useEvent, useStore } from 'effector-react';
import { UserTasksTransferModal } from './view/UserTasksTransferModal';

const { inputs, outputs } = changeStatusEmployeeService;

export const ChangeStatusEmployeeContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const employeeStatus = useStore(outputs.$employeeStatus);
  const isLoading = useStore(outputs.$isLoading);
  const organizationUserTasksByRoles = useStore(
    outputs.$organizationUserTasksByRoles,
  );
  const organizationUserTasksCount = useStore(outputs.$userTasksByRolesCount);

  const handleCloseModal = useEvent(inputs.handleCloseModal);
  const handleUpdateStatus = useEvent(inputs.handleUpdateStatus);

  const isTasksListEmpty = organizationUserTasksCount === 0;

  return (
    <>
      <ChangeStatusEmployeeModal
        isModalOpen={isModalOpen && isTasksListEmpty}
        handleCloseModal={() => handleCloseModal()}
        handleUpdateStatus={handleUpdateStatus}
        employeeStatus={employeeStatus}
        isLoading={isLoading}
      />
      <UserTasksTransferModal
        organizationUserTasksByRoles={organizationUserTasksByRoles}
        isModalOpen={!isTasksListEmpty}
      />
    </>
  );
};
