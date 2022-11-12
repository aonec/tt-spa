import _ from 'lodash';
import moment from 'moment';
import React, { FC } from 'react';
import { MeteringDeviceReadingsTableHeader } from '../MeteringDeviceReadingsTableHeader';
import { MeteringDeviceYearReadings } from '../MeteringDeviceYearReadings';
import { MeteringDeviceReadingsTableProps } from './MeteringDeviceReadingsTable.types';

export const MeteringDeviceReadingsTable: FC<MeteringDeviceReadingsTableProps> = ({
  isColdWater,
  readings,
  createReading,
}) => {
  return (
    <div>
      <MeteringDeviceReadingsTableHeader isColdWater={isColdWater} />
      {readings.map(({ year, readings }) => (
        <MeteringDeviceYearReadings
          year={year}
          yearRreadings={readings}
          isColdWater={isColdWater}
          key={year}
          createReading={(reading) => {
            const { deviceId, month, value } = reading;
            const readingDate = moment(`${year} ${month}`, 'YYYY MMMM')
              .add(1, 'month')
              .add(14, 'days')
              .format();
            createReading({ readingDate, deviceId, value });
          }}
        />
      ))}
    </div>
  );
};
