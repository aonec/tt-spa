import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { inspectorReassignmentService } from './inspectorReassignmentService.models';
import { ReassingInspectorModal } from './views/ReassingInspectorModal';

export const ReassingInspectorModalContainer = () => {
  const isOpen = useStore(inspectorReassignmentService.outputs.$isModalOpen);

  const handleClose = useEvent(inspectorReassignmentService.inputs.closeModal);

  return (
    <ReassingInspectorModal isOpen={isOpen} handleClose={() => handleClose()} />
  );
};
