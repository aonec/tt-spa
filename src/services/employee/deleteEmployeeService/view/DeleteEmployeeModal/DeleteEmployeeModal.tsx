import React, { FC } from 'react';
import { DeleteEmployeeModalProps } from './DeleteEmployeeModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Description } from './DeleteEmployeeModal.styled';
import { Form } from 'antd';

const formId = 'delete-employee-modal';

export const DeleteEmployeeModal: FC<DeleteEmployeeModalProps> = ({
  handleCloseModal,
  isModalOpen,
  handleDelete,
}) => {
  return (
    <FormModal
      formId={formId}
      title="Подтвердите действие"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      submitBtnText="Удалить"
      submitButtonType="danger"
      form={
        <Form id={formId} onSubmitCapture={() => handleDelete()}>
          <Description>Вы действительно хотите удалить сотрудника?</Description>
        </Form>
      }
    />
  );
};
