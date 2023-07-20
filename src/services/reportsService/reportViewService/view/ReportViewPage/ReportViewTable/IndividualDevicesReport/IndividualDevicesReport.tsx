import React, { FC } from 'react';
import {
  ApartmentNumber,
  ClosingDate,
  PhoneNumber,
  ResourceWrapper,
} from './IndividualDevicesReport.styled';
import { IndividualDevicesReportProps } from './IndividualDevicesReport.types';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  ClosingReasonsDictionary,
  ResourceShortNamesDictionary,
} from 'dictionaries';
import { Table } from 'ui-kit/Table';
import {
  EConstructedReportDeviceStatus,
  EIndividualDeviceReportOption,
} from 'api/myApi';
import moment from 'moment';
import { Empty } from 'antd';
import { getReportElemAddress } from '../ReportViewTable.utils';

export const IndividualDevicesReport: FC<IndividualDevicesReportProps> = ({
  individualDevicesReportData,
  reportOption,
}) => {
  const isDeviceCheckingDateExpirationOption =
    reportOption === EIndividualDeviceReportOption.DeviceCheckingDateExpiration;

  const isSkippedReadingOnOneOfRisersOption =
    reportOption === EIndividualDeviceReportOption.SkippedReadingOnOneOfRisers;

  const isClosedDeviceOnOneOfRisersOption =
    reportOption === EIndividualDeviceReportOption.ClosedDeviceOnOneOfRisers;

  const isClosedDeviceOption =
    reportOption === EIndividualDeviceReportOption.ClosedDevices;

  const isInvalidCheckingDates =
    reportOption === EIndividualDeviceReportOption.InvalidCheckingDates;

  if (!individualDevicesReportData) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={'Выберите фильтры для формирования отчета'}
      />
    );
  }

  return (
    <Table
      columns={[
        {
          label: 'Адрес',
          size: '230px',
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
          label: 'Ресурс',
          size: '110px',
          render: (elem) => (
            <ResourceWrapper>
              <ResourceIconLookup resource={elem.resource} />
              <div>{ResourceShortNamesDictionary[elem.resource]}</div>
            </ResourceWrapper>
          ),
        },
        {
          label: 'Серийный номер',
          size: '150px',
          render: (elem) => elem.serialNumber,
        },
        {
          label: 'Модель',
          size: '180px',
          render: (elem) => elem.model,
        },
        {
          label: 'Дата последней поверки',
          size: '170px',
          hidden: !isDeviceCheckingDateExpirationOption,
          render: (elem) =>
            moment(
              elem.deviceCheckingDateExpirationOption?.lastCheckingDate,
            ).format('DD.MM.YYYY'),
        },
        {
          label: 'Дата следующей поверки',
          size: '170px',
          hidden: !isDeviceCheckingDateExpirationOption,
          render: (elem) =>
            moment(
              elem.deviceCheckingDateExpirationOption?.futureCheckingDate,
            ).format('DD.MM.YYYY'),
        },
        {
          label: 'Номер телефона',
          size: '400px',
          hidden: !isDeviceCheckingDateExpirationOption,
          render: (elem) => (
            <PhoneNumber>
              {elem.deviceCheckingDateExpirationOption?.homeownerPhoneNumber}
            </PhoneNumber>
          ),
        },
        {
          label: 'Показание',
          size: '150px',
          hidden: !isSkippedReadingOnOneOfRisersOption,
          render: (elem) => {
            const reading = elem.skippedReadingOnOneOfRisersOption?.reading;

            if (!reading) return null;

            return Object.values(reading)
              .filter((readingValue) => typeof readingValue === 'number')
              .map((readingValue, index) => (
                <div key={index}>{readingValue}</div>
              ));
          },
        },
        {
          label: 'Дата поверки',
          size: '150px',
          hidden: !isClosedDeviceOnOneOfRisersOption,
          render: (elem) =>
            moment(elem.closedDeviceOnOneOfRisersOption?.checkingDate).format(
              'DD.MM.YYYY',
            ),
        },
        {
          label: 'Дата поверки',
          size: '150px',
          hidden: !isClosedDeviceOption,
          render: (elem) =>
            moment(elem.closedDevicesOption?.checkingDate).format('DD.MM.YYYY'),
        },
        {
          label: 'Статус',
          size: '300px',
          hidden: !isClosedDeviceOption,
          render: (elem) => {
            const closingStatus =
              elem.closedDevicesOption?.status ===
              EConstructedReportDeviceStatus.Open
                ? 'Открыт'
                : 'Закрыт';

            const closingReason =
              elem.closedDevicesOption?.closingReason &&
              `(${
                ClosingReasonsDictionary[elem.closedDevicesOption.closingReason]
              })`;

            const closingDate = moment(
              elem.closedDevicesOption?.closingDate,
            ).format('DD.MM.YYYY');

            return (
              <div>
                {`${closingStatus} ${closingReason}`}
                <ClosingDate>{closingDate}</ClosingDate>
              </div>
            );
          },
        },
        {
          label: 'Дата последней поверки',
          size: '170px',
          hidden: !isInvalidCheckingDates,
          render: (elem) =>
            moment(elem.invalidCheckingDatesOption?.lastCheckingDate).format(
              'DD.MM.YYYY',
            ),
        },
        {
          label: 'Дата следующей поверки',
          size: '170px',
          hidden: !isInvalidCheckingDates,
          render: (elem) =>
            moment(elem.invalidCheckingDatesOption?.futureCheckingDate).format(
              'DD.MM.YYYY',
            ),
        },
      ]}
      elements={individualDevicesReportData}
      pagination={{ pageSize: 50 }}
    />
  );
};
