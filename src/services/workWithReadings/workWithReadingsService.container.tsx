import React from 'react';
import { workWithReadingsService } from './workWithReadingsService.models';
import { StartPage } from './view/StartPage';
import { useUnit } from 'effector-react';
import { ReportTypeModal } from './view/ReportTypeModal';

const { inputs, outputs } = workWithReadingsService;

export const WorkWithReadingsContainer = () => {
  const { handleReportTypeModalOpen, isReportTypeModalOpen } = useUnit({
    handleReportTypeModalOpen: inputs.handleReportTypeModalOpen,
    isReportTypeModalOpen: outputs.$isReportTypeModalOpen,
  });

  return (
    <>
      <StartPage
        handleReportTypeModalOpen={handleReportTypeModalOpen}
        isReportTypeModalOpen={isReportTypeModalOpen}
      />
      <ReportTypeModal
        handleReportTypeModalOpen={handleReportTypeModalOpen}
        isOpen={isReportTypeModalOpen}
      />
    </>
  );
};
