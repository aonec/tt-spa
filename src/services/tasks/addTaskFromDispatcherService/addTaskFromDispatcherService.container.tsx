import React from 'react';
import { AddTaskModal } from './view/AddTaskModal';
import { addTaskFromDispatcherService } from './addTaskFromDispatcherService.models';
import { useUnit } from 'effector-react';

const { inputs, outputs } = addTaskFromDispatcherService;

export const AddTaskFromDispatcherContainer = () => {
  const { isModalOpen, handleCloseModal } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
  });

  return (
    <>
      <AddTaskModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
