import { useFormik } from 'formik';
import React, { FC, useMemo, useState } from 'react';
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
  const { values, setFieldValue } = useFormik({
    initialValues: {
      feedFlowReading: monthReadings[0],
      feedBackFlowReading: monthReadings?.[1] || null,
    },
    enableReinitialize: true,
    onSubmit: console.log,
  });

  const coldWaterInput = useMemo(() => {
    if (!values.feedFlowReading) {
      return null;
    }
    return (
      <InputSC
        size="small"
        value={values.feedFlowReading.value}
        onChange={(e) =>
          setFieldValue('feedFlowReading', {
            ...values.feedFlowReading,
            value: e.target.value,
          })
        }
      />
    );
  }, [values, setFieldValue]);

  const notColdWaterInput = useMemo(() => {
    if (!values.feedFlowReading || !values.feedBackFlowReading) {
      return null;
    }

    return (
      <>
        <InputSC
          size="small"
          value={values.feedFlowReading.value}
          onChange={(e) =>
            setFieldValue('feedFlowReading', {
              ...values.feedFlowReading,
              value: e.target.value,
            })
          }
        />
        <InputSC
          size="small"
          value={values.feedBackFlowReading.value}
          onChange={(e) =>
            setFieldValue('feedBackFlowReading', {
              ...values.feedBackFlowReading,
              value: e.target.value,
            })
          }
        />
      </>
    );
  }, [values, setFieldValue]);

  const inputs = useMemo(() => {
    if (isColdWater) {
      return coldWaterInput;
    }

    return notColdWaterInput;
  }, [isColdWater, values]);

  return (
    <Wrapper isColdWater={isColdWater}>
      <MonthWrapper>{month}</MonthWrapper>
      {inputs}
    </Wrapper>
  );
};
