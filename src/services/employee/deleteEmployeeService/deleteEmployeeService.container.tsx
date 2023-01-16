import React from 'react';
import { DeleteEmployeeModal } from './view/DeleteEmployeeModal';
import { useEvent, useStore } from 'effector-react';
import { deleteEmployeeService } from './deleteEmployeeService.model';

const { inputs, outputs } = deleteEmployeeService;

export const DeleteEmployeeContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  const handleCloseModal = useEvent(inputs.handleCloseModal);
  const handleDelete = useEvent(inputs.handleDelete);

  return (
    <>
      <DeleteEmployeeModal
        isModalOpen={isModalOpen}
        handleCloseModal={() => handleCloseModal()}
        handleDelete={() => handleDelete()}
      />
    </>
  );
};
