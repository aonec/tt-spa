import moment from 'moment';
import React, { FC, useMemo } from 'react';
import { NoFlowMeterTitle } from '../../housingMeteringDeviceReadingsService.styled';
import { groupWithEmptyReadings } from '../../housingMeteringDeviceReadingsService.utils';
import { MeteringDeviceReadingsTableHeader } from '../MeteringDeviceReadingsTableHeader';
import { MeteringDeviceYearReadings } from '../MeteringDeviceYearReadings';
import { MeteringDeviceReadingsTableProps } from './MeteringDeviceReadingsTable.types';

export const MeteringDeviceReadingsTable: FC<
  MeteringDeviceReadingsTableProps
> = ({
  isColdWater,
  readings,
  createReading,
  deviceIds,
  failureCreateReading,
}) => {
  const preparedReadings = useMemo(
    () => groupWithEmptyReadings(readings, deviceIds),
    [readings, deviceIds],
  );

  const isDevicesExist = preparedReadings.length !== 0;

  return (
    <>
      {!isDevicesExist && (
        <NoFlowMeterTitle>На узле не хватает расходомера(-ов)</NoFlowMeterTitle>
      )}
      {isDevicesExist && (
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
                  .startOf('month')
                  .utcOffset(0, true)
                  .format();
                createReading({ readingDate, deviceId, value });
              }}
              failureCreateReading={failureCreateReading}
            />
          ))}
        </div>
      )}
    </>
  );
};
