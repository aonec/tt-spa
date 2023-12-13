import React, { FC } from 'react';
import { consumptionReportCalculatorService } from './consumptionReportCalculatorService.model';
import { ConsumptionReportCalculatorModal } from './view/ConsumptionReportCalculatorModal';
import { useUnit } from 'effector-react';
import { ConsumptionReportCalculatorServiceContainerProps } from './consumptionReportCalculatorService.types';

const { inputs, outputs } = consumptionReportCalculatorService;

export const ConsumptionReportCalculatorContainer: FC<
  ConsumptionReportCalculatorServiceContainerProps
> = ({ calculator }) => {
  const { handleModalClosed, handleSubmit, isLoading, isModalOpen } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    isLoading: outputs.$isLoading,
    handleModalClosed: inputs.handleModalClose,
    handleSubmit: inputs.handleSubmit,
  });

  return (
    <>
      <ConsumptionReportCalculatorModal
        isModalOpen={isModalOpen}
        handleModalClosed={() => handleModalClosed()}
        calculator={calculator}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};
