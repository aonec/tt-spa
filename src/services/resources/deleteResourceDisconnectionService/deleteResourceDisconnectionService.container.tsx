import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { Dialog } from 'ui-kit/shared_components/Dialog/Dialog';
import { deleteResourceDisconnectionService } from './deleteResourceDisconnectionService.model';

const { inputs, outputs } = deleteResourceDisconnectionService;

export const DeleteResourceDisconnectionContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$deleteResourceDisconnectionIsLoading);

  const closeModal = useEvent(inputs.closeModal);
  const handleComplete = useEvent(inputs.deleteResourceDisconnection);

  return (
    <Dialog
      isOpen={isOpen}
      onCancel={() => closeModal()}
      onSubmit={() => handleComplete()}
      title="Вы действительно хотите удалить отключение ресурса?"
      type="danger"
      submitText="Завершить отключение"
      isLoading={isLoading}
    />
  );
};
