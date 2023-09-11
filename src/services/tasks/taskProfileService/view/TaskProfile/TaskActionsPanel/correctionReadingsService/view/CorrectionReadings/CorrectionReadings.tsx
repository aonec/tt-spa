import dayjs from 'api/dayjs';
import { IndividualDeviceReadingsItemHistoryResponse } from 'api/types';
import React, { FC, useEffect, useState } from 'react';
import { getReadingValuesArray } from 'services/meters/individualDeviceMetersInputService/view/ApartmentIndividualDeviceMetersInputLine/ApartmentIndividualDeviceMetersInputLine.utils';
import { MetersInputsBlockPure } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MeterInputsBlockPure';
import { BufferedReadingValues } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';
import {
  getRateNum,
  getBufferedValuesFromReading,
} from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.utils';
import { FormItem } from 'ui-kit/FormItem';
import { IndividualDeviceInfo } from 'ui-kit/shared/IndividualDeviceInfo';
import { ReadingsHistoryButton } from 'ui-kit/shared/reading_history_button';
import {
  DeviceInfoWrapper,
  Header,
  InfoBlock,
  InvalidReadingsInfoWrapper,
  InvalidReadingValue,
  InvalidReadingValueIndex,
  InvalidReadingValueWrapper,
  Wrapper,
} from './CorrectionReadings.styled';
import { CorrectionReadingsProps } from './CorrectionReadings.types';

export const CorrectionReadings: FC<CorrectionReadingsProps> = ({
  task,
  handleReadingChange,
}) => {
  const device = task.individualDevices?.[0];

  const fixedReading = device?.fixedReading;

  const [bufferedReadingValues, setBufferedReadingValues] =
    useState<BufferedReadingValues>(
      getBufferedValuesFromReading(fixedReading || undefined),
    );

  useEffect(() => {
    if (bufferedReadingValues) handleReadingChange(bufferedReadingValues);
  }, [bufferedReadingValues, handleReadingChange]);

  const problemReading = device?.invalidReading;

  const readingDate = dayjs(problemReading?.readingDate).format('MMMM YYYY');
  const rateNum = device?.rateType ? getRateNum(device?.rateType) : 0;

  const problemReadingValues =
    problemReading &&
    getReadingValuesArray(
      problemReading as IndividualDeviceReadingsItemHistoryResponse,
      rateNum,
    );

  if (!device) return null;

  const invalidReadingInfo = (
    <InvalidReadingsInfoWrapper>
      <InfoBlock title="Некорректные показания">
        {problemReadingValues?.map((value, index) => (
          <InvalidReadingValueWrapper>
            <InvalidReadingValueIndex>T{index + 1}:</InvalidReadingValueIndex>{' '}
            <InvalidReadingValue>{value}</InvalidReadingValue>
          </InvalidReadingValueWrapper>
        ))}
      </InfoBlock>
      <InfoBlock title="Период">{readingDate}</InfoBlock>
      <InfoBlock title="Оператор">{problemReading?.user?.name!}</InfoBlock>
      <InfoBlock title="Причина ошибки">{task?.creationReason!}</InfoBlock>
      <ReadingsHistoryButton deviceId={device.id} />
    </InvalidReadingsInfoWrapper>
  );

  const handleChangeReadingValues = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBufferedReadingValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Wrapper>
      <Header>Введите исправленные показния</Header>
      <DeviceInfoWrapper>
        <IndividualDeviceInfo device={device} showCheckingDates />
      </DeviceInfoWrapper>
      {invalidReadingInfo}
      <FormItem label="Исправленные показания">
        <MetersInputsBlockPure
          rateNum={rateNum}
          bufferedReadingValues={bufferedReadingValues}
          resource={device?.resource}
          handleReadingInputChange={handleChangeReadingValues}
        />
      </FormItem>
    </Wrapper>
  );
};
