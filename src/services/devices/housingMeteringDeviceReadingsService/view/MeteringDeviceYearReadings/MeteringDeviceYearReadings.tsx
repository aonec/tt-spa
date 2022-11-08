import React, { FC, useMemo, useState } from 'react';
import { MeteringDeviceMonthReading } from '../MeteringDeviceMonthReading';
import { ArrowSC, Year } from './MeteringDeviceYearReadings.styled';
import { MeteringDeviceYearReadingsProps } from './MeteringDeviceYearReadings.types';

export const MeteringDeviceYearReadings: FC<MeteringDeviceYearReadingsProps> = ({
  readings,
  year,
  isColdWater,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const list = useMemo(
    () =>
      Object.entries(readings).map(([month, reading]) => (
        <MeteringDeviceMonthReading
          monthReadings={reading}
          isColdWater={isColdWater}
          month={month}
          key={month}
        />
      )),
    [readings]
  );

  return (
    <>
      <Year onClick={() => setIsOpen((isOpen) => !isOpen)}>
        {year} год
        <ArrowSC open={isOpen} />
      </Year>
      {isOpen && list}
    </>
  );
};
