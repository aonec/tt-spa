import React, { FC } from 'react';
import { PageHeader } from '01/shared/ui/PageHeader';
import { ReportsListContainer } from './reportsListService';

interface Props {
  onCreateReport(): void;
}

export const ReportsPage: FC<Props> = ({ onCreateReport }) => {
  return (
    <div>
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
    </div>
  );
};
