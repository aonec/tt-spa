import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { Dialog } from 'ui-kit/shared_components/Dialog/Dialog';
import { completeResourceDisconnectionService } from './completeResourceDisconnectionService.model';

const { inputs, outputs } = completeResourceDisconnectionService;

export const CompleteResourceDisconnectionContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$completeResourceDisconnectionIsLoading);

  const closeModal = useEvent(inputs.closeModal);
  const handleComplete = useEvent(inputs.completeResourceDisconnection);

  return (
    <Dialog
      isOpen={isOpen}
      onCancel={() => closeModal()}
      onSubmit={() => handleComplete()}
      title="Вы действительно хотите завершить отключение ресурса раньше?"
      type="danger"
      submitText="Завершить отключение"
      isLoading={isLoading}
    />
  );
};
