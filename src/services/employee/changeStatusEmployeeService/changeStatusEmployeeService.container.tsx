import React from 'react';
import { ChangeStatusEmployeeModal } from './view/ChangeStatusEmployeeModal';
import { changeStatusEmployeeService } from './changeStatusEmployeeService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs } = changeStatusEmployeeService;

export const ChangeStatusEmployeeContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const employeeStatus = useStore(outputs.$employeeStatus);

  const handleCloseModal = useEvent(inputs.handleCloseModal);
  const handleUpdateStatus = useEvent(inputs.handleUpdateStatus);
  return (
    <>
      <ChangeStatusEmployeeModal
        isModalOpen={isModalOpen}
        handleCloseModal={() => handleCloseModal()}
        handleUpdateStatus={handleUpdateStatus}
        employeeStatus={employeeStatus}
      />
    </>
  );
};
