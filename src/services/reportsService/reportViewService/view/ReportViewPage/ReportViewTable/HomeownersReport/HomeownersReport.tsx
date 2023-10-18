import { Empty } from 'antd';
import React, { FC } from 'react';
import { Table } from 'ui-kit/Table';
import { ApartmentNumber } from '../IndividualDevicesReport/IndividualDevicesReport.styled';
import { getReportElemAddress } from '../ReportViewTable.utils';
import { HomeownersReportProps } from './HomeownersReport.types';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import {
  FullAddressWrapper,
  FullNameWrapper,
  PhoneNumberWrapper,
} from './HomeownersReport.styled';

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
              <FullAddressWrapper>
                <ApartmentNumber>Кв. №{number}</ApartmentNumber>
                <Tooltip title={addressString}>{addressString}</Tooltip>
              </FullAddressWrapper>
            );
          },
        },
        {
          label: 'ФИО',
          size: '270px',
          render: (elem) => (
            <FullNameWrapper>
              <Tooltip title={elem.homeownerFullName}>
                {elem.homeownerFullName}
              </Tooltip>
            </FullNameWrapper>
          ),
        },
        {
          label: 'Лицевой счет',
          size: '130px',
          render: (elem) => elem.homeownerAccountNumber,
        },
        {
          label: 'Номер телефона',
          size: '170px',
          render: (elem) => (
            <PhoneNumberWrapper>
              <Tooltip title={elem.homeownerPhoneNumber}>
                {elem.homeownerPhoneNumber}
              </Tooltip>
            </PhoneNumberWrapper>
          ),
        },
      ]}
      elements={homeownersReportData}
      pagination={{ pageSize: 50 }}
    />
  );
};
