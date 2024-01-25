import React from 'react';
import { DeleteEmployeeModal } from './view/DeleteEmployeeModal';
import { useUnit } from 'effector-react';
import { deleteEmployeeService } from './deleteEmployeeService.model';

const { inputs, outputs } = deleteEmployeeService;

export const DeleteEmployeeContainer = () => {
  const { handleCloseModal, handleDelete, isModalOpen } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
    handleDelete: inputs.handleDelete,
  });

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
