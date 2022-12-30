import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { changeNodeStatusService } from './changeNodeStatusService.model';
import { ChangeNodeStatusForm } from './view/ChangeNodeStatusForm';

const { inputs, outputs } = changeNodeStatusService;
const formId = 'change-node-status-form';

export const ChangeNodeStatusContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const node = useStore(outputs.$node);

  const closeModal = useEvent(inputs.closeModal);
  const handleChangeNodeStatus = useEvent(inputs.changeNodeStatus);

  return (
    <FormModal
      title="Изменение статуса узла"
      submitBtnText="Изменить статус"
      form={
        node && (
          <ChangeNodeStatusForm
            initialValues={node}
            formId={formId}
            handleChangeNodeStatus={handleChangeNodeStatus}
          />
        )
      }
      visible={isOpen}
      onCancel={() => closeModal()}
      formId={formId}
    />
  );
};
