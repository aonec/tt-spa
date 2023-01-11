import React, { FC } from 'react';
import { ChangeStatusEmployeeModalProps } from './ChangeStatusEmployeeModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ChangeStatusEmployeeForm } from './ChangeStatusEmployeeForm';

const formId = 'new-heating-station-form';

export const ChangeStatusEmployeeModal: FC<ChangeStatusEmployeeModalProps> = ({
  handleCloseModal,
  isModalOpen,
}) => {
  return (
    <FormModal
      title="Статус сотрудника"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      form={<ChangeStatusEmployeeForm formId={formId} />}
      formId={formId}
    />
  );
};
