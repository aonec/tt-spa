import React from 'react';
import { standartReportService } from './standartReportService.models';
import { ReportPage } from './view/ReportPage';
import { useUnit } from 'effector-react';

const { inputs, outputs } = standartReportService;

export const StandartReportContainer = () => {
  const {} = useUnit({});

  return (
    <>
      <ReportPage />
    </>
  );
};
