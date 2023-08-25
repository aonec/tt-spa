import React, { FC } from 'react';
import { Table } from 'ui-kit/Table';
import { getNameColumnCSS } from '../InspectorsWorkingReportTable/InspectorsWorkingReportTable.styled';
import { getSumColumnCSS } from '../OperatorsWorkingReportTable/OperatorsWorkingReportTable.styled';
import { HouseManagementsReportTableProps } from './HouseManagementsReportTable.types';

export const HouseManagementsReportTable: FC<
  HouseManagementsReportTableProps
> = ({ data }) => {
  const elements = data.HouseManagementsReport || [];

  return (
    <Table
      columns={[
        {
          label: '№',
          size: '50px',
          render: (_, index) => index + 1,
        },
        {
          label: 'Управляющая компания',
          size: '190px',
          render: (elem) => elem.houseManagementName,
          css: getNameColumnCSS,
        },
        {
          label: 'Дома',
          size: '100px',
          render: (elem) => elem.housingStocksCount,
        },
        {
          label: 'Квартиры',
          size: '100px',
          render: (elem) => elem.apartmentsCount,
        },
        {
          label: 'Квартиры с ИПУ',
          size: '100px',
          render: (elem) => elem.apartmentsWithIMDCount,
        },
        {
          label: 'ХВС',
          size: '100px',
          render: (elem) => elem.coldWaterSupplyCount,
        },
        {
          label: 'ГВС',
          size: '100px',
          render: (elem) => elem.hotWaterSupplyCount,
        },
        {
          label: 'ЭЭ',
          size: '100px',
          render: (elem) => elem.electricityCount,
        },
        {
          label: 'ТЭ',
          size: '100px',
          render: (elem) => elem.heatCount,
        },
        {
          label: 'Количество показаний',
          size: '160px',
          css: getSumColumnCSS,
          render: (elem) =>
            [
              elem.apartmentsCount,
              elem.apartmentsWithIMDCount,
              elem.coldWaterSupplyCount,
              elem.hotWaterSupplyCount,
              elem.electricityCount,
              elem.heatCount,
              elem.housingStocksCount,
            ].reduce((acc, elem) => acc + elem, 0),
        },
      ]}
      elements={elements}
    />
  );
};
