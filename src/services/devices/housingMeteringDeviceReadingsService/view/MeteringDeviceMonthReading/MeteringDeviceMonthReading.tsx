import { useFormik } from 'formik';
import { round } from 'lodash';
import { EMagistralType } from 'myApi';
import React, { FC, useMemo } from 'react';
import { MonthWrapper, Wrapper } from './MeteringDeviceMonthReading.styled';
import { MeteringDeviceMonthReadingProps } from './MeteringDeviceMonthReading.types';
import { MeteringDeviceMonthReadingInput } from './MeteringDeviceMonthReadingInput';

export const MeteringDeviceMonthReading: FC<MeteringDeviceMonthReadingProps> = ({
  monthReadings,
  isColdWater,
  month,
  createReading,
  allReadings,
}) => {
  const { values, setFieldValue } = useFormik({
    initialValues: {
      feedFlowReading: monthReadings.find(
        (reading) => reading?.magistralType === EMagistralType.FeedFlow
      ),
      feedBackFlowReading: monthReadings.find(
        (reading) => reading?.magistralType === EMagistralType.FeedBackFlow
      ),
    },
    enableReinitialize: true,
    onSubmit: () => void 0,
  });

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
        (reading) => reading.id === feedFlowReading?.previousReadingsId
      )?.value || 0;

    const result = round(
      Number(feedFlowReading?.value) - prevFeedFlowReadingValue,
      3
    );

    const prevBackFeedFlowReadingValue =
      allReadings.find(
        (reading) => reading.id === feedBackFlowReading?.previousReadingsId
      )?.value || 0;

    return round(
      result +
        prevBackFeedFlowReadingValue -
        Number(feedBackFlowReading?.value || 0),
      3
    );
  }, [allReadings, values]);

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
      {consumption}
    </Wrapper>
  );
};
