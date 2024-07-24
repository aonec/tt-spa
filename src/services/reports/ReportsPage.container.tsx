import { useUnit } from 'effector-react';
import React from 'react';
import { CreateReportModalContainer } from './CreateReportModal';
import { reportsInputs } from './models';
import { ReportsPage } from './ReportsPage';
import { CreateRunnerContainer } from './createRunnerService';

const { createReportButtonClicked } = reportsInputs;

export const ReportsPageContainer = () => {
  const { onCreateReport } = useUnit({
    onCreateReport: createReportButtonClicked,
  });

  return (
    <>
      <CreateReportModalContainer />
      <CreateRunnerContainer />
      <ReportsPage onCreateReport={() => onCreateReport()} />
    </>
  );
};
