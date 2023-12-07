import React from 'react';
import { useUnit } from 'effector-react';
import { removeNodeCalculatorConnectionService } from './removeConnectionService.models';
import { FormModal } from 'ui-kit/Modals/FormModal';

const { inputs, outputs } = removeNodeCalculatorConnectionService;

export const RemoveConnectionConfirmModalContainer = () => {
  const {
    closeConfirmationModal,
    isConfirmModalOpen,
    isLoading,
    removeConnection,
  } = useUnit({
    isConfirmModalOpen: outputs.$isConfirmModalOpen,
    isLoading: outputs.$isLoading,
    closeConfirmationModal: inputs.closeModal,
    removeConnection: inputs.removeConnection,
  });

  return (
    <FormModal
      formId=""
      visible={isConfirmModalOpen}
      title="Вы действительно хотите удалить вычислитель?"
      submitBtnText="Удалить"
      submitButtonType="danger"
      onCancel={() => closeConfirmationModal()}
      loading={isLoading}
      onSubmit={() => removeConnection()}
      form={
        <>
          Вычислитель останется в системе, но будет отключен от узла. Без
          вычислителя приборы узла не будут опрашиваться в автоматическом
          режиме.
        </>
      }
    />
  );
};
