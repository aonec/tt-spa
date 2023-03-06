import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { closeCalculatorService } from './closeCalculatorService.model';
import { CloseCalculatorForm } from './view/CloseCalculatorForm';
import { useHistory } from 'react-router-dom';

const { inputs, outputs } = closeCalculatorService;

export const CloseCalculatorContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const calculator = useStore(outputs.$calculatorInfo);

  const handleCloseModal = useEvent(inputs.closeModal);
  const handleCloseCalculator = useEvent(inputs.closeCalculator);

  const navigate = useHistory();

  useEffect(() => {
    return inputs.successClose.watch(() => navigate.goBack()).unsubscribe;
  }, [navigate]);

  if (!calculator) {
    return null;
  }

  const { model, serialNumber } = calculator || {};

  const formId = 'close-calculator-form';

  const form = (
    <CloseCalculatorForm handleSubmit={handleCloseCalculator} formId={formId} />
  );

  return (
    <FormModal
      title={`Вы действительно хотите снять ${model} (${serialNumber}) с учета?`}
      submitBtnText="Снять прибор с учета"
      submitButtonType="danger"
      onCancel={() => handleCloseModal()}
      visible={isOpen}
      formId={formId}
      form={form}
    />
  );
};
