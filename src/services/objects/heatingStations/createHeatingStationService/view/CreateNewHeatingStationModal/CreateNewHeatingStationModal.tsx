import React, { FC } from 'react';
import { CreateNewHeatingStationModalProps } from './CreateNewHeatingStationModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { NewHeatingStationForm } from '../../../NewHeatingStationForm';

const formId = 'create-new-heating-point-form';

export const CreateNewHeatingStationModal: FC<
  CreateNewHeatingStationModalProps
> = ({
  handleCreateHeatingStation,
  isModalOpen,
  handleCloseModal,
  existingCities,
  existingStreets,
}) => {
  return (
    <FormModal
      title="Создание нового ТП"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      form={
        <NewHeatingStationForm
          formId={formId}
          handleCreateHeatingStation={handleCreateHeatingStation}
          existingCities={existingCities}
          existingStreets={existingStreets}
        />
      }
      formId={formId}
    />
  );
};
