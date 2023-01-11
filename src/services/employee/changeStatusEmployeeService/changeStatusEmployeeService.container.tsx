import React from 'react';
import { ChangeStatusEmployeeModal } from './view/ChangeStatusEmployeeModal';
import { changeStatusEmployeeService } from './changeStatusEmployeeService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs } = changeStatusEmployeeService;

export const ChangeStatusEmployeeContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  const handleCloseModal = useEvent(inputs.handleCloseModal);
  return (
    <>
      <ChangeStatusEmployeeModal
        isModalOpen={isModalOpen}
        handleCloseModal={() => handleCloseModal()}
      />
    </>
  );
};
