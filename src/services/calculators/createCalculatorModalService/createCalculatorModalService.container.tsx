import React from 'react';
import { createCalculatorModalService } from './createCalculatorModalService.model';
import { useUnit } from 'effector-react';
import { CreateCalculatorModal } from './view/CreateCalculatorModal';

const { inputs, outputs } = createCalculatorModalService;

export const CreateCalculatorModalContainer = () => {
  const {
    closeModal,
    goPrevStep,
    handleSubmitForm,
    isLoading,
    isOpen,
    payload,
    stepNumber,
    updatePayload,
  } = useUnit({
    stepNumber: outputs.$stepNumber,
    isOpen: outputs.$isOpen,
    isLoading: outputs.$isLoading,
    payload: outputs.$requestPayload,
    goPrevStep: inputs.goPrevStep,
    handleSubmitForm: inputs.handleSubmitForm,
    updatePayload: inputs.updateRequestPayload,
    closeModal: inputs.closeModal,
  });

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
