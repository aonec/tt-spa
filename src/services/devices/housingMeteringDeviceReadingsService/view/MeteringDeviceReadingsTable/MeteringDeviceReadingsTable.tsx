import React, { FC } from 'react';
import { MeteringDeviceReadingsTableHeader } from '../MeteringDeviceReadingsTableHeader';
import { MeteringDeviceYearReadings } from '../MeteringDeviceYearReadings';
import { Wrapper } from './MeteringDeviceReadingsTable.styled';
import { MeteringDeviceReadingsTableProps } from './MeteringDeviceReadingsTable.types';

export const MeteringDeviceReadingsTable: FC<MeteringDeviceReadingsTableProps> = ({
  isColdWater,
  readings,
}) => {
  return (
    <Wrapper>
      <MeteringDeviceReadingsTableHeader isColdWater={isColdWater} />
      {Object.entries(readings).map(([year, yearReadings]) => (
        <MeteringDeviceYearReadings
          year={year}
          readings={yearReadings}
          isColdWater={isColdWater}
        />
      ))}
    </Wrapper>
  );
};
