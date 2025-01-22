import { fromEnter } from 'ui-kit/shared/DatePickerNative';
import { Tooltip } from 'ui-kit/shared/Tooltip';
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
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
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
import { getSourceIcon, getSourceName } from 'utils/sourceIcon';
import { Dropdown } from 'antd';
import { MenuProps } from 'antd/lib';

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
  tooltip,
  focusOnFirst = true,
}) => {
  const [status, setStatus] = useState<MetersInputBlockStatus | null>(null);

  useEffect(() => {
    setStatus(uploadingStatus || null);
  }, [uploadingStatus, sliderIndex]);

  const [bufferedReadingValues, setBufferedReadingValues] =
    useState<BufferedReadingValues>(getBufferedValuesFromReading(reading));

  useEffect(() => {
    setBufferedReadingValues(getBufferedValuesFromReading(reading));
  }, [reading, sliderIndex]);

  const rateNum = useMemo(() => getRateNum(rateType), [rateType]);

  const dataString = useMemo(
    () => (isPrevious ? 'previuos' : 'current'),
    [isPrevious],
  );

  const nextInput = useSwitchInputOnEnter(
    dataString,
    focusOnFirst && !isPrevious && inputIndex === 0,
  );

  const handleReadingInputFocus = useCallback(
    (e?: FocusEvent<HTMLInputElement>) => {
      e?.target?.select();
    },
    [],
  );

  const setFailed = useCallback(
    () => setStatus(MetersInputBlockStatus.Failed),
    [],
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
    [setBufferedReadingValues],
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

  const uploadReading = useCallback(
    async (next: () => void) => {
      const readingValues = getReadingLite(bufferedReadingValues, rateNum);

      const readingPayload: MeterInputUploadReadingPayload = {
        ...readingValues,
        readingDate: getDateByReadingMonthSlider(sliderIndex),
        sliderIndex,
        meterId: reading?.id,
      };

      if (handleUploadReading) {
        handleUploadReading(readingPayload, isPrevious, setFailed)
          .then(() => next())
          .catch(() => setStatus(MetersInputBlockStatus.Failed));
      }
    },
    [
      bufferedReadingValues,
      rateNum,
      sliderIndex,
      handleUploadReading,
      reading,
      isPrevious,
      setFailed,
    ],
  );

  const handleTriggerInput = useCallback(
    (index: number) => {
      const next = () => {
        nextInput(inputIndex + index);
      };

      const initialReadingValues = getBufferedValuesFromReading(reading);

      const isValuesChanged = Object.values(bufferedReadingValues).some(
        (value, index) =>
          value !== initialReadingValues[getBufferedValuesValueKey(index)],
      );

      const isLastIndex = rateNum === index + 1;

      if (!isValuesChanged || !isLastIndex) {
        return next();
      }

      uploadReading(next);
    },
    [
      nextInput,
      bufferedReadingValues,
      inputIndex,
      rateNum,
      reading,
      uploadReading,
    ],
  );

  const inputsArray = useMemo(
    () =>
      getFilledArray(rateNum, (index) => {
        const valueKey = getReadingValueKey(index);

        const readingValue = bufferedReadingValues[valueKey] || '';

        const items: MenuProps['items'] = [
          {
            label: 'Перебивка',
            key: '1',
            onClick: () => {
              const next = () => {
                nextInput(inputIndex + index);
              };
              uploadReading(next);
            },
          },
        ];

        return (
          <Dropdown
            key={index}
            menu={{ items }}
            trigger={['contextMenu']}
            placement="bottomLeft"
          >
            <InputWrapper key={index}>
              <Input
                id={`${index}`}
                type="number"
                status={status}
                disabled={isDisabled}
                onKeyDown={fromEnter(() => handleTriggerInput(index))}
                value={readingValue}
                name={valueKey}
                placeholder={`T${index + 1}`}
                onFocus={handleReadingInputFocus}
                onChange={handleReadingInputChange}
                {...inputDataAttr}
                onContextMenu={(event) => {
                  event.preventDefault();
                }}
              />
              {sourceIcon && (
                <Tooltip title={sourceName}>
                  <SourceIconWrapper>{sourceIcon}</SourceIconWrapper>
                </Tooltip>
              )}
            </InputWrapper>
          </Dropdown>
        );
      }),
    [
      bufferedReadingValues,
      rateNum,
      isDisabled,
      inputDataAttr,
      status,
      handleReadingInputChange,
      sourceIcon,
      handleReadingInputFocus,
      handleTriggerInput,
      sourceName,
    ],
  );
  const readingDate = useMemo(() => {
    const readingDate = reading?.entryDate;

    if (!readingDate) return '';

    return getTimeStringByUTC(readingDate, 'DD.MM.YYYY');
  }, [reading]);

  return (
    <Tooltip title={tooltip}>
      <div>
        <Wrapper
          className="meters-wrapper"
          data-test="meters-input"
          resource={resource}
        >
          {inputsArray}
        </Wrapper>
        <ReadingDate>{readingDate || 'Нет показаний'}</ReadingDate>
      </div>
    </Tooltip>
  );
};
