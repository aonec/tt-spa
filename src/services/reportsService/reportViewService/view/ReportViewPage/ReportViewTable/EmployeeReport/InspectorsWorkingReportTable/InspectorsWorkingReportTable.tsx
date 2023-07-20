import { InspectorsConstructedReportResponse } from 'api/myApi';
import React, { FC } from 'react';
import { Table } from 'ui-kit/Table';
import { getFilledArray } from 'utils/getFilledArray';
import { getSumColumnCSS } from '../OperatorsWorkingReportTable/OperatorsWorkingReportTable.styled';
import { getNameColumnCSS } from './InspectorsWorkingReportTable.styled';
import { InspectorsWorkingReportTableProps } from './InspectorsWorkingReportTable.types';

export const InspectorsWorkingReportTable: FC<
  InspectorsWorkingReportTableProps
> = ({ data }) => {
  const elements = data.InspectorsWorkingReport || [];

  return (
    <Table
      columns={[
        {
          label: '№',
          size: '50px',
          render: (_, index) => index + 1,
        },
        {
          label: 'Контролер',
          size: '190px',
          render: (elem) => elem.name,
          css: getNameColumnCSS,
        },
        {
          label: 'Ежедневный план',
          size: '120px',
          render: (elem) => elem.dayPlan,
        },
        ...getFilledArray(11, (index) => {
          return {
            label: `${index + 16}`,
            size: '75px',
            render: (elem: InspectorsConstructedReportResponse) =>
              elem.counts?.[index] || 0,
          };
        }),
        {
          label: 'Количество показаний',
          size: '160px',
          css: getSumColumnCSS,
          render: (elem) => elem.counts?.reduce((acc, elem) => acc + elem, 0),
        },
      ]}
      elements={elements}
    />
  );
};
