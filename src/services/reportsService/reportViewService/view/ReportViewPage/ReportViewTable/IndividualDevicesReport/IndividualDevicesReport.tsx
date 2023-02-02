import React, { FC } from 'react';
import {
  ApartmentNumber,
  ResourceWrapper,
} from './IndividualDevicesReport.styled';
import { IndividualDevicesReportProps } from './IndividualDevicesReport.types';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { ResourceShortNamesDictionary } from 'dictionaries';
import { Table } from 'ui-kit/Table';
import { last } from 'lodash';

export const IndividualDevicesReport: FC<IndividualDevicesReportProps> = ({
  individualDevicesReportData,
  city,
}) => {
  return (
    <Table
      columns={[
        {
          label: 'Адрес',
          size: '0.5fr',
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
          size: '0.2fr',
          render: (elem) => (
            <ResourceWrapper>
              <ResourceIconLookup resource={elem.resource} />
              <div>{ResourceShortNamesDictionary[elem.resource]}</div>
            </ResourceWrapper>
          ),
        },
        {
          label: 'Серийный номер',
          size: '0.3fr',
          render: (elem) => <div>{elem.serialNumber}</div>,
        },
        {
          label: 'Модель',
          size: '0.35fr',
          render: (elem) => <div>{elem.model}</div>,
        },
      ]}
      elements={individualDevicesReportData.slice(0, 50)}
    />
  );
};
