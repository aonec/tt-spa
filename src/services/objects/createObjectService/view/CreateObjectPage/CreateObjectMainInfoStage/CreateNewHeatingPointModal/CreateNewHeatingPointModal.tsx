import React, { FC } from 'react';
import { CreateNewHeatingPointModalProps } from './CreateNewHeatingPointModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { NewHeatingPointForm } from '../NewHeatingPointForm';

export const CreateNewHeatingPointModal: FC<CreateNewHeatingPointModalProps> = ({
  isCreateModalOpen,
  setCreateModalOpen,
  setNewHeatingPointModalData,
}) => {
  const formId = 'create-new-heating-point-form';
  return (
    <FormModal
      title="Создание нового ТП"
      visible={isCreateModalOpen}
      onCancel={() => setCreateModalOpen(false)}
      form={
        <NewHeatingPointForm
          setNewHeatingPointModalData={setNewHeatingPointModalData}
          setCreateModalOpen={setCreateModalOpen}
          formId={formId}
        />
      }
      formId={formId}
    />
  );
};
