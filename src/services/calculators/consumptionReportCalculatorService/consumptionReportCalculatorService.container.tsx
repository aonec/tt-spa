import React, { FC } from 'react';
import { consumptionReportCalculatorService } from './consumptionReportCalculatorService.model';
import { ConsumptionReportCalculatorModal } from './view/ConsumptionReportCalculatorModal';
import { useEvent, useStore } from 'effector-react';
import { ConsumptionReportCalculatorServiceContainerProps } from './consumptionReportCalculatorService.types';

const { inputs, outputs } = consumptionReportCalculatorService;

export const ConsumptionReportCalculatorContainer: FC<ConsumptionReportCalculatorServiceContainerProps> = ({
  calculator,
}) => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  const handleModalClosed = useEvent(inputs.handleModalClose);

  return (
    <>
      <ConsumptionReportCalculatorModal
        isModalOpen={isModalOpen}
        handleModalClosed={() => handleModalClosed()}
        calculator={calculator}
      />
    </>
  );
};
