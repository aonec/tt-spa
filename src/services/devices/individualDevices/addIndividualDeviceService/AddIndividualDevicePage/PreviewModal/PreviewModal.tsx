import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { PreviewModalForm } from './PreviewModalForm';
import { PreviewModalProps } from './PreviewModal.types';

const formId = 'individual-device-preview';

export const PreviewModal: FC<PreviewModalProps> = ({
  handleCloseModal,
  isModalOpen,
  isLoading,
  documents,
  formData,
  mountPlaces,
  handleCreateDevice,
}) => {
  return (
    <FormModal
      title="Добавление нового прибора"
      formId={formId}
      visible={isModalOpen}
      onCancel={handleCloseModal}
      submitBtnText="Создать прибор"
      onSubmit={handleCreateDevice}
      loading={isLoading}
      form={
        <PreviewModalForm
          documents={documents}
          formData={formData}
          mountPlaces={mountPlaces}
        />
      }
    />
  );
};
