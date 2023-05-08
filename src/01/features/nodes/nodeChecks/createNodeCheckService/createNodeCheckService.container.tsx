import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { NodeCheckForm } from './view/NodeCheckForm';
import { createNodeCheckService } from './createNodeCheckService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs } = createNodeCheckService;
const formId = 'create-node-check';

export const CreateNodeCheckContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const isLoading = useStore(outputs.$isLoading);

  const closeModal = useEvent(inputs.closeModal);
  const createNodeCheck = useEvent(inputs.createNodeCheck);

  return (
    <FormModal
      title="Создать проверку"
      submitBtnText="Создать проверку"
      form={<NodeCheckForm handleSubmit={createNodeCheck} formId={formId} />}
      formId={formId}
      visible={isOpen}
      onCancel={closeModal}
      loading={isLoading}
    />
  );
};
