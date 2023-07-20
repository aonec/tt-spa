import React from 'react';
import { removeNodeCheckService } from './removeNodeCheckService.model';
import { useEvent, useStore } from 'effector-react';
import { Dialog } from 'ui-kit/sharedComponents/Dialog/Dialog';

const { inputs, outputs } = removeNodeCheckService;

export const RemoveNodeCheckContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const isLoading = useStore(outputs.$isLoading);

  const closeModal = useEvent(inputs.closeModal);
  const removeNodeCheck = useEvent(inputs.removeNodeCheck);

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
