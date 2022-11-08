import React, { FC } from 'react';
import { MeteringDeviceReadingsTableHeader } from '../MeteringDeviceReadingsTableHeader';
import { MeteringDeviceYearReadings } from '../MeteringDeviceYearReadings';
import { MeteringDeviceReadingsTableProps } from './MeteringDeviceReadingsTable.types';

export const MeteringDeviceReadingsTable: FC<MeteringDeviceReadingsTableProps> = ({
  isColdWater,
  readings,
}) => {
  return (
    <div>
      <MeteringDeviceReadingsTableHeader isColdWater={isColdWater} />
      {readings.map(({year, readings}) => (
        <MeteringDeviceYearReadings
          year={year}
          yearRreadings={readings}
          isColdWater={isColdWater}
          key={year}
        />
      ))}
    </div>
  );
};
