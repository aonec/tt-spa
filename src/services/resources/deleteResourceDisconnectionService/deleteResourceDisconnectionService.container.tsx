import { useEvent, useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import { Dialog } from 'ui-kit/shared_components/Dialog/Dialog';
import { deleteResourceDisconnectionService } from './deleteResourceDisconnectionService.model';

const { inputs, outputs } = deleteResourceDisconnectionService;

export const DeleteResourceDisconnectionContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$deleteResourceDisconnectionIsLoading);
  const endDate = useStore(outputs.$endDate);

  const closeModal = useEvent(inputs.closeModal);
  const handleComplete = useEvent(inputs.deleteResourceDisconnection);

  return (
    <Dialog
      isOpen={isOpen}
      onCancel={() => closeModal()}
      onSubmit={() => handleComplete()}
      title="Вы действительно хотите удалить отключение ресурса?"
      type="danger"
      submitText="Удалить отключение"
      isLoading={isLoading}
      description={
        <>
          {endDate &&
            `Плановая дата завершения - ${moment(endDate).format('LL')} `}
          Если вы подтверждаете удаление, то отключение ресурса закончится на
          всех объектах автоматически после подтверждения.
        </>
      }
    />
  );
};
