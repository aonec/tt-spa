import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { CreateCalculatorModal } from './CreateCalculatorModal';
import { createCalcuatorService } from './models';

export const CreateCalculatorModalContainer = () => {
  const isOpen = useStore(
    createCalcuatorService.outputs.$isCreateCalculatorModalOpen
  );
  const stage = useStore(createCalcuatorService.outputs.$stage);
  const onNextStage = useEvent(createCalcuatorService.inputs.nextStage);
  const onPreviousStage = useEvent(createCalcuatorService.inputs.previousStage);

  return (
    <CreateCalculatorModal
      stage={stage}
      isOpen={isOpen}
      onClose={createCalcuatorService.inputs.closeCreateCalculatorModal}
      onNextStage={() => onNextStage()}
      onPreviousStage={() => onPreviousStage()}
    />
  );
};
