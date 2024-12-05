import React from 'react';
import { deleteInspectorService } from './deleteInspectorService.models';
import { useUnit } from 'effector-react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Wrapper } from './deleteInspectorService.styled';

const { inputs, outputs } = deleteInspectorService;

export const DeleteInspectorContainer = () => {
  const { isModalOpen, handleCancel, inspector, handleConfirm, isLoading } =
    useUnit({
      isModalOpen: outputs.$isModalOpen,
      inspector: outputs.$deletingInspector,
      handleCancel: inputs.cancelDelete,
      handleConfirm: inputs.handleConfirmDelete,
      isLoading: inputs.$isLoading,
    });

  return (
    <FormModal
      title="Удалить инспектора?"
      formId="delete-inspector-modal"
      visible={isModalOpen}
      onCancel={handleCancel}
      onSubmit={handleConfirm}
      loading={isLoading}
      form={
        <Wrapper>
          Вы действительно хоитие удалить инспектора &quot;{inspector?.fullName}&quot;
        </Wrapper>
      }
      submitButtonType="danger"
      submitBtnText="Удалить"
    />
  );
};
