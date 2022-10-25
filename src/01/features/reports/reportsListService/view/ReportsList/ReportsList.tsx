import { Empty, Skeleton } from 'antd';
import React, { FC } from 'react';
import { EyeIcon } from 'ui-kit/icons';
import { ReportListItem } from './ReportListItem';
import {
  Header,
  ShowArchivedReportsTextWrapper,
  ShowArchivedReportsWrapper,
} from './ReportsList.styled';
import { ReportsListProps } from './ReportsList.types';

export const ReportsList: FC<ReportsListProps> = ({
  reportsList,
  isLoading,
  openExistedReport,
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
          <ReportListItem
            openExistedReport={openExistedReport}
            key={report.id}
            report={report}
          />
        ))}
      <ShowArchivedReportsWrapper>
        <EyeIcon />
        <ShowArchivedReportsTextWrapper>
          Показать архивные отчеты (56)
        </ShowArchivedReportsTextWrapper>
      </ShowArchivedReportsWrapper>
    </div>
  );
};
