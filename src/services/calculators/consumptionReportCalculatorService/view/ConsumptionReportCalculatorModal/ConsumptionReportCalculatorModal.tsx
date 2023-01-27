import React, { FC } from 'react';
import { ConsumptionReportCalculatorModalProps } from './ConsumptionReportCalculatorModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ConsumptionReportCalculatorForm } from './ConsumptionReportCalculatorForm/ConsumptionReportCalculatorForm';

const formId = 'consumption-report-calculator-modal';

export const ConsumptionReportCalculatorModal: FC<
  ConsumptionReportCalculatorModalProps
> = ({ handleModalClosed, isModalOpen, calculator, handleSubmit }) => {
  const isSono = calculator?.infoId === 10;

  return (
    <FormModal
      title="Выгрузка отчета об общедомовом потреблении"
      visible={isModalOpen}
      onCancel={handleModalClosed}
      form={
        <ConsumptionReportCalculatorForm
          formId={formId}
          calculator={calculator}
          handleSubmitForm={handleSubmit}
          isSono={isSono}
        />
      }
      formId={formId}
      submitBtnText="Выгрузить"
    />
  );
};
