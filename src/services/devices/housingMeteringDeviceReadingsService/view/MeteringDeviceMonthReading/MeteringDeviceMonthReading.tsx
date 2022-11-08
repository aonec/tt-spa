import { EMagistralType } from 'myApi';
import React, { FC, useMemo } from 'react';
import {
  InputSC,
  MonthWrapper,
  Wrapper,
} from './MeteringDeviceMonthReading.styled';
import { MeteringDeviceMonthReadingProps } from './MeteringDeviceMonthReading.types';

export const MeteringDeviceMonthReading: FC<MeteringDeviceMonthReadingProps> = ({
  monthReadings,
  isColdWater,
  month,
}) => {
  const inputs = useMemo(() => {
    const feedFlowReading = monthReadings.find(
      (reading) => reading.magistralType === EMagistralType.FeedFlow
    );
    const feedBackFlowReading = monthReadings.find(
      (reading) => reading.magistralType === EMagistralType.FeedBackFlow
    );
    if (isColdWater && feedFlowReading) {
      return <InputSC size="small" value={feedFlowReading.value} />;
    }
    if (!feedFlowReading || !feedBackFlowReading) {
      return null;
    }

    return (
      <>
        <InputSC size="small" value={feedFlowReading.value} />
        <InputSC size="small" value={feedBackFlowReading.value} />
      </>
    );
  }, [monthReadings, isColdWater]);

  return (
    <Wrapper isColdWater={isColdWater}>
      <MonthWrapper>{month}</MonthWrapper>
      {inputs}
    </Wrapper>
  );
};
