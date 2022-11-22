import _ from 'lodash';
import moment from 'moment';
import React, { FC, useMemo } from 'react';
import { groupWithEmptyReadings } from '../../housingMeteringDeviceReadingsService.utils';
import { MeteringDeviceReadingsTableHeader } from '../MeteringDeviceReadingsTableHeader';
import { MeteringDeviceYearReadings } from '../MeteringDeviceYearReadings';
import { MeteringDeviceReadingsTableProps } from './MeteringDeviceReadingsTable.types';

export const MeteringDeviceReadingsTable: FC<MeteringDeviceReadingsTableProps> = ({
  isColdWater,
  readings,
  createReading,
}) => {
  const preparedReadings = useMemo(()=> groupWithEmptyReadings(readings), [readings])

  return (
    <div>
      <MeteringDeviceReadingsTableHeader isColdWater={isColdWater} />
      {preparedReadings.map(({ year, readings: yearReadings }) => (
        <MeteringDeviceYearReadings
          allReadings={readings}
          year={year}
          yearRreadings={yearReadings}
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
