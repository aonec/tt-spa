import React from 'react';
import { useUnit } from 'effector-react';
import { inspectorReassignmentService } from './inspectorReassignmentService.models';
import { ReassingInspectorModal } from './views/ReassingInspectorModal';

export const ReassingInspectorModalContainer = () => {
  const { handleClose, handleSave, inspectorsList, isLoading, isOpen } =
    useUnit({
      isOpen: inspectorReassignmentService.outputs.$isModalOpen,
      inspectorsList: inspectorReassignmentService.outputs.$inspectorsList,
      isLoading: inspectorReassignmentService.outputs.$isLoading,
      handleClose: inspectorReassignmentService.inputs.closeModal,
      handleSave: inspectorReassignmentService.inputs.saveInspectorReassing,
    });


  return (
    <ReassingInspectorModal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      handleSave={handleSave}
      inspectorsList={inspectorsList}
      isLoading={isLoading}
    />
  );
};
