import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { NewHeatingPointForm } from '../NewHeatingPointForm';
import { EditNewHeatingPointModalProps } from './EditNewHeatingPointModal.types';

export const EditNewHeatingPointModal: FC<EditNewHeatingPointModalProps> = ({
  isEditModalOpen,
  setEditModalOpen,
  setNewHeatingPointModalData,
}) => {
  const formId = 'edit-new-heating-point-form';
  return (
    <FormModal
      title="Создание нового ТП"
      visible={isEditModalOpen}
      onCancel={() => setEditModalOpen(false)}
      form={
        <NewHeatingPointForm
          setNewHeatingPointModalData={setNewHeatingPointModalData}
          setEditModalOpen={setEditModalOpen}
          formId={formId}
        />
      }
      formId={formId}
    />
  );
};
