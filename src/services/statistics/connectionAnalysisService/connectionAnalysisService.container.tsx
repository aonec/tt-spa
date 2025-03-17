import React from 'react';
import { connectionAnalysisService } from './connectionAnalysisService.models';
import { Statistics } from './Statistics';
import { useUnit } from 'effector-react';

const { outputs, gates, inputs } = connectionAnalysisService;
const { PageGate } = gates;

export const ConnectionAnalysisContainer = () => {
  const {
    calculatorsSortedList,
    isLoading,
    handleDownload,
    isDownloading,
    pageNumber,
    setPageNumber,
  } = useUnit({
    calculatorsSortedList: outputs.$calculatorsSortedList,
    isLoading: outputs.$isLoading,
    handleDownload: inputs.handleDownload,
    isDownloading: outputs.$isDownloading,
    setPageNumber: inputs.setPageNumber,
    pageNumber: outputs.$pageNumber,
  });

  return (
    <>
      <PageGate />
      <Statistics
        calculatorsSortedList={calculatorsSortedList}
        isLoading={isLoading}
        handleDownload={handleDownload}
        isDownloading={isDownloading}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </>
  );
};
