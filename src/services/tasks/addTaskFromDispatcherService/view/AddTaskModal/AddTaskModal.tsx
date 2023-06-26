import React, { FC } from 'react';
import { AddTaskModalProps } from './AddTaskModal.types';
import { AddTaskForm } from './AddTaskForm/AddTaskForm';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';

const formId = 'add-task-dispatcher-form';

export const AddTaskModal: FC<AddTaskModalProps> = ({
  handleCloseModal,
  isModalOpen,
}) => {
  return (
    <FormModal
      title="Создание новой задачи"
      submitBtnText="Создать задачу"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      form={<AddTaskForm formId={formId} />}
      formId={formId}
    />
  );
};
