import { useUnit } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { changeNodeStatusService } from './changeNodeStatusService.model';
import { ChangeNodeStatusForm } from './view/ChangeNodeStatusForm';

const { inputs, outputs } = changeNodeStatusService;
const formId = 'change-node-status-form';

export const ChangeNodeStatusContainer = () => {
  const { closeModal, handleChangeNodeStatus, isOpen, node } = useUnit({
    isOpen: outputs.$isOpen,
    node: outputs.$node,
    closeModal: inputs.closeModal,
    handleChangeNodeStatus: inputs.changeNodeStatus,
  });

  return (
    <FormModal
      title="Изменение статуса узла"
      submitBtnText="Изменить статус"
      form={
        node && (
          <ChangeNodeStatusForm
            initialData={{ commercialStatus: node.commercialStatus?.value }}
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
