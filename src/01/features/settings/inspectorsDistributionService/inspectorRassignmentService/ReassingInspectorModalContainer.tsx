import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { inspectorReassignmentService } from './inspectorReassignmentService.models';
import { ReassingInspectorModal } from './views/ReassingInspectorModal';

export const ReassingInspectorModalContainer = () => {
  const isOpen = useStore(inspectorReassignmentService.outputs.$isModalOpen);
  const inspectorsList = useStore(
    inspectorReassignmentService.outputs.$inspectorsList
  );

  const handleClose = useEvent(inspectorReassignmentService.inputs.closeModal);
  const handleSave = useEvent(
    inspectorReassignmentService.inputs.saveInspectorReassing
  );

  const form = inspectorReassignmentService.form.reassingmentInspectorsForm;

  return (
    <ReassingInspectorModal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      handleSave={() => handleSave()}
      form={form}
      inspectorsList={inspectorsList}
    />
  );
};
