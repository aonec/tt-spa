import React, { FC, useMemo } from 'react';
import { ArrowDown } from 'react-bootstrap-icons';
import { MeteringDeviceMonthReading } from '../MeteringDeviceMonthReading';
import { ArrowSC, Year } from './MeteringDeviceYearReadings.styled';
import { MeteringDeviceYearReadingsProps } from './MeteringDeviceYearReadings.types';

export const MeteringDeviceYearReadings: FC<MeteringDeviceYearReadingsProps> = ({
  readings,
  year,
  isColdWater,
}) => {
  const list = useMemo(
    () =>
      readings.map((reading) => (
        <MeteringDeviceMonthReading
          reading={reading}
          isColdWater={isColdWater}
        />
      )),
    [readings]
  );
  const open = true;

  return (
    <>
      <Year>
        {year} год
        <ArrowSC open={open} />
      </Year>
      {open && list}
    </>
  );
};
