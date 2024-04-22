import { Empty } from 'antd';
import dayjs from 'api/dayjs';
import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { Table } from 'ui-kit/Table';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import {
  ApartmentNumber,
  ResourceWrapper,
} from '../IndividualDevicesReport/IndividualDevicesReport.styled';
import { getReportElemAddress } from '../ReportViewTable.utils';
import { ActsCountPanel } from './ActsCountPanel';
import { ActDate, FullAddressWrapper } from './ActsJournalReport.styled';
import { ActsJournalReportProps } from './ActsJournalReport.types';
import { ActTypesNamesLookup } from 'dictionaries';
import { Tooltip } from 'ui-kit/shared/Tooltip';

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
            label: 'Домоуправление',
            size: '150px',
            render: (elem) => elem.houseManagementName,
          },
          {
            label: 'Адрес',
            size: '270px',
            render: (elem) => {
              const { addressString, number } = getReportElemAddress(elem);

              return (
                <FullAddressWrapper>
                  <ApartmentNumber>Кв. №{number}</ApartmentNumber>
                  <Tooltip zIndex={10} title={addressString}>
                    {addressString}
                  </Tooltip>
                </FullAddressWrapper>
              );
            },
          },
          {
            label: 'Дата акта',
            size: '100px',
            render: (elem) => (
              <ActDate>{dayjs(elem.actDate).format('DD.MM.YYYY')}</ActDate>
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
            render: (act) => ActTypesNamesLookup[act.actType],
          },
          {
            label: 'Ресурс',
            size: '150px',
            render: (elem) => (
              <ResourceWrapper>
                <ResourceIconLookup resource={elem.resourceType} />
                <div>{actResourceNamesLookup[elem.resourceType]}</div>
              </ResourceWrapper>
            ),
          },
          {
            label: 'Дата работ',
            size: '100px',
            render: (elem) => dayjs(elem.actJobDate).format('DD.MM.YYYY'),
          },
        ]}
        elements={actJournalReportData?.rows || []}
        pagination={{ pageSize: 50 }}
        isSticky
      />
      {actJournalReportData.rows && (
        <ActsCountPanel count={actJournalReportData.rows.length} />
      )}
    </>
  );
};
