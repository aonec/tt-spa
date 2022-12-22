import React, { FC } from 'react';
import { ConsumptionReportCalculatorModalProps } from './ConsumptionReportCalculatorModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { ConsumptionReportCalculatorForm } from './ConsumptionReportCalculatorForm/ConsumptionReportCalculatorForm';
import { SonoReportCalculatorForm } from './SonoReportCalculatorForm/SonoReportCalculatorForm';

const formId = 'consumption-report-calculator-modal';

export const ConsumptionReportCalculatorModal: FC<ConsumptionReportCalculatorModalProps> = ({
  handleModalClosed,
  isModalOpen,
  calculator,
}) => {
  const isSono = calculator?.infoId === 10;

  return (
    <FormModal
      title="Выгрузка отчета об общедомовом потреблении"
      visible={isModalOpen}
      onCancel={handleModalClosed}
      form={
        <>
          {!isSono && <ConsumptionReportCalculatorForm formId={formId} calculator={calculator} />}
          {isSono && <SonoReportCalculatorForm formId={formId} />}
        </>
      }
      formId={formId}
      submitBtnText="Выгрузить"
    />
  );
};
