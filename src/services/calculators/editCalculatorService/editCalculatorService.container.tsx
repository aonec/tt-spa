import React from 'react';
import { EditCalculatorPage } from './view/EditCalculatorPage';
import { editCalculatorService } from './editCalculatorService.model';
import { useEvent, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';

const { inputs, outputs, gates } = editCalculatorService;
const { CalculatorIdGate, CalculatorInfosGate } = gates;

export const EditCalculatorContainer = () => {
  const handleChangeTab = useEvent(inputs.handleChangeTab);

  const currentTab = useStore(outputs.$currentTab);
  const calculator = useStore(outputs.$calculator);

  const { deviceId } = useParams<{ deviceId: string }>();

  const calculatorTypesSelectItems = useStore(
    outputs.$calculatorTypesSelectItems
  );
  return (
    <>
      <CalculatorIdGate id={Number(deviceId)} />
      <CalculatorInfosGate />
      <EditCalculatorPage
        calculator={calculator}
        currentTab={currentTab}
        handleChangeTab={handleChangeTab}
        calculatorTypesSelectItems={calculatorTypesSelectItems}
      />
    </>
  );
};
