import { Empty } from 'antd';
import React, { FC } from 'react';
import { Wrapper } from './HomeownersReport.styled';
import { HomeownersReportProps } from './HomeownersReport.types';

export const HomeownersReport: FC<HomeownersReportProps> = ({
  homeownersReportData,
}) => {
  if (!homeownersReportData) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Выберите фильтры для формирования отчета'"
      />
    );
  }

  return <Wrapper></Wrapper>;
};
