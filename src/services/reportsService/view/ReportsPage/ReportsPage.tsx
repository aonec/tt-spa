import React, { FC } from 'react';
import {
  ReportBlock,
  ReportBlocksWrapper,
  ReportName,
  Title,
  Wrapper,
} from './ReportsPage.styled';
import { ReportsPageProps } from './ReportsPage.types';
import { PageHeader } from '01/shared/ui/PageHeader';
import { ReportsListContainer } from '01/features/reports/reportsListService';
import { reportsSelectItems } from './ReportsPage.constants';

export const ReportsPage: FC<ReportsPageProps> = ({}) => {
  return (
    <Wrapper>
      <PageHeader title="Отчеты" />
      <Title>Новый отчет</Title>
      <ReportBlocksWrapper>
        {reportsSelectItems.map(({ name, icon, reportName }) => (
          <ReportBlock key={reportName}>
            {icon}
            <ReportName>{name}</ReportName>
          </ReportBlock>
        ))}
      </ReportBlocksWrapper>
      <ReportsListContainer />
    </Wrapper>
  );
};
