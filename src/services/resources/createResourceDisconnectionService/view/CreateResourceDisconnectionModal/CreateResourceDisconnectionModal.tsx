import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { CreateResourceDisconnectionForm } from '../CreateResourceDisconnectionForm';
import { CreateResourceDisconnectionModalProps } from './CreateResourceDisconnectionModal.types';

export const CreateResourceDisconnectionModal: FC<CreateResourceDisconnectionModalProps> = ({
  isOpen,
  handleClose,
  handleCreateResourceDisconnection,
  cities,
  selectedCity,
  handleSelectCity,
  heatingStations,
  handleSelectHeatingStation,
  addresses
}) => {
  return (
    <FormModal
      visible={isOpen}
      onCancel={handleClose}
      title="Создать отключение ресурса"
      submitBtnText="Создать отключение"
      form={
        <CreateResourceDisconnectionForm
          handleSubmit={handleCreateResourceDisconnection}
          formId="createResourceDisconnection"
          heatingStations={heatingStations}
          cities={cities}
          addresses={addresses}
          selectedCity={selectedCity}
          handleSelectCity={handleSelectCity}
          handleSelectHeatingStation={handleSelectHeatingStation}
        />
      }
      formId="createResourceDisconnection"
    />
  );
};
