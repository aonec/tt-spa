import React, { FC, useMemo, useState } from 'react';
import { MeteringDeviceMonthReading } from '../MeteringDeviceMonthReading';
import { ArrowSC, Year } from './MeteringDeviceYearReadings.styled';
import { MeteringDeviceYearReadingsProps } from './MeteringDeviceYearReadings.types';

export const MeteringDeviceYearReadings: FC<
  MeteringDeviceYearReadingsProps
> = ({
  yearRreadings,
  year,
  isColdWater,
  createReading,
  allReadings,
  failureCreateReading,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const list = useMemo(
    () =>
      yearRreadings.map(({ month, readings }) => {
        return (
          <MeteringDeviceMonthReading
            monthReadings={readings}
            allReadings={allReadings}
            isColdWater={isColdWater}
            month={month}
            key={month}
            createReading={(reading) => createReading({ month, ...reading })}
            failureCreateReading={failureCreateReading}
          />
        );
      }),
    [
      yearRreadings,
      allReadings,
      isColdWater,
      createReading,
      failureCreateReading,
    ],
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
