import React, { FC } from 'react';
import { CreateNewHeatingStationModalProps } from './CreateNewHeatingStationModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { NewHeatingStationForm } from '../../../NewHeatingStationForm';

const formId = 'create-new-heating-point-form';

export const CreateNewHeatingStationModal: FC<CreateNewHeatingStationModalProps> = ({
  isCreateModalOpen,
  setCreateModalOpen,
  handleCreateHeatingStation
}) => {
  
  return (
    <FormModal
      title="Создание нового ТП"
      visible={isCreateModalOpen}
      onCancel={() => setCreateModalOpen(false)}
      form={
        <NewHeatingStationForm
          formId={formId}
          handleCreateHeatingStation={handleCreateHeatingStation}
        />
      }
      formId={formId}
    />
  );
};
