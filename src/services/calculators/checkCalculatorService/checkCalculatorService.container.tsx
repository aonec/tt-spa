import { useUnit } from 'effector-react';
import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { checkCalculatorService } from './checkCalculatorService.model';
import { CheckCalculatorForm } from './view/CheckCalculatorForm';

const { inputs, outputs } = checkCalculatorService;

export const CheckCalculatorContainer = () => {
  const { calculator, handleCheckCalculator, handleCloseModal, isOpen } =
    useUnit({
      calculator: outputs.$calculatorInfo,
      isOpen: outputs.$isModalOpen,
      handleCloseModal: inputs.closeModal,
      handleCheckCalculator: inputs.checkCalculator,
    });

  if (!calculator) {
    return null;
  }

  const { model, serialNumber } = calculator;

  const formId = 'check-calculator-form';

  const form = (
    <CheckCalculatorForm
      formId={formId}
      handleCheckCalculator={handleCheckCalculator}
    />
  );

  return (
    <FormModal
      title={`Поверка вычислителя ${model} ${serialNumber}`}
      submitBtnText="Сохранить изменения"
      onCancel={() => handleCloseModal()}
      visible={isOpen}
      formId={formId}
      form={form}
    />
  );
};
