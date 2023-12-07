import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { NodeCheckForm } from '../createNodeCheckService/view/NodeCheckForm';
import { editNodeCheckService } from './editNodeCheckService.model';
import { useUnit } from 'effector-react';

const { inputs, outputs } = editNodeCheckService;
const formId = 'edit-node-check';

export const EditNodeCheckContainer = () => {
  const { closeModal, editNodeCheck, initialValues, isLoading, isOpen } =
    useUnit({
      isOpen: outputs.$isOpen,
      initialValues: outputs.$updateNodePayload,
      isLoading: outputs.$isLoading,
      editNodeCheck: inputs.editNodeCheck,
      closeModal: inputs.closeModal,
    });

  return (
    <FormModal
      title="Редактировать проверку"
      submitBtnText="Сохранить изменения"
      form={
        initialValues && (
          <NodeCheckForm
            handleSubmit={editNodeCheck}
            formId={formId}
            initialValues={initialValues}
            isEdit
          />
        )
      }
      formId={formId}
      visible={isOpen}
      onCancel={() => closeModal()}
      loading={isLoading}
    />
  );
};
