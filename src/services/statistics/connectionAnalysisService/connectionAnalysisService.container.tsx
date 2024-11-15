import React from 'react';
import { connectionAnalysisService } from './connectionAnalysisService.models';
import { Statistics } from './Statistics';
import { useUnit } from 'effector-react';

const { outputs, gates } = connectionAnalysisService;
const { PageGate } = gates;

export const ConnectionAnalysisContainer = () => {
  const { calculatorsSortedList, isLoading } = useUnit({
    calculatorsSortedList: outputs.$calculatorsSortedList,
    isLoading: outputs.$isLoading,
  });

  return (
    <>
      <PageGate />
      <Statistics
        calculatorsSortedList={calculatorsSortedList}
        isLoading={isLoading}
      />
    </>
  );
};
