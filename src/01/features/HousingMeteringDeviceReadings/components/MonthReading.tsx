//@ts-nocheck

import { MonthReadingsType } from '../lib/groupReadingsByDates';
import { useStore } from 'effector-react';
import { $isColdWaterSupply, $readings } from '../models';
import {
  EMagistralType,
  HousingMeteringDeviceReadingsResponse,
} from '../../../../myApi';
import { firstLetterToUpperCase } from '../../../utils/getMonthFromDate';
import React from 'react';
import styled from 'styled-components';
import { DeviceReading } from './DeviceReading';

export const MonthReading = ({
  monthElement,
}: {
  monthElement: MonthReadingsType;
}) => {
  const readings = useStore($readings);
  const isColdWaterSupply = useStore($isColdWaterSupply);

  const sortFeedFlowsFn = (
    a: HousingMeteringDeviceReadingsResponse,
    b: HousingMeteringDeviceReadingsResponse
  ) => {
    if (a.magistralType === EMagistralType.FeedFlow) return 1;
    return -1;
  };

  const sortedMonthElementItems = monthElement.items?.sort(sortFeedFlowsFn);

  const calculateConsumption = (isColdWaterSupply: boolean) => {
    let consumption;
    debugger;
    if (isColdWaterSupply) {
      const currentReading = monthElement.items[0];

      const previousReading = readings.items.find(
        (reading) => reading.id === currentReading.previousReadingsId
      );
      consumption = previousReading
        ? currentReading.value - previousReading.value
        : 0;
    } else {
      consumption =
        sortedMonthElementItems.length > 1
          ? sortedMonthElementItems[0]?.value -
            sortedMonthElementItems[1]?.value
          : sortedMonthElementItems[0]?.value;
    }

    return consumption;
  };

  return (
    <MonthReadings isColdWaterSupply={isColdWaterSupply}>
      <Month>{firstLetterToUpperCase(monthElement.month)}</Month>
      <div style={{ display: 'flex' }}>
        {sortedMonthElementItems.map((deviceElement) => (
          <DeviceReading deviceElem={deviceElement} />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {calculateConsumption(isColdWaterSupply)}
      </div>
    </MonthReadings>
  );
};

const MonthReadings = styled.div<{ isColdWaterSupply: boolean }>`
  display: grid;
  grid-template-columns: ${({ isColdWaterSupply }) =>
    isColdWaterSupply ? '2.5fr 5.5fr 4fr' : '3fr 5fr 4fr'};
  padding: 8px 16px;
`;

const Month = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: var(--main);
`;
