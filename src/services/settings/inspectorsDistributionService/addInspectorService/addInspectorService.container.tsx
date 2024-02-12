import React from 'react';
import { useUnit } from 'effector-react';
import { addInspectorService } from './addInspectorService.models';
import { AddInspectorForm } from './view/AddInspectorForm';
import { FormModal } from 'ui-kit/Modals/FormModal';

const formId = 'Add-Inspector-Form';

export const AddInspectorContainer = () => {
  const { isOpen, setBuldingId, handleAddInspector, isLoading } = useUnit({
    isOpen: addInspectorService.outputs.$isOpen,
    isLoading: addInspectorService.outputs.$isLoading,
    setBuldingId: addInspectorService.inputs.setBuldingId,
    handleAddInspector: addInspectorService.inputs.handleAddInspector,
  });

  return (
    <FormModal
      formId={formId}
      loading={isLoading}
      title="Добавить инспектора"
      visible={isOpen}
      onCancel={() => setBuldingId(null)}
      form={
        <AddInspectorForm
          formId={formId}
          handleAddInspector={handleAddInspector}
        />
      }
    />
  );
};
