import { sum } from 'lodash';
import React, { FC } from 'react';
import { Table } from 'ui-kit/Table';
import { getNameColumnCSS } from '../InspectorsWorkingReportTable/InspectorsWorkingReportTable.styled';
import {
  getBorderedColumnCSS,
  lastLineStyles,
  ResourceReadingsCountHeader,
  ResourceReadingsCountHeaderFact,
} from './CallCenterWorkingReportTable.styled';
import { CallCenterWorkingReportTableProps } from './CallCenterWorkingReportTable.types';

export const CallCenterWorkingReportTable: FC<
  CallCenterWorkingReportTableProps
> = ({ data }) => {
  const elements = data.CallCenterWorkingReport || [];

  return (
    <Table
      columns={[
        {
          label: '№',
          size: '50px',
          render: (_, index) => index + 1,
        },
        {
          label: 'Заказчик',
          size: '290px',
          render: (elem) => elem.houseManagement,
          css: getNameColumnCSS,
        },
        {
          label: (
            <ResourceReadingsCountHeader>
              <div>ХВС</div>
              <div>План</div>
            </ResourceReadingsCountHeader>
          ),
          size: '80px',
          render: (elem) => elem.coldWaterSupplyPlan,
          css: getBorderedColumnCSS,
        },
        {
          label: (
            <ResourceReadingsCountHeaderFact>
              Факт
            </ResourceReadingsCountHeaderFact>
          ),
          size: '80px',
          render: (elem) => elem.coldWaterSupplyValue,
        },
        {
          label: (
            <ResourceReadingsCountHeader>
              <div>ГВС</div>
              <div>План</div>
            </ResourceReadingsCountHeader>
          ),
          size: '80px',
          render: (elem) => elem.hotWaterSupplyPlan,
          css: getBorderedColumnCSS,
        },
        {
          label: (
            <ResourceReadingsCountHeaderFact>
              Факт
            </ResourceReadingsCountHeaderFact>
          ),
          size: '80px',
          render: (elem) => elem.hotWaterSupplyValue,
        },
        {
          label: (
            <ResourceReadingsCountHeader>
              <div>ЭЭ</div>
              <div>План</div>
            </ResourceReadingsCountHeader>
          ),
          size: '80px',
          render: (elem) => elem.electricityPlan,
          css: getBorderedColumnCSS,
        },
        {
          label: (
            <ResourceReadingsCountHeaderFact>
              Факт
            </ResourceReadingsCountHeaderFact>
          ),
          size: '80px',
          render: (elem) => elem.electricityValue,
        },
        {
          label: (
            <ResourceReadingsCountHeader>
              <div>ТЭ</div>
              <div>План</div>
            </ResourceReadingsCountHeader>
          ),
          size: '80px',
          render: (elem) => elem.heatPlan,
          css: getBorderedColumnCSS,
        },
        {
          label: (
            <ResourceReadingsCountHeaderFact>
              Факт
            </ResourceReadingsCountHeaderFact>
          ),
          size: 'minmax(80px, 150px)',
          render: (elem) => elem.heatValue,
        },
      ]}
      rowStyles={
        Boolean(elements.length)
          ? {
              [elements.length]: lastLineStyles,
            }
          : undefined
      }
      elements={[
        ...elements,
        {
          managingFirm: null,
          houseManagement: 'Итого',
          coldWaterSupplyPlan: sum(elements.map((e) => e.coldWaterSupplyPlan)),
          coldWaterSupplyValue: sum(
            elements.map((e) => e.coldWaterSupplyValue),
          ),
          hotWaterSupplyPlan: sum(elements.map((e) => e.hotWaterSupplyPlan)),
          hotWaterSupplyValue: sum(elements.map((e) => e.hotWaterSupplyValue)),
          electricityPlan: sum(elements.map((e) => e.electricityPlan)),
          electricityValue: sum(elements.map((e) => e.electricityValue)),
          heatPlan: sum(elements.map((e) => e.heatPlan)),
          heatValue: sum(elements.map((e) => e.heatValue)),
        },
      ]}
    />
  );
};
