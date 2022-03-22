import { useStore } from 'effector-react';
import React from 'react';
import { CreateCalculatorModal } from './CreateCalculatorModal';
import { createCalcuatorService } from './models';

export const CreateCalculatorModalContainer = () => {
  const isOpen = useStore(
    createCalcuatorService.outputs.$isCreateCalculatorModalOpen
  );

  return (
    <CreateCalculatorModal
      isOpen={isOpen}
      onClose={createCalcuatorService.inputs.closeCreateCalculatorModal}
    />
  );
};
