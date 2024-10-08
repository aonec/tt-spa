import { InspectorsConstructedReportResponse } from 'api/types';
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
      isSticky
      columns={[
        {
          label: '№',
          size: '50px',
          render: (_, index) => index + 1,
        },
        {
          label: 'Контролер',
          size: '220px',
          render: (elem) => elem.name,
          css: getNameColumnCSS,
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
