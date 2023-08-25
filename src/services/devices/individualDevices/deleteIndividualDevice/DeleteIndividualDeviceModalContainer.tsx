import { useUnit } from 'effector-react';
import React from 'react';
import { deleteIndividualDeviceService } from './deleteIndividualDeviceService.models';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { deleteIndividualDeviceMutation } from './deleteIndividualDeviceService.api';

const { inputs, outputs } = deleteIndividualDeviceService;

export const DeleteIndividualDeviceModalContainer = () => {
  const { isOpen, individualDevice, closeModal, handleDelete, isLoading } =
    useUnit({
      isOpen: outputs.$isModalOpen,
      individualDevice: outputs.$currentIndividualDevice,
      closeModal: inputs.closeModal,
      handleDelete: inputs.deleteIndividualDevice,
      isLoading: deleteIndividualDeviceMutation.$pending,
    });

  return (
    <Dialog
      type="danger"
      title={`Вы действительно хотите удалить прибор ${individualDevice?.serialNumber} (${individualDevice?.model})?`}
      submitText="Удалить прибор"
      description="Прибор будет навсегда удален из системы. Показания по прибору не будут приниматься."
      isOpen={isOpen}
      onCancel={closeModal}
      onSubmit={handleDelete}
      isLoading={isLoading}
    />
  );
};
