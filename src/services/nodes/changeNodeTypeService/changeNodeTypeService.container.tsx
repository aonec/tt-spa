import { useUnit } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { changeNodeTypeService } from './changeNodeTypeService.model';
import { ChangeNodeTypeForm } from './view/ChangeNodeTypeForm';

const { inputs, outputs } = changeNodeTypeService;
const formId = 'change-node-type-form';

export const ChangeNodeTypeContainer = () => {
  const { closeModal, isOpen, setNodeTypePayload } = useUnit({
    isOpen: outputs.$isOpen,
    closeModal: inputs.closeModal,
    setNodeTypePayload: inputs.setNodeTypePayload,
  });

  return (
    <FormModal
      title="Изменение типа узла"
      submitBtnText="Изменить тип узла"
      form={
        <ChangeNodeTypeForm
          formId={formId}
          setNodeTypePaylaod={setNodeTypePayload}
        />
      }
      visible={isOpen}
      onCancel={() => closeModal()}
      formId={formId}
    />
  );
};
