import { Empty, Skeleton } from 'antd';
import React, { FC } from 'react';
import { ReportListItem } from './ReportListItem';
import { Header } from './ReportsList.styled';
import { ReportsListProps } from './ReportsList.types';

export const ReportsList: FC<ReportsListProps> = ({
  reportsList,
  isLoading,
}) => {
  return (
    <div>
      <Header>Актуальные отчеты</Header>
      {isLoading && <Skeleton active />}
      {!reportsList?.length && !isLoading && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      {!isLoading &&
        reportsList?.map((report) => (
          <ReportListItem key={report.id} report={report} />
        ))}
    </div>
  );
};
