import { useEvent, useStore } from 'effector-react';
import dayjs from 'api/dayjs';
import React from 'react';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { completeResourceDisconnectionService } from './completeResourceDisconnectionService.model';

const { inputs, outputs } = completeResourceDisconnectionService;

export const CompleteResourceDisconnectionContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$completeResourceDisconnectionIsLoading);
  const endDate = useStore(outputs.$endDate);

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
      description={
        <>
          {endDate &&
            `Плановая дата завершения - ${dayjs(endDate).format('LL')} `}
          Если вы подтверждаете принудительное завершение, то отключение ресурса
          закончится на всех объектах автоматически после подтверждения.
        </>
      }
    />
  );
};
