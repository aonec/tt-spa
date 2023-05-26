import React from 'react';
import { createCalculatorModalService } from './createCalculatorModalService.model';
import { useEvent, useStore } from 'effector-react';
import { CreateCalculatorModal } from './view/CreateCalculatorModal';

const { inputs, outputs } = createCalculatorModalService;

export const CreateCalculatorModalContainer = () => {
  const stepNumber = useStore(outputs.$stepNumber);
  const isOpen = useStore(outputs.$isOpen);
  const isLoading = useStore(outputs.$isLoading);
  const payload = useStore(outputs.$requestPayload);

  const goPrevStep = useEvent(inputs.goPrevStep);
  const handleSubmitForm = useEvent(inputs.handleSubmitForm);
  const updatePayload = useEvent(inputs.updateRequestPayload);
  const closeModal = useEvent(inputs.closeModal);

  return (
    <CreateCalculatorModal
      handleSubmitForm={handleSubmitForm}
      goPrevStep={goPrevStep}
      stepNumber={stepNumber}
      updatePayload={updatePayload}
      closeModal={closeModal}
      isOpen={isOpen}
      isLoading={isLoading}
      payload={payload}
    />
  );
};
