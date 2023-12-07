import { useUnit } from 'effector-react';
import dayjs from 'api/dayjs';
import React from 'react';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { deleteResourceDisconnectionService } from './deleteResourceDisconnectionService.model';

const { inputs, outputs } = deleteResourceDisconnectionService;

export const DeleteResourceDisconnectionContainer = () => {
  const { closeModal, endDate, handleComplete, isLoading, isOpen } = useUnit({
    isOpen: outputs.$isModalOpen,
    isLoading: outputs.$deleteResourceDisconnectionIsLoading,
    endDate: outputs.$endDate,
    closeModal: inputs.closeModal,
    handleComplete: inputs.deleteResourceDisconnection,
  });

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
            `Плановая дата завершения - ${dayjs(endDate).format('LL')} `}
          Если вы подтверждаете удаление, то отключение ресурса закончится на
          всех объектах автоматически после подтверждения.
        </>
      }
    />
  );
};
