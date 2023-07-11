import React, { FC } from 'react';
import { Table } from 'ui-kit/Table';
import { EIndividualDeviceReadingsSource } from 'myApi';
import { getNameColumnCSS } from '../InspectorsWorkingReportTable/InspectorsWorkingReportTable.styled';
import { ReadingNameToSourceDictionary } from './OperatorsWorkingReportTable.constants';
import {
  getSumColumnCSS,
  ReadingsSourceWrapper,
} from './OperatorsWorkingReportTable.styled';
import { OperatorsWorkingReportTableProps } from './OperatorsWorkingReportTable.types';
import { sum } from 'lodash';
import { getSourceIcon } from 'services/meters/readingsHistoryService/readingsHistoryListService/SourceName/SourceName.utils';

export const OperatorsWorkingReportTable: FC<
  OperatorsWorkingReportTableProps
> = ({ data }) => {
  const elements = data.OperatorsWorkingReport || [];

  return (
    <Table
      columns={[
        {
          label: '№',
          size: '50px',
          render: (_, index) => index + 1,
        },
        {
          label: 'Оператор',
          size: '250px',
          render: (elem) => (
            <ReadingsSourceWrapper>
              {elem.name &&
                getSourceIcon(
                  ReadingNameToSourceDictionary[elem.name] ||
                    EIndividualDeviceReadingsSource.Ttm,
                )}
              <div>{elem.name}</div>
            </ReadingsSourceWrapper>
          ),
          css: getNameColumnCSS,
        },
        {
          label: 'ХВС',
          size: '150px',
          render: (elem) => elem.coldWaterSupplyCount,
        },
        {
          label: 'ГВС',
          size: '150px',
          render: (elem) => elem.hotWaterSupplyCount,
        },
        {
          label: 'ЭЭ',
          size: '150px',
          render: (elem) => elem.electricityCount,
        },
        {
          label: 'ТЭ',
          size: '150px',
          render: (elem) => elem.heatCount,
        },
        {
          label: 'Количество показаний',
          size: 'minmax(150px, 200px)',
          render: (elem) =>
            sum([
              elem.heatCount,
              elem.coldWaterSupplyCount,
              elem.hotWaterSupplyCount,
              elem.electricityCount,
            ]),
          css: getSumColumnCSS,
        },
      ]}
      elements={elements}
    />
  );
};
