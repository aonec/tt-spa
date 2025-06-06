import React from 'react';
import { connectionAnalysisService } from './connectionAnalysisService.models';
import { Statistics } from './Statistics';
import { useUnit } from 'effector-react';
import { PingCalculatorContainer } from 'services/calculators/pingCalculator';
import { pingCalculatorService } from 'services/calculators/pingCalculator/pingCalculatorService.models';

const { outputs, gates, inputs } = connectionAnalysisService;
const { PageGate } = gates;

export const ConnectionAnalysisContainer = () => {
  const {
    calculatorsSortedList,
    isLoading,
    handleDownload,
    isDownloading,
    pageNumbers,
    setPageNumber,
    handlePing,
  } = useUnit({
    calculatorsSortedList: outputs.$calculatorsSortedList,
    isLoading: outputs.$isLoading,
    handleDownload: inputs.handleDownload,
    isDownloading: outputs.$isDownloading,
    setPageNumber: inputs.setPageNumber,
    pageNumbers: outputs.$pageNumbers,
    handlePing: pingCalculatorService.inputs.openModal,
  });

  return (
    <>
      <PageGate />
      <PingCalculatorContainer />
      <Statistics
        calculatorsSortedList={calculatorsSortedList}
        isLoading={isLoading}
        handlePing={handlePing}
        handleDownload={handleDownload}
        isDownloading={isDownloading}
        pageNumbers={pageNumbers}
        setPageNumber={setPageNumber}
      />
    </>
  );
};
