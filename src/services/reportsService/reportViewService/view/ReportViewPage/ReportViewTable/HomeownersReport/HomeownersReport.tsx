import { Empty } from 'antd';
import React, { FC } from 'react';
import { Table } from 'ui-kit/Table';
import { ApartmentNumber } from '../IndividualDevicesReport/IndividualDevicesReport.styled';
import { getReportElemAddress } from '../ReportViewTable.utils';
import { HomeownersReportProps } from './HomeownersReport.types';

export const HomeownersReport: FC<HomeownersReportProps> = ({
  homeownersReportData,
}) => {
  if (!homeownersReportData) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Выберите фильтры для формирования отчета"
      />
    );
  }

  return (
    <Table
      columns={[
        {
          label: 'Домоуправление',
          size: '130px',
          render: (elem) => elem.houseManagementName,
        },
        {
          label: 'Адрес',
          size: '280px',
          render: (elem) => {
            const { addressString, number } = getReportElemAddress(elem);

            return (
              <div>
                <ApartmentNumber>Кв. №{number}</ApartmentNumber>
                {addressString}
              </div>
            );
          },
        },
        {
          label: 'ФИО',
          size: '230px',
          render: (elem) => elem.homeownerFullName,
        },
        {
          label: 'Лицевой счет',
          size: '130px',
          render: (elem) => elem.homeownerAccountNumber,
        },
      ]}
      elements={homeownersReportData}
      pagination={{ pageSize: 50 }}
    />
  );
};
