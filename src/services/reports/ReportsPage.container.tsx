import { useEvent } from 'effector-react';
import React from 'react';
import { CreateReportModalContainer } from './CreateReportModal';
import { reportsInputs } from './models';
import { ReportsPage } from './ReportsPage';

const { createReportButtonClicked } = reportsInputs;

export const ReportsPageContainer = () => {
  const onCreateReport = useEvent(createReportButtonClicked);

  return (
    <>
      <CreateReportModalContainer />
      <ReportsPage onCreateReport={() => onCreateReport()} />
    </>
  );
};
