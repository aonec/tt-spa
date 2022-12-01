import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { NewHeatingStationForm } from '../NewHeatingStationForm';
import { EditNewHeatingStationModalProps } from './EditNewHeatingStationModal.types';

export const EditNewHeatingStationModal: FC<EditNewHeatingStationModalProps> = ({
  isEditModalOpen,
  setEditModalOpen,
  setNewHeatingStationModalData,
}) => {
  const formId = 'edit-new-heating-point-form';
  return (
    <FormModal
      title="Создание нового ТП"
      visible={isEditModalOpen}
      onCancel={() => setEditModalOpen(false)}
      form={
        <NewHeatingStationForm
          setNewHeatingStationModalData={setNewHeatingStationModalData}
          setEditModalOpen={setEditModalOpen}
          formId={formId}
        />
      }
      formId={formId}
    />
  );
};
