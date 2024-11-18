import React, { FC } from 'react';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { Wrapper } from './ReportsPage.styled';
import { ReportsListContainer } from 'services/reportsService/reportsListService';

interface Props {
  onCreateReport(): void;
}

export const ReportsPage: FC<Props> = ({ onCreateReport }) => {
  return (
    <Wrapper>
      <PageHeader
        title="Отчеты"
        contextMenu={{
          menuButtons: [
            {
              title: 'Создать отчет',
              onClick: onCreateReport,
            },
          ],
        }}
      />
      <ReportsListContainer />
    </Wrapper>
  );
};
