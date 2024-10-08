import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { closeCalculatorService } from './closeCalculatorService.model';
import { CloseCalculatorForm } from './view/CloseCalculatorForm';
import { useNavigate } from 'react-router-dom';

const { inputs, outputs } = closeCalculatorService;

export const CloseCalculatorContainer = () => {
  const { calculator, handleCloseCalculator, handleCloseModal, isOpen } =
    useUnit({
      isOpen: outputs.$isModalOpen,
      calculator: outputs.$calculatorInfo,
      handleCloseModal: inputs.closeModal,
      handleCloseCalculator: inputs.closeCalculator,
    });

  const navigate = useNavigate();

  useEffect(() => {
    return inputs.successClose.watch(() => navigate(-1)).unsubscribe;
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
