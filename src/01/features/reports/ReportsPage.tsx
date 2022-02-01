import { PageHeader } from '01/shared/ui/PageHeader';
import React from 'react';

export const ReportsPage = () => {
  return (
    <PageHeader
      title="Отчеты"
      contextMenu={{
        menuButtons: [{ title: 'Создать отчет', onClick() {} }],
      }}
    />
  );
};
