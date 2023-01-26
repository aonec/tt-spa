import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { changeNodeTypeService } from './changeNodeTypeService.model';
import { ChangeNodeTypeForm } from './view/ChangeNodeTypeForm';

const { inputs, outputs } = changeNodeTypeService;
const formId = 'change-node-type-form';

export const ChangeNodeTypeContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const node = useStore(outputs.$node);

  const closeModal = useEvent(inputs.closeModal);
  const setNodeTypePayload = useEvent(inputs.setNodeTypePayload);

  return (
    <FormModal
      title="Изменение типа узла"
      submitBtnText="Изменить тип узла"
      form={
        node && (
          <ChangeNodeTypeForm
            formId={formId}
            node={node}
            setNodeTypePaylaod={setNodeTypePayload}
          />
        )
      }
      visible={isOpen}
      onCancel={() => closeModal()}
      formId={formId}
    />
  );
};
