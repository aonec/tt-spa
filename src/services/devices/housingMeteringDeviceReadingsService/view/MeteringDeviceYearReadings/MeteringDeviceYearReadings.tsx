import _ from 'lodash';
import React, { FC, useMemo, useState } from 'react';
import { MeteringDeviceMonthReading } from '../MeteringDeviceMonthReading';
import { ArrowSC, Year } from './MeteringDeviceYearReadings.styled';
import { MeteringDeviceYearReadingsProps } from './MeteringDeviceYearReadings.types';

export const MeteringDeviceYearReadings: FC<MeteringDeviceYearReadingsProps> = ({
  yearRreadings,
  year,
  isColdWater,
  createReading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const list = useMemo(
    () =>
      yearRreadings.map(({ month, readings }) => (
        <MeteringDeviceMonthReading
          monthReadings={readings}
          isColdWater={isColdWater}
          month={month}
          key={month}
          createReading={(reading)=>createReading({month, ...reading}) }
        />
      )),
    [yearRreadings]
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
