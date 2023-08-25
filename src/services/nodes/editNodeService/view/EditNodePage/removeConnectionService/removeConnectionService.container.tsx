import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { removeNodeCalculatorConnectionService } from './removeConnectionService.models';
import { FormModal } from 'ui-kit/Modals/FormModal';

const { inputs, outputs } = removeNodeCalculatorConnectionService;

export const RemoveConnectionConfirmModalContainer = () => {
  const isConfirmModalOpen = useStore(outputs.$isConfirmModalOpen);
  const isLoading = useStore(outputs.$isLoading);

  const closeConfirmationModal = useEvent(inputs.closeModal);
  const removeConnection = useEvent(inputs.removeConnection);

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
