import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { NodeCheckForm } from './view/NodeCheckForm';
import { createNodeCheckService } from './createNodeCheckService.model';
import { useUnit } from 'effector-react';

const { inputs, outputs } = createNodeCheckService;
const formId = 'create-node-check';

export const CreateNodeCheckContainer = () => {
  const { closeModal, createNodeCheck, isLoading, isOpen } = useUnit({
    isOpen: outputs.$isOpen,
    isLoading: outputs.$isLoading,
    closeModal: inputs.closeModal,
    createNodeCheck: inputs.createNodeCheck,
  });

  return (
    <FormModal
      title="Создать проверку"
      submitBtnText="Создать проверку"
      onCancel={() => closeModal()}
      form={<NodeCheckForm handleSubmit={createNodeCheck} formId={formId} />}
      formId={formId}
      visible={isOpen}
      loading={isLoading}
    />
  );
};
