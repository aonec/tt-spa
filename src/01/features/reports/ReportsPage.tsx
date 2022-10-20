import React, { FC } from 'react';
import { PageHeader } from '01/shared/ui/PageHeader';
import { ReportsListContainer } from './reportsListService';
import { Wrapper } from './ReportsPage.styled';

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
