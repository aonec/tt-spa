import React, { FC } from 'react';
import { Wrapper } from './ReportViewTable.styled';
import { ReportViewTableProps } from './ReportViewTable.types';
import { Empty } from 'antd';

export const ReportViewTable: FC<ReportViewTableProps> = ({}) => {
  return (
    <Wrapper>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Выберите фильтры для формирования отчёта"
      />
    </Wrapper>
  );
};
