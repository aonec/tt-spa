import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';

const formId = 'new-heating-station-form';

export const PreviewModal: FC<ChangeStatusEmployeeModalProps> = ({
  handleCloseModal,
  isModalOpen,
  isLoading,
}) => {
  const PreviewModalForm: FC = ({}) => {
    return <></>;
  };

  return (
    <FormModal
      title="Статус сотрудника"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      loading={isLoading}
      form={
        <PreviewModalForm
          formId={formId}
          handleUpdateStatus={handleUpdateStatus}
          employeeStatus={employeeStatus}
        />
      }
      formId={formId}
    />
  );
};
