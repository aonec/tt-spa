import React, { FC } from 'react';
import { PageHeader } from '../../shared/ui/PageHeader';

interface Props {
  onCreateReport(): void;
}

export const ReportsPage: FC<Props> = ({ onCreateReport }) => {
  return (
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
  );
};
