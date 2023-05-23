import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { ModalTT } from '01/shared/ui/ModalTT';
import { removeNodeCalculatorConnectionService } from './removeConnectionService.models';

const { inputs, outputs } = removeNodeCalculatorConnectionService;

export const RemoveConnectionConfirmModalContainer = () => {
  const isConfirmModalOpen = useStore(outputs.$isConfirmModalOpen);
  const isLoading = useStore(outputs.$isLoading);

  const closeConfirmationModal = useEvent(inputs.closeModal);
  const removeConnection = useEvent(inputs.removeConnection);

  return (
    <ModalTT
      visible={isConfirmModalOpen}
      title="Вы действительно хотите удалить вычислитель?"
      saveBtnText="Удалить"
      saveButtonType="danger"
      onCancel={() => closeConfirmationModal()}
      loading={isLoading}
      onSubmit={() => removeConnection()}
    >
      Вчислитель останется в системе, но будет отключен от узла. Без вычислителя
      приборы узла не будут опрашиваться в автоматическом режиме.
    </ModalTT>
  );
};
