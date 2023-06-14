import React, {
  FC,
  FocusEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ReadingDate } from './AccountingNodeReadingsInputBlock.styled';
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
  >(readingValue || null);

  useEffect(() => {
    setBufferedReadingValue(readingValue || null);
  }, [readingValue, sliderIndex]);

  useEffect(() => {
    setStatus(uploadingStatus || null);
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
    if (!bufferedReadingValue) {
      return;
    }
    handleSendReading({
      value: bufferedReadingValue,
      readingDate: preparedReadingDate,
    });
  }, [handleSendReading, bufferedReadingValue, sliderIndex, readingDate]);

  return (
    <Tooltip title={tooltip}>
      <div>
        <Wrapper resource={resource}>
          <InputWrapper>
            <Input
              type="number"
              status={status}
              onKeyDown={fromEnter(handleTriggerInput)}
              value={bufferedReadingValue || ''}
              onChange={(e) => {
                const value = e.target.value;
                if (!value) {
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
      </div>
    </Tooltip>
  );
};
