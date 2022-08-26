import {
  getSourceIcon,
  getSourceName,
} from '01/features/readings/displayReadingHistory/components/SourceIcon';
import { fromEnter } from '01/shared/ui/DatePickerNative';
import { Tooltip } from 'antd';
import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { getFilledArray } from 'utils/getFilledArray';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
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
  MetersInputsBlockProps,
} from './MetersInputsBlock.types';
import {
  getBufferedValuesFromReading,
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
}) => {
  const [
    bufferedReadingValues,
    setBufferedReadingValues,
  ] = React.useState<BufferedReadingValues>(
    getBufferedValuesFromReading(reading)
  );

  useEffect(() => {
    setBufferedReadingValues(getBufferedValuesFromReading(reading));
  }, [reading, sliderIndex]);

  const rateNum = getRateNum(rateType);

  const dataString = isPrevious ? 'previuos' : 'current';

  const nextInput = useSwitchInputOnEnter(dataString, isPrevious);

  const handleReadingInputFocus = useCallback(
    (e?: FocusEvent<HTMLInputElement>) => {
      e?.target?.select();
    },
    []
  );

  const inputDataAttr = useMemo(() => {
    if (isDisabled) return {};

    return { 'data-reading-input': dataString };
  }, [isDisabled, dataString]);

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

  const inputsArray = useMemo(
    () =>
      getFilledArray(rateNum, (index) => {
        const valueKey = `value${
          index + 1
        }` as keyof typeof bufferedReadingValues;

        const readingValue = bufferedReadingValues[valueKey] || '';

        return (
          <InputWrapper>
            <Input
              onKeyDown={fromEnter(() => nextInput(inputIndex + index))}
              value={readingValue}
              name={`value${index + 1}`}
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
    [bufferedReadingValues, rateNum, sliderIndex]
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
