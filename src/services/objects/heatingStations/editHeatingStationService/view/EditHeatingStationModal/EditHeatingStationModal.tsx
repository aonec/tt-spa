import React, { FC } from 'react';
import { NewHeatingStationForm } from 'services/objects/heatingStations/NewHeatingStationForm';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { EditHeatingStationModalProps } from './EditHeatingStationModal.types';

const formId = 'edit-new-heating-point-form';

export const EditHeatingStationModal: FC<EditHeatingStationModalProps> = ({
  handleEditHeatingStation,
  isModalOpen,
  handleCloseModal,
  existingCities,
  existingStreets,
  openedHeatingStationData,
}) => {
  return (
    <FormModal
      title="Редактирование ТП"
      visible={isModalOpen}
      onCancel={handleCloseModal}
      form={
        <NewHeatingStationForm
          isEdit
          formId={formId}
          handleEditHeatingStation={handleEditHeatingStation}
          existingCities={existingCities}
          existingStreets={existingStreets}
          openedHeatingStationData={openedHeatingStationData}
        />
      }
      formId={formId}
    />
  );
};
