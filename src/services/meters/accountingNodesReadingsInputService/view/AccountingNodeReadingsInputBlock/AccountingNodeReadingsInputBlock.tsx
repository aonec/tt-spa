import React, {
  FC,
  FocusEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  InputBlockWrapper,
  ReadingDate,
} from './AccountingNodeReadingsInputBlock.styled';
import { AccountingNodeReadingsInputBlockProps } from './AccountingNodeReadingsInputBlock.types';
import {
  Input,
  InputWrapper,
  Wrapper,
} from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.styled';
import { MetersInputBlockStatus } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';
import { Tooltip } from 'antd';
import { fromEnter } from 'ui-kit/shared_components/DatePickerNative';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import moment from 'moment';
import { useSwitchInputOnEnter } from '01/features/individualDevices/switchIndividualDevice/components/stages/BaseInfoStage.hook';

export const AccountingNodeReadingsInputBlock: FC<
  AccountingNodeReadingsInputBlockProps
> = ({
  resource,
  status: uploadingStatus,
  sliderIndex,
  tooltip,
  inputIndex,
  readingValue,
  readingDate,
  handleSendReading,
  dataKey,
}) => {
  const [status, setStatus] = useState<MetersInputBlockStatus | null>(null);
  const [bufferedReadingValue, setBufferedReadingValue] = useState<
    number | null
  >(readingValue);

  const next = useSwitchInputOnEnter(dataKey, false);

  useEffect(() => {
    setBufferedReadingValue(readingValue);
  }, [readingValue, sliderIndex]);

  useEffect(() => {
    setStatus(uploadingStatus);
  }, [uploadingStatus, sliderIndex]);

  const formattedReadingDate = useMemo(() => {
    if (!readingDate) return '';

    return getTimeStringByUTC(readingDate, 'DD.MM.YYYY');
  }, [readingDate]);

  const handleReadingInputFocus = useCallback(
    (e?: FocusEvent<HTMLInputElement>) => {
      e?.target?.select();
    },
    [],
  );

  const handleTriggerInput = useCallback(() => {
    const preparedReadingDate =
      readingDate ||
      moment().subtract(sliderIndex, 'month').format('YYYY-MM-DD');

    handleSendReading({
      value: bufferedReadingValue,
      readingDate: preparedReadingDate,
    });
    next(inputIndex);
  }, [
    handleSendReading,
    bufferedReadingValue,
    sliderIndex,
    readingDate,
    next,
    inputIndex,
  ]);

  return (
    <Tooltip title={tooltip}>
      <InputBlockWrapper>
        <Wrapper resource={resource}>
          <InputWrapper>
            <Input
              type="number"
              status={status}
              onKeyDown={fromEnter(handleTriggerInput)}
              value={bufferedReadingValue === null ? '' : bufferedReadingValue}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  return setBufferedReadingValue(null);
                }
                setBufferedReadingValue(Number(value));
              }}
              onFocus={handleReadingInputFocus}
              data-reading-input={dataKey}
            />
          </InputWrapper>
        </Wrapper>
        <ReadingDate>{formattedReadingDate || 'Нет показаний'}</ReadingDate>
      </InputBlockWrapper>
    </Tooltip>
  );
};
