import { Empty } from 'antd';
import { useStore } from 'effector-react';
import { last } from 'lodash';
import moment from 'moment';
import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Table } from 'ui-kit/Table';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import {
  ApartmentNumber,
  ResourceWrapper,
} from '../IndividualDevicesReport/IndividualDevicesReport.styled';
import { actsJournalReportService } from './ActsJournalReport.model';
import { ActDate } from './ActsJournalReport.styled';
import { ActsJournalReportProps } from './ActsJournalReport.types';

const { outputs, gates } = actsJournalReportService;
const { ApartmentActTypesGate } = gates;

export const ActsJournalReport: FC<ActsJournalReportProps> = ({
  actJournalReportData,
  city,
}) => {
  const apartmentActTypes = useStore(outputs.$actTypes);

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
      <ApartmentActTypesGate />
      <Table
        columns={[
          {
            label: 'Домоуправление',
            size: '150px',
            render: (elem) => elem.houseManagementName,
          },
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
            label: 'Дата акта',
            size: '100px',
            render: (elem) => (
              <ActDate>{moment(elem.actDate).format('DD.MM.YYYY')}</ActDate>
            ),
          },
          {
            label: 'Номер',
            size: '100px',
            render: (elem) => elem.registryNumber,
          },
          {
            label: 'Тип документа',
            size: '190px',
            render: (act) =>
              apartmentActTypes?.find(
                // дождаться правки по апи с бэка
                (elem) => (elem.key as any) === act.actType,
              )?.value,
          },
          {
            label: 'Ресурс',
            size: '0.35fr',
            render: (elem) => (
              <ResourceWrapper>
                <ResourceIconLookup resource={elem.resourceType} />
                <div>{actResourceNamesLookup[elem.resourceType]}</div>
              </ResourceWrapper>
            ),
          },
          {
            label: 'Дата раброт',
            size: '100px',
            render: (elem) => moment(elem.actJobDate).format('DD.MM.YYYY'),
          },
        ]}
        elements={actJournalReportData?.rows?.slice(0, 50) || []}
      />
    </>
  );
};
