import React from 'react';
import { removeNodeCheckService } from './removeNodeCheckService.model';
import { useUnit } from 'effector-react';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';

const { inputs, outputs } = removeNodeCheckService;

export const RemoveNodeCheckContainer = () => {
  const { closeModal, isLoading, isOpen, removeNodeCheck } = useUnit({
    isOpen: outputs.$isOpen,
    isLoading: outputs.$isLoading,
    closeModal: inputs.closeModal,
    removeNodeCheck: inputs.removeNodeCheck,
  });

  return (
    <Dialog
      isOpen={isOpen}
      onCancel={closeModal}
      onSubmit={removeNodeCheck}
      type="danger"
      description={'Вы уверены, что хотите удалить проверку?'}
      title="Удаление проверки"
      isLoading={isLoading}
    />
  );
};
