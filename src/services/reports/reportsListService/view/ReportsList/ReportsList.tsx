import { Empty, Skeleton } from 'antd';
import React, { FC } from 'react';
import { ReportListItem } from './ReportListItem';
import { AdditionalWrapper, SkeletonWrapper } from './ReportsList.styled';
import { ReportsListProps } from './ReportsList.types';
import { RunnerPanel } from './RunnerPanel';

export const ReportsList: FC<ReportsListProps> = ({
  reportsList,
  isLoading,
  openExistedReport,
  setRunnerModalOpen,
  runnerStageNumber,
}) => {
  return (
    <div>
      {isLoading && (
        <SkeletonWrapper>
          <Skeleton active />
        </SkeletonWrapper>
      )}
      {!reportsList?.length && !isLoading && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      {!isLoading &&
        reportsList?.map((report) => (
          <ReportListItem
            openExistedReport={openExistedReport}
            key={report.id}
            report={report}
          />
        ))}

      <AdditionalWrapper>Дополнительно</AdditionalWrapper>

      <RunnerPanel
        setRunnerModalOpen={setRunnerModalOpen}
        runnerStageNumber={runnerStageNumber}
      />
    </div>
  );
};
