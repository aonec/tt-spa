import React from 'react';
import { useUnit } from 'effector-react';
import { ChangeStatusEmployeeModal } from './view/ChangeStatusEmployeeModal';
import { changeStatusEmployeeService } from './changeStatusEmployeeService.model';
import { UserTasksTransferModal } from './view/UserTasksTransferModal';

const { inputs, outputs } = changeStatusEmployeeService;

export const ChangeStatusEmployeeContainer = () => {
  const {
    currentUser,
    employeeStatus,
    handleApplyTasksReassignment,
    handleCloseModal,
    handleUpdateStatus,
    isLoading,
    isModalOpen,
    isTransferUserTasksModalOpen,
    organizationUserTasksByRoles,
    organizationUsersByRolesList,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    employeeStatus: outputs.$employeeStatus,
    isLoading: outputs.$isLoading,
    organizationUserTasksByRoles: outputs.$organizationUserTasksByRoles,
    isTransferUserTasksModalOpen: outputs.$isTransferUserTasksModalOpen,
    currentUser: outputs.$currentUser,
    organizationUsersByRolesList: outputs.$organizationUsersByRolesList,
    handleCloseModal: inputs.handleCloseModal,
    handleUpdateStatus: inputs.handleUpdateStatus,
    handleApplyTasksReassignment: inputs.handleApplyTasksReassignment,
  });

  return (
    <>
      <ChangeStatusEmployeeModal
        isModalOpen={isModalOpen && !isTransferUserTasksModalOpen}
        handleCloseModal={handleCloseModal}
        handleUpdateStatus={handleUpdateStatus}
        employeeStatus={employeeStatus}
        isLoading={isLoading}
      />
      <UserTasksTransferModal
        isModalOpen={isTransferUserTasksModalOpen}
        isLoading={isLoading}
        organizationUserTasksByRoles={organizationUserTasksByRoles}
        handleCloseModal={handleCloseModal}
        currentUser={currentUser}
        organizationUsersByRolesList={organizationUsersByRolesList}
        handleApplyTasksReassignment={handleApplyTasksReassignment}
      />
    </>
  );
};
