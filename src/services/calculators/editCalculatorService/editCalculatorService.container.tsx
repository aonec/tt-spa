import React from 'react';
import { EditCalculatorPage } from './view/EditCalculatorPage';
import { editCalculatorService } from './editCalculatorService.model';
import { useEvent, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { calculatorProfileService } from '../calculatorProfileService';

const { inputs, outputs, gates } = editCalculatorService;
const { CalculatorIdGate } = calculatorProfileService.gates;

export const EditCalculatorContainer = () => {
  const handleChangeTab = useEvent(inputs.handleChangeTab);

  const currentTab = useStore(outputs.$currentTab);
  const calculator = useStore(outputs.$calculator);

  const { calculatorId } = useParams<{ calculatorId: string }>();
  return (
    <>
      <CalculatorIdGate id={Number(calculatorId)} />
      <EditCalculatorPage
        calculator={calculator}
        currentTab={currentTab}
        handleChangeTab={handleChangeTab}
      />
    </>
  );
};
