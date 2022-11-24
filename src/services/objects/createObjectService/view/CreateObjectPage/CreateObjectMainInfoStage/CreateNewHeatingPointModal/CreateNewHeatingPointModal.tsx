import React, { FC } from 'react';
import { CreateNewHeatingPointModalProps } from './CreateNewHeatingPointModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { CreateNewHeatingPointForm } from './CreateNewHeatingPointForm';

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
        <CreateNewHeatingPointForm
          setNewHeatingPointModalData={setNewHeatingPointModalData}
          setCreateModalOpen={setCreateModalOpen}
          formId={formId}
        />
      }
      formId={formId}
    />
  );
};
