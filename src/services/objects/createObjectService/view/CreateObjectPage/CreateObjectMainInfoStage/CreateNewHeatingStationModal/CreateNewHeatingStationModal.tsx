import React, { FC } from 'react';
import { CreateNewHeatingStationModalProps } from './CreateNewHeatingStationModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { NewHeatingStationForm } from '../NewHeatingStationForm';

export const CreateNewHeatingStationModal: FC<CreateNewHeatingStationModalProps> = ({
  isCreateModalOpen,
  setCreateModalOpen,
  setNewHeatingStationModalData,
  setInputTypeDisplayingDivShow,
  handleCreateHeatingStation
}) => {
  const formId = 'create-new-heating-point-form';
  return (
    <FormModal
      title="Создание нового ТП"
      visible={isCreateModalOpen}
      onCancel={() => setCreateModalOpen(false)}
      form={
        <NewHeatingStationForm
          setNewHeatingStationModalData={setNewHeatingStationModalData}
          setCreateModalOpen={setCreateModalOpen}
          setInputTypeDisplayingDivShow={setInputTypeDisplayingDivShow}
          formId={formId}
          handleCreateHeatingStation={handleCreateHeatingStation}
        />
      }
      formId={formId}
    />
  );
};
