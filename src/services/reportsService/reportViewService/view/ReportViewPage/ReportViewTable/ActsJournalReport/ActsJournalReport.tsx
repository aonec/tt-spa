import React, { FC } from 'react';
import { ActsJournalReportProps } from './ActsJournalReport.types';

export const ActsJournalReport: FC<ActsJournalReportProps> = ({}) => {
  return (
    <>
      {/* <Table
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
        ]}
        elements={individualDevicesReportData.slice(0, 50)}
      /> */}
    </>
  );
};
