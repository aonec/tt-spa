import { Empty } from 'antd';
import { useStore } from 'effector-react';
import moment from 'moment';
import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Table } from 'ui-kit/Table';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import {
  ApartmentNumber,
  ResourceWrapper,
} from '../IndividualDevicesReport/IndividualDevicesReport.styled';
import { getReportElemAddress } from '../ReportViewTable.utils';
import { ActsCountPanel } from './ActsCountPanel';
import { actsJournalReportService } from './ActsJournalReport.model';
import { ActDate } from './ActsJournalReport.styled';
import { ActsJournalReportProps } from './ActsJournalReport.types';

const { outputs, gates } = actsJournalReportService;
const { ApartmentActTypesGate } = gates;

export const ActsJournalReport: FC<ActsJournalReportProps> = ({
  actJournalReportData,
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
              const { addressString, apartmentNumber } =
                getReportElemAddress(elem);

              return (
                <div>
                  <ApartmentNumber>Кв. №{apartmentNumber}</ApartmentNumber>
                  {addressString}
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
              apartmentActTypes?.find((elem) => elem.key === act.actType)
                ?.value,
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
      {actJournalReportData.rows && (
        <ActsCountPanel count={actJournalReportData.rows.length} />
      )}
    </>
  );
};
