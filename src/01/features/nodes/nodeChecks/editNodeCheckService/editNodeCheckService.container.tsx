import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { NodeCheckForm } from '../createNodeCheckService/view/NodeCheckForm';
import { editNodeCheckService } from './editNodeCheckService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs } = editNodeCheckService;
const formId = 'edit-node-check';

export const EditNodeCheckContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const initialValues = useStore(outputs.$updateNodePayload);
  const isLoading = useStore(outputs.$isLoading);

  const editNodeCheck = useEvent(inputs.editNodeCheck);
  const closeModal = useEvent(inputs.closeModal);

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
