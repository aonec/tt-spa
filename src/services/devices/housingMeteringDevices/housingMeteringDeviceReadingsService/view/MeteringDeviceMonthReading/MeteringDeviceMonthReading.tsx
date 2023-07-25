import { useFormik } from 'formik';
import { round } from 'lodash';
import { EMagistralType } from 'api/types';
import React, { FC, useEffect, useMemo } from 'react';
import { MonthWrapper, Wrapper } from './MeteringDeviceMonthReading.styled';
import { MeteringDeviceMonthReadingProps } from './MeteringDeviceMonthReading.types';
import { MeteringDeviceMonthReadingInput } from './MeteringDeviceMonthReadingInput';

export const MeteringDeviceMonthReading: FC<
  MeteringDeviceMonthReadingProps
> = ({
  monthReadings,
  isColdWater,
  month,
  createReading,
  allReadings,
  createReadingFailed,
}) => {
  const initialFeedFlowReading =
    monthReadings.find(
      (reading) => reading?.magistralType === EMagistralType.FeedFlow,
    ) || null;

  const initialFeedBackFlowReading =
    monthReadings.find(
      (reading) => reading?.magistralType === EMagistralType.FeedBackFlow,
    ) || null;

  const { values, setFieldValue, resetForm } = useFormik({
    initialValues: {
      feedFlowReading: initialFeedFlowReading,
      feedBackFlowReading: initialFeedBackFlowReading,
    },
    enableReinitialize: true,
    onSubmit: () => void 0,
  });

  useEffect(() => {
    return createReadingFailed.watch(() => resetForm()).unsubscribe;
  }, [createReadingFailed, resetForm]);

  const consumption = useMemo(() => {
    const { feedBackFlowReading, feedFlowReading } = values;

    const isFeedFlowReadingExist =
      feedFlowReading && typeof feedFlowReading.value === 'number';
    const isFeedFlowBackReadingExist =
      feedBackFlowReading && typeof feedBackFlowReading.value === 'number';

    if (
      !isFeedFlowReadingExist ||
      (!isColdWater && !isFeedFlowBackReadingExist)
    ) {
      return '-';
    }

    const prevFeedFlowReadingValue =
      allReadings.find(
        (reading) => reading.id === feedFlowReading?.previousReadingsId,
      )?.value || 0;

    const result = round(
      Number(feedFlowReading?.value) - prevFeedFlowReadingValue,
      3,
    );

    const prevBackFeedFlowReadingValue =
      allReadings.find(
        (reading) => reading.id === feedBackFlowReading?.previousReadingsId,
      )?.value || 0;

    return round(
      result +
        prevBackFeedFlowReadingValue -
        Number(feedBackFlowReading?.value || 0),
      3,
    );
  }, [allReadings, values, isColdWater]);

  const inputs = useMemo(() => {
    const { feedBackFlowReading, feedFlowReading } = values;
    if (isColdWater && feedFlowReading) {
      return (
        <MeteringDeviceMonthReadingInput
          createReading={createReading}
          reading={feedFlowReading}
          setFieldValue={(value) => setFieldValue('feedFlowReading', value)}
          initialFeedFlowReading={initialFeedFlowReading}
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
          initialFeedFlowReading={initialFeedFlowReading}
        />
        <MeteringDeviceMonthReadingInput
          createReading={createReading}
          reading={feedBackFlowReading}
          setFieldValue={(value) => setFieldValue('feedBackFlowReading', value)}
          initialFeedBackFlowReading={initialFeedBackFlowReading}
        />
      </>
    );
  }, [
    isColdWater,
    values,
    createReading,
    setFieldValue,
    initialFeedFlowReading,
    initialFeedBackFlowReading,
  ]);

  return (
    <Wrapper isColdWater={isColdWater}>
      <MonthWrapper>{month}</MonthWrapper>
      {inputs}
      {consumption}
    </Wrapper>
  );
};
