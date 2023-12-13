import { useUnit } from 'effector-react';
import React from 'react';
import { CreateReportModalContainer } from './CreateReportModal';
import { reportsInputs } from './models';
import { ReportsPage } from './ReportsPage';

const { createReportButtonClicked } = reportsInputs;

export const ReportsPageContainer = () => {
  const { onCreateReport } = useUnit({
    onCreateReport: createReportButtonClicked,
  });

  return (
    <>
      <CreateReportModalContainer />
      <ReportsPage onCreateReport={() => onCreateReport()} />
    </>
  );
};
