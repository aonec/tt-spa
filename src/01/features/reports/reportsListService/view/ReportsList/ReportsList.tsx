import { Empty, Skeleton } from 'antd';
import React, { FC } from 'react';
import { ReportListItem } from './ReportListItem';
import { SkeletonWrapper } from './ReportsList.styled';
import { ReportsListProps } from './ReportsList.types';

export const ReportsList: FC<ReportsListProps> = ({
  reportsList,
  isLoading,
  openExistedReport,
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
    </div>
  );
};
