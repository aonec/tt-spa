import React, { FC } from 'react';
import { CreateEmployeeModalProps } from './CreateEmployeeModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { CreateEmployeeForm } from './CreateEmployeeForm';

const formId = 'create-employee-modal';

export const CreateEmployeeModal: FC<CreateEmployeeModalProps> = ({
  handleCloseModal,
  isModalOpen,
  multipleSelectionCompetences,
  multipleSelectionUserRoles,
  handleCreateEmloyee,
}) => {
  return (
    <FormModal
      title="Добавление нового сотрудника"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      formId={formId}
      submitBtnText="Добавить"
      form={
        <CreateEmployeeForm
          formId={formId}
          multipleSelectionCompetences={multipleSelectionCompetences}
          multipleSelectionUserRoles={multipleSelectionUserRoles}
          handleCreateEmloyee={handleCreateEmloyee}
        />
      }
    />
  );
};
