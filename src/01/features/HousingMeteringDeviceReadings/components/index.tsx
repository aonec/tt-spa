import React from 'react';
import { useStore } from 'effector-react';
import { $readings, HousingMeteringDeviceReadingsGate } from '../models';
import {
  HousingMeteringDeviceMonthlyReadings,
  HousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceYearlyReadings,
} from '../../../../myApi';
import styled from 'styled-components';

const YearReading = ({
  yearElement,
}: {
  yearElement: HousingMeteringDeviceYearlyReadings;
}) => {
  return (
    <YearReadings>
      <Year>{yearElement.year} год</Year>
      <div>
        {yearElement.items?.map((monthElement) => (
          <MonthReading monthElement={monthElement} />
        ))}
      </div>
    </YearReadings>
  );
};

const MonthReading = ({
  monthElement,
}: {
  monthElement: HousingMeteringDeviceMonthlyReadings;
}) => {
  return (
    <MonthReadings>
      <Month>{monthElement.month}</Month>
      <div style={{ display: 'flex' }}>
        {monthElement.items?.map((deviceElement) => (
          <DeviceReading deviceElem={deviceElement} />
        ))}
      </div>
    </MonthReadings>
  );
};

const DeviceReading = ({
  deviceElem,
}: {
  deviceElem: HousingMeteringDeviceReadingsResponse;
}) => {
  return (
    <DeviceReadings>
      <div>{deviceElem.value ?? 4071505}</div>
    </DeviceReadings>
  );
};

const HousingMeteringDeviceReadings = ({ nodeId }: { nodeId: number }) => {
  const readings = useStore($readings);

  const readingsElems = readings.items?.map((yearElement) => (
    <YearReading yearElement={yearElement} />
  ));

  return (
    <div>
      <HousingMeteringDeviceReadingsGate nodeId={nodeId} />
      <HousingMeteringReadingsHeader>
        <div>Месяц</div>
        <div>V1, м3</div>
        <div>V2, м3</div>
        <div>Потребление, м3</div>
      </HousingMeteringReadingsHeader>
      {readingsElems}
    </div>
  );
};

export default HousingMeteringDeviceReadings;

const YearReadings = styled.div`
  display: flex;
  flex-direction: column;
`;

const Year = styled.div`
  padding: 8px 16px;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--main-90);
  border-bottom: 1px solid var(--frame);
`;

const MonthReadings = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  padding: 8px 16px;
`;

const Month = styled.div`
  font-weight: 500;
  color: var(--main);
`;

const DeviceReadings = styled.div`
  display: flex;
  font-size: 14px;
  margin-right: 16px;
`;

const DeviceModel = styled.div`
  font-weight: 500;
`;

const DeviceSerialNumber = styled.div`
  color: var(--main-70);
`;

const HousingMeteringReadingsHeader = styled.div`
  display: grid;
  position: sticky;
  top: 0;
  align-items: center;
  padding-left: 16px;
  margin-bottom: 8px;
  height: 48px;
  grid-template-columns: 4fr 2fr 2fr 4fr;
  background-color: var(--main-4);
  overflow: hidden;
`;
