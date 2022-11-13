import { useFormik } from 'formik';
import React, { FC, useMemo, useState } from 'react';
import { MonthWrapper, Wrapper } from './MeteringDeviceMonthReading.styled';
import { MeteringDeviceMonthReadingProps } from './MeteringDeviceMonthReading.types';
import { MeteringDeviceMonthReadingInput } from './MeteringDeviceMonthReadingInput';

export const MeteringDeviceMonthReading: FC<MeteringDeviceMonthReadingProps> = ({
  monthReadings,
  isColdWater,
  month,
  createReading,
}) => {
  const { values, setFieldValue } = useFormik({
    initialValues: {
      feedFlowReading: monthReadings[0],
      feedBackFlowReading: monthReadings?.[1] || null,
    },
    enableReinitialize: true,
    onSubmit: () => void 0,
  });

  const inputs = useMemo(() => {
    const { feedBackFlowReading, feedFlowReading } = values;
    if (isColdWater && feedFlowReading) {
      return (
        <MeteringDeviceMonthReadingInput
          createReading={createReading}
          reading={feedFlowReading}
          setFieldValue={(value) => setFieldValue('feedFlowReading', value)}
        />
      );
    }
    if (!feedFlowReading || !feedBackFlowReading) {
      return null;
    }

    return (
      <>
        <MeteringDeviceMonthReadingInput
          createReading={createReading}
          reading={feedFlowReading}
          setFieldValue={(value) => setFieldValue('feedFlowReading', value)}
        />
        <MeteringDeviceMonthReadingInput
          createReading={createReading}
          reading={feedBackFlowReading}
          setFieldValue={(value) => setFieldValue('feedBackFlowReading', value)}
        />
      </>
    );
  }, [isColdWater, values]);

  return (
    <Wrapper isColdWater={isColdWater}>
      <MonthWrapper>{month}</MonthWrapper>
      {inputs}
    </Wrapper>
  );
};
