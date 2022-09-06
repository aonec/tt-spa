import {
  getSourceIcon,
  getSourceName,
} from '01/features/readings/displayReadingHistory/components/SourceIcon';
import { fromEnter } from '01/shared/ui/DatePickerNative';
import { Tooltip } from 'antd';
import moment from 'moment';
import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getFilledArray } from 'utils/getFilledArray';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import { MeterInputUploadReadingPayload } from '../../individualDeviceMetersInputService.types';
import {
  getReadingLite,
  getReadingValueKey,
} from '../../individualDeviceMetersInputService.utils';
import { useSwitchInputOnEnter } from './MetersInputBlock.hook';
import {
  Input,
  InputWrapper,
  ReadingDate,
  SourceIconWrapper,
  Wrapper,
} from './MetersInputsBlock.styled';
import {
  BufferedReadingValues,
  MetersInputBlockStatus,
  MetersInputsBlockProps,
} from './MetersInputsBlock.types';
import {
  getBufferedValuesFromReading,
  getBufferedValuesValueKey,
  getDateByReadingMonthSlider,
  getRateNum,
} from './MetersInputsBlock.utils';

export const MetersInputsBlock: FC<MetersInputsBlockProps> = ({
  resource,
  rateType,
  reading,
  sliderIndex,
  isPrevious,
  isDisabled,
  inputIndex,
  status: uploadingStatus,
  handleUploadReading,
}) => {
  const [status, setStatus] = useState<MetersInputBlockStatus | null>(null);

  useEffect(() => uploadingStatus && setStatus(uploadingStatus), [
    uploadingStatus,
  ]);

  const [
    bufferedReadingValues,
    setBufferedReadingValues,
  ] = useState<BufferedReadingValues>(getBufferedValuesFromReading(reading));

  useEffect(() => {
    setBufferedReadingValues(getBufferedValuesFromReading(reading));
  }, [reading, sliderIndex]);

  const rateNum = getRateNum(rateType);

  const dataString = isPrevious ? 'previuos' : 'current';

  const nextInput = useSwitchInputOnEnter(dataString, !isPrevious);

  const handleReadingInputFocus = useCallback(
    (e?: FocusEvent<HTMLInputElement>) => {
      e?.target?.select();
    },
    []
  );

  const inputDataAttr = isDisabled ? {} : { 'data-reading-input': dataString };

  const handleReadingInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBufferedReadingValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    [setBufferedReadingValues]
  );

  const { sourceIcon, sourceName } = useMemo(() => {
    const source = reading?.source;
    const username = reading?.user?.name;

    if (!source) return {};

    return {
      sourceIcon: getSourceIcon(source),
      sourceName: getSourceName(source, username),
    };
  }, [reading]);

  const handleEnterInput = useCallback(
    (index: number) => {
      const next = () => nextInput(inputIndex + index);

      const initialReadingValues = getBufferedValuesFromReading(reading);

      const isValuesChanged = Object.values(bufferedReadingValues).some(
        (value, index) =>
          value !== initialReadingValues[getBufferedValuesValueKey(index)]
      );

      if (index + 1 < rateNum || !isValuesChanged) return next();

      const readingValues = getReadingLite(bufferedReadingValues, rateNum);

      const readingPayload: MeterInputUploadReadingPayload = {
        meter: {
          ...readingValues,
          readingDate: getDateByReadingMonthSlider(sliderIndex),
        },
        sliderIndex,
        meterId: reading?.id,
      };

      handleUploadReading(readingPayload, next, isPrevious)
        .then(next)
        .catch(() => setStatus(MetersInputBlockStatus.Failed));
    },
    [nextInput, handleUploadReading]
  );

  const inputsArray = useMemo(
    () =>
      getFilledArray(rateNum, (index) => {
        const valueKey = getReadingValueKey(index);

        const readingValue = bufferedReadingValues[valueKey] || '';

        return (
          <InputWrapper>
            <Input
              type="number"
              status={status}
              disabled={isDisabled}
              onKeyDown={fromEnter(() => handleEnterInput(index))}
              value={readingValue}
              name={valueKey}
              placeholder={`T${index + 1}`}
              key={index}
              onFocus={handleReadingInputFocus}
              onChange={handleReadingInputChange}
              {...inputDataAttr}
            />
            {sourceIcon && (
              <Tooltip title={sourceName}>
                <SourceIconWrapper>{sourceIcon}</SourceIconWrapper>
              </Tooltip>
            )}
          </InputWrapper>
        );
      }),
    [
      bufferedReadingValues,
      rateNum,
      sliderIndex,
      isDisabled,
      inputIndex,
      inputDataAttr,
      status,
    ]
  );
  const readingDate = useMemo(() => {
    const readingDate = reading?.uploadTime;

    if (!readingDate) return '';

    return getTimeStringByUTC(readingDate, 'DD.MM.YYYY');
  }, [reading, sliderIndex]);

  return (
    <div>
      <Wrapper className="meters-wrapper" resource={resource}>
        {inputsArray}
      </Wrapper>
      <ReadingDate>{readingDate || 'Нет показаний'}</ReadingDate>
    </div>
  );
};
