import { Empty } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { Table } from 'ui-kit/Table';
import { ApartmentNumber } from '../IndividualDevicesReport/IndividualDevicesReport.styled';
import { getReportElemAddress } from '../ReportViewTable.utils';
import {
  DeviceCheckingDates,
  DeviceModel,
  DeviceSerialNumber,
  DeviceWrapper,
} from './HousingMeteringDevicesReport.styled';
import { HousingMeteringDevicesReportProps } from './HousingMeteringDevicesReport.types';

export const HousingMeteringDevicesReport: FC<
  HousingMeteringDevicesReportProps
> = ({ housingMeteringDevicesReportData }) => {
  if (!housingMeteringDevicesReportData) {
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
          size: '160px',
          render: (elem) => {
            return elem.houseManagementName;
          },
        },
        {
          label: 'Адрес',
          size: '230px',
          render: (elem) => {
            const { addressString, number } = getReportElemAddress(
              elem,
              'house',
            );

            return (
              <div>
                <ApartmentNumber>Дом №{number}</ApartmentNumber>
                {addressString}
              </div>
            );
          },
        },
        {
          label: 'Прибор',
          size: '235px',
          render: (elem) => {
            return (
              <div>
                <DeviceWrapper>
                  <DeviceSerialNumber>{elem.serialNumber}</DeviceSerialNumber>
                  <DeviceModel>{elem.model}</DeviceModel>
                </DeviceWrapper>
                <DeviceCheckingDates>
                  {moment(elem.lastCheckingDate).format('DD.MM.YYYY')}—
                  {moment(elem.futureCheckingDate).format('DD.MM.YYYY')}
                </DeviceCheckingDates>
              </div>
            );
          },
        },
        {
          label: 'Начало месяца',
          size: '120px',
          render: (elem) => {
            return elem.previousReadings?.value;
          },
        },
        {
          label: 'Конец месяца',
          size: '120px',
          render: (elem) => {
            return elem.currentReadings?.value;
          },
        },
        {
          label: 'Расход м3',
          size: '120px',
          render: (elem) => {
            return elem.consumption;
          },
        },
      ]}
      elements={housingMeteringDevicesReportData?.slice(50) || []}
    />
  );
};
