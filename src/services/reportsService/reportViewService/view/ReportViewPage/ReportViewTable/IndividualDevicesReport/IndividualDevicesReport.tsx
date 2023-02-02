import React, { FC } from 'react';
import {
  ApartmentNumber,
  Header,
  ResourceWrapper,
  RowWrapper,
  Wrapper,
} from './IndividualDevicesReport.styled';
import { IndividualDevicesReportProps } from './IndividualDevicesReport.types';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { ResourceShortNamesDictionary } from 'dictionaries';
import { Table } from 'ui-kit/Table';

export const IndividualDevicesReport: FC<IndividualDevicesReportProps> = ({
  individualDevicesReportData,
}) => {
  return (
    <Wrapper>
      <Table
        columns={[
          {
            label: 'Адрес',
            size: '0.5fr',
            render: (elem, index) => (
              <div>
                <ApartmentNumber>Кв. №{index + 1}</ApartmentNumber>
                {elem.address}
              </div>
            ),
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
    </Wrapper>
  );
};
