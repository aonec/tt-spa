import { useFormik } from 'formik';
import React, { FC, useMemo, useState } from 'react';
import {
  InputSC,
  MonthWrapper,
  Wrapper,
} from './MeteringDeviceMonthReading.styled';
import { MeteringDeviceMonthReadingProps } from './MeteringDeviceMonthReading.types';
import { fromEnter } from '01/shared/ui/DatePickerNative';

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
    onSubmit: ()=> void 0,
  });

  const coldWaterInput = useMemo(() => {
    const { feedFlowReading } = values;
    if (!feedFlowReading) {
      return null;
    }
    return (
      <InputSC
        size="small"
        value={feedFlowReading.value}
        onKeyDown={fromEnter(() => createReading({ ...feedFlowReading }))}
        onChange={(e) =>
          setFieldValue('feedFlowReading', {
            ...feedFlowReading,
            value: Number(e.target.value),
          })
        }
      />
    );
  }, [values, setFieldValue]);

  const notColdWaterInput = useMemo(() => {
    const { feedBackFlowReading, feedFlowReading } = values;
    if (!feedFlowReading || !feedBackFlowReading) {
      return null;
    }

    return (
      <>
        <InputSC
          size="small"
          value={feedFlowReading.value}
          onKeyDown={fromEnter(() => createReading({ ...feedFlowReading }))}
          onChange={(e) =>
            setFieldValue('feedFlowReading', {
              ...feedFlowReading,
              value: Number(e.target.value),
            })
          }
        />
        <InputSC
          size="small"
          value={feedBackFlowReading.value}
          onKeyDown={fromEnter(() => createReading({ ...feedBackFlowReading }))}
          onChange={(e) =>
            setFieldValue('feedBackFlowReading', {
              ...feedBackFlowReading,
              value: Number(e.target.value),
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
