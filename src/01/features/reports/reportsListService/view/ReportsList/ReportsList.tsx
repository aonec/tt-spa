import { Empty, Skeleton } from 'antd';
import React, { FC } from 'react';
import { ReportListItem } from './ReportListItem';
import { Wrapper } from './ReportsList.styled';
import { ReportsListProps } from './ReportsList.types';

export const ReportsList: FC<ReportsListProps> = ({
  reportsList,
  isLoading,
}) => {
  return (
    <Wrapper>
      {isLoading && <Skeleton active />}
      {!reportsList?.length && !isLoading && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      {!isLoading &&
        reportsList?.map((report) => (
          <ReportListItem key={report.id} report={report} />
        ))}
    </Wrapper>
  );
};
