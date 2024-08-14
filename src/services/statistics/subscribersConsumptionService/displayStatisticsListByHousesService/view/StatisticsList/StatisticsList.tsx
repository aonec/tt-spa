import React from 'react';
import dayjs from 'api/dayjs';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import {
  Comment,
  HeaderStyles,
  HomeownerNameWrapper,
  HomeownerNumberWrapper,
  RowStyle,
} from './StatisticsList.styled';
import { Table } from 'ui-kit/Table';
import { prepareConsumptions } from './StatisticsList.utils';
import { StatisticsListProps } from './StatisticsList.types';

export const StatisticsList: React.FC<StatisticsListProps> = ({
  statistics,
}) => {
  return (
    <Table
      isSticky
      elements={statistics}
      rowStyles={RowStyle}
      headerStyles={HeaderStyles}
      link={(apartment) => `/apartments/${apartment.apartmentId}/testimony`}
      columns={[
        {
          label: '№',
          size: '45px',
          render: (apartment) => apartment.apartmentNumber,
          css: (isHeader) => `${!isHeader && 'font-weight: 700'}`,
        },
        {
          label: 'ХВС',
          size: '90px',
          render: (apartment) =>
            prepareConsumptions(apartment.coldWaterSupplyConsumption),
          sortedParam: (elem) => elem?.coldWaterSupplyConsumption,
        },
        {
          label: 'ГВС',
          size: '90px',
          render: (apartment) =>
            prepareConsumptions(apartment.hotWaterSupplyConsumption),
          sortedParam: (elem) => elem?.hotWaterSupplyConsumption,
        },
        {
          label: 'ЭЭ',
          size: '90px',
          render: (apartment) =>
            prepareConsumptions(apartment.electricityConsumption),
          sortedParam: (elem) => elem?.electricityConsumption,
        },
        {
          label: 'ТЭ',
          size: '90px',
          render: (apartment) => prepareConsumptions(apartment.heatConsumption),
          sortedParam: (elem) => elem?.electricityConsumption,
        },
        {
          label: 'Дата последней передачи показаний',
          size: '125px',
          render: (apartment) =>
            dayjs(apartment.dateLastTransmissionOfReading).format('DD.MM.YYYY'),
          css: (isHeader) => `${isHeader && 'white-space:normal;'}`,
        },
        {
          label: 'Дата последней проверки',
          size: '125px',
          render: (apartment) =>
            apartment.dateLastCheck
              ? dayjs(apartment.dateLastCheck).format('DD.MM.YYYY')
              : '-',
          css: (isHeader) => `${isHeader && 'white-space:normal;'}`,
        },
        {
          label: 'Абонент',
          size: '240px',
          render: (apartment) => (
            <div style={{ overflow: 'hidden' }}>
              <HomeownerNameWrapper>
                <Tooltip title={apartment.homeownerAccountFullName}>
                  {apartment.homeownerAccountFullName}
                </Tooltip>
              </HomeownerNameWrapper>
              <HomeownerNumberWrapper>
                <Tooltip
                  title={(apartment.homeownerAccountPhoneNumbers || []).join(
                    ', ',
                  )}
                >
                  {(apartment.homeownerAccountPhoneNumbers || []).join(', ')}
                </Tooltip>
              </HomeownerNumberWrapper>
            </div>
          ),
        },
        {
          label: 'Комментарий',
          size: '160px',
          render: (apartment) => (
            <Tooltip title={apartment.lastCheckComment}>
              <Comment>{apartment.lastCheckComment}</Comment>
            </Tooltip>
          ),
        },
      ]}
    />
  );
};
