import { Empty } from 'antd';
import dayjs from 'api/dayjs';
import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { Table } from 'ui-kit/Table';
import { ApartmentNumber } from '../IndividualDevicesReport/IndividualDevicesReport.styled';
import { getReportElemAddress } from '../ReportViewTable.utils';
import { HousingDevicesConsumptionPanel } from './HousingDevicesConsumptionPanel';
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
    <>
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
            size: '320px',
            render: (elem) => {
              return (
                <div>
                  <DeviceWrapper>
                    <ResourceIconLookup resource={elem.resource} />
                    <DeviceSerialNumber>{elem.serialNumber}</DeviceSerialNumber>
                    <DeviceModel>{elem.model}</DeviceModel>
                  </DeviceWrapper>
                  <DeviceCheckingDates>
                    {elem.lastCheckingDate &&
                      dayjs(elem.lastCheckingDate).format('DD.MM.YYYY')}
                    {` — `}
                    {elem.futureCheckingDate &&
                      dayjs(elem.futureCheckingDate).format('DD.MM.YYYY')}
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
            label: 'Расход',
            size: '120px',
            render: (elem) => {
              return elem.consumption;
            },
          },
        ]}
        elements={housingMeteringDevicesReportData || []}
        pagination={{ pageSize: 50 }}
      />
      <HousingDevicesConsumptionPanel
        count={housingMeteringDevicesReportData.reduce(
          (acc, elem) => (elem.consumption || 0) + acc,
          0,
        )}
      />
    </>
  );
};
