import { Empty } from 'antd';
import { last } from 'lodash';
import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Table } from 'ui-kit/Table';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import {
  ApartmentNumber,
  ResourceWrapper,
} from '../IndividualDevicesReport/IndividualDevicesReport.styled';
import { ActsJournalReportProps } from './ActsJournalReport.types';

export const ActsJournalReport: FC<ActsJournalReportProps> = ({
  actJournalReportData,
}) => {
  if (!actJournalReportData) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={'Выберите фильтры для формирования отчета'}
      />
    );
  }

  return (
    <>
      <Table
        columns={[
          {
            label: 'Адрес',
            size: '1fr',
            render: (elem) => {
              const addressSplit = elem.address?.split(' ');

              const apartmentNumber = last(addressSplit);

              const address = addressSplit
                ?.slice(0, addressSplit.length - 1)
                .join(' ');

              return (
                <div>
                  <ApartmentNumber>Кв. №{apartmentNumber}</ApartmentNumber>
                  {`Нижнекамск`}
                  {address}
                </div>
              );
            },
          },
          {
            label: 'Ресурс',
            size: '0.5fr',
            render: (elem) => (
              <ResourceWrapper>
                <ResourceIconLookup resource={elem.resourceType} />
                <div>{actResourceNamesLookup[elem.resourceType]}</div>
              </ResourceWrapper>
            ),
          },
          {
            label: 'Серийный номер',
            size: '150px',
            render: (elem) => elem.actDate,
          },
          {
            label: 'Модель',
            size: '150px',
            render: (elem) => elem.actJobDate,
          },
          // {
          //   label: 'Дата последней поверки',
          //   size: '150px',
          //   hidden: !isDeviceCheckingDateExpirationOption,
          //   render: (elem) =>
          //     moment(
          //       elem.deviceCheckingDateExpirationOption?.lastCheckingDate,
          //     ).format('DD.MM.YYYY'),
          // },
          // {
          //   label: 'Дата слудующей поверки',
          //   size: '150px',
          //   hidden: !isDeviceCheckingDateExpirationOption,
          //   render: (elem) =>
          //     moment(
          //       elem.deviceCheckingDateExpirationOption?.futureCheckingDate,
          //     ).format('DD.MM.YYYY'),
          // },
        ]}
        elements={actJournalReportData?.rows?.slice(0, 50) || []}
      />
    </>
  );
};
