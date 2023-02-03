import React, { FC } from 'react';
import {
  ApartmentNumber,
  PhoneNumber,
  ResourceWrapper,
  Wrapper,
} from './IndividualDevicesReport.styled';
import { IndividualDevicesReportProps } from './IndividualDevicesReport.types';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { ResourceShortNamesDictionary } from 'dictionaries';
import { Table } from 'ui-kit/Table';
import { last } from 'lodash';
import { EIndividualDeviceReportOption } from 'myApi';
import moment from 'moment';
import { Empty } from 'antd';

export const IndividualDevicesReport: FC<IndividualDevicesReportProps> = ({
  individualDevicesReportData,
  city,
  reportOption,
}) => {
  const isDeviceCheckingDateExpirationOption =
    reportOption === EIndividualDeviceReportOption.DeviceCheckingDateExpiration;

  const isSkippedReadingOnOneOfRisersOption =
    reportOption === EIndividualDeviceReportOption.SkippedReadingOnOneOfRisers;

  const isClosedDeviceOnOneOfRisersOption =
    reportOption === EIndividualDeviceReportOption.ClosedDeviceOnOneOfRisers;

  const emptyComponentDescription = individualDevicesReportData
    ? 'Нет данных'
    : 'Выберите фильтры для формирования отчета';

  return (
    <Wrapper>
      {individualDevicesReportData &&
        Boolean(individualDevicesReportData.length) && (
          <Table
            columns={[
              {
                label: 'Адрес',
                size: '230px',
                render: (elem) => {
                  const addressSplit = elem.address?.split(' ');

                  const apartmentNumber = last(addressSplit);

                  const address = addressSplit
                    ?.slice(0, addressSplit.length - 1)
                    .join(' ');

                  return (
                    <div>
                      <ApartmentNumber>Кв. №{apartmentNumber}</ApartmentNumber>
                      {city && `${city}, `}
                      {address}
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
                size: '150px',
                render: (elem) => elem.model,
              },
              {
                label: 'Дата последней поверки',
                size: '150px',
                hidden: !isDeviceCheckingDateExpirationOption,
                render: (elem) =>
                  moment(
                    elem.deviceCheckingDateExpirationOption?.lastCheckingDate,
                  ).format('DD.MM.YYYY'),
              },
              {
                label: 'Дата слудующей поверки',
                size: '150px',
                hidden: !isDeviceCheckingDateExpirationOption,
                render: (elem) =>
                  moment(
                    elem.deviceCheckingDateExpirationOption?.futureCheckingDate,
                  ).format('DD.MM.YYYY'),
              },
              {
                label: 'Номер телефона',
                size: '150px',
                hidden: !isDeviceCheckingDateExpirationOption,
                render: (elem) => (
                  <PhoneNumber>
                    {
                      elem.deviceCheckingDateExpirationOption
                        ?.homeownerPhoneNumber
                    }
                  </PhoneNumber>
                ),
              },
              {
                label: 'Показание',
                size: '150px',
                hidden: !isSkippedReadingOnOneOfRisersOption,
                render: (elem) => {
                  const reading =
                    elem.skippedReadingOnOneOfRisersOption?.reading;

                  if (!reading) return null;

                  return Object.values(reading)
                    .filter((readingValue) => typeof readingValue === 'number')
                    .map((readingValue) => <div>{readingValue}</div>);
                },
              },
              {
                label: 'Показание',
                size: '150px',
                hidden: !isSkippedReadingOnOneOfRisersOption,
                render: (elem) => {
                  const reading =
                    elem.skippedReadingOnOneOfRisersOption?.reading;

                  if (!reading) return null;

                  return Object.values(reading)
                    .filter((readingValue) => typeof readingValue === 'number')
                    .map((readingValue) => <div>{readingValue}</div>);
                },
              },
            ]}
            elements={individualDevicesReportData.slice(0, 50)}
          />
        )}
      {!individualDevicesReportData?.length && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={emptyComponentDescription}
        />
      )}
    </Wrapper>
  );
};
