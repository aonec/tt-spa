import React, { FC } from 'react';
import { MonthWrapper, Wrapper } from './MeteringDeviceMonthReading.styled';
import { MeteringDeviceMonthReadingProps } from './MeteringDeviceMonthReading.types';

export const MeteringDeviceMonthReading: FC<MeteringDeviceMonthReadingProps> = ({
  reading,
  isColdWater
}) => {
  const { month } = reading;
  return (
    <Wrapper isColdWater={isColdWater}>
      <MonthWrapper>{month}</MonthWrapper>
    </Wrapper>
  );
};
