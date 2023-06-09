import React, { FC } from 'react';
import { consumptionReportCalculatorService } from './consumptionReportCalculatorService.model';
import { ConsumptionReportCalculatorModal } from './view/ConsumptionReportCalculatorModal';
import { useEvent, useStore } from 'effector-react';
import { ConsumptionReportCalculatorServiceContainerProps } from './consumptionReportCalculatorService.types';

const { inputs, outputs } = consumptionReportCalculatorService;

export const ConsumptionReportCalculatorContainer: FC<
  ConsumptionReportCalculatorServiceContainerProps
> = ({ calculator }) => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  const isLoading = useStore(outputs.$isLoading);

  const handleModalClosed = useEvent(inputs.handleModalClose);

  const handleSubmit = useEvent(inputs.handleSubmit);

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
