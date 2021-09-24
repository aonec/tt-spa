import { fromEnter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import { Flex } from '01/shared/ui/Layout/Flex';
import DeviceIcons from '01/_components/DeviceIcons';
import moment from 'moment';
import { EResourceType } from 'myApi';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MeteringDeviceReading } from '../MeteringDeviceReadingsLine/useMeteringDeviceReadings';
import { useUploadingReadings } from './useUploadingReadings';

interface Props {
  reading?: MeteringDeviceReading;
  onChange(value: number): void;
  resource?: EResourceType;
  colored?: boolean;
  loading?: boolean;
  disabled?: boolean;
  refetch(): void;
}

export const MeteringDeviceReadingInput: React.FC<Props> = (props) => {
  const {
    reading,
    onChange,
    resource = EResourceType.Electricity,
    colored,
    loading,
    disabled,
    refetch,
  } = props;

  const { color: resourceColor } = DeviceIcons[resource];
  const color = colored ? resourceColor : '#c3c3c3';

  const onFocusHandler = (e: any) => e.target.select();

  const { scopedValue, fieldOnChange, edited } = useUploadingReadings(
    reading,
    refetch
  );

  const fieldValue = scopedValue === '0' ? 0 : scopedValue || '';

  const onChangeHandler = (e: any) => fieldOnChange(e.target.value);

  const readingDate =
    reading?.reading?.readingDate &&
    moment(reading.reading.readingDate).format('DD.MM.YYYY');

  const onKeyhandler = (e: any) => {
    fromEnter(() => {})(e);
  };

  return (
    <Wrap hasDate={Boolean(readingDate)}>
      <Input
        value={fieldValue}
        disabled={loading || disabled}
        loading={loading}
        onFocus={onFocusHandler}
        type="number"
        color={color}
        onChange={onChangeHandler}
        edited={edited}
        onKeyDown={onKeyhandler}
        min={0}
      />
      <ReadingDate>{readingDate}</ReadingDate>
    </Wrap>
  );
};

const ReadingDate = styled(Flex)`
  justify-content: flex-end;
  color: #858585;
`;

interface WrapProps {
  hasDate: boolean;
}

const Wrap = styled.div`
  transform: ${({ hasDate }: WrapProps) =>
    hasDate ? 'translateY(11px)' : 'none'};
`;

interface InputProps {
  color: string;
  loading?: boolean;
  edited?: boolean;
}

const loadingGradientAnimation = keyframes`
	0% {
		background-position: 0% 50%;
	}
	100% {
		background-position: 100% 50%;
	}
`;

const Input = styled.input`
  height: 35px;
  padding: 2px 10px;
  border: 1px solid ${({ color }: InputProps) => color};
  border-left: 5px solid ${({ color }: InputProps) => color};
  border-radius: 5px;
  transition: 0.2s;
  background: ${({ edited }: InputProps) => (edited ? '#0051ff10' : 'white')};

  &:focus {
    box-shadow: 0 4px 8px rgba(7, 0, 44, 0.15);
  }

  &:disabled {
    background: linear-gradient(
      45deg,
      ${({ color }: InputProps) => `${color}ff`},
      ${({ color }: InputProps) => `${color}66`},
      ${({ color }: InputProps) => `${color}ff`},
      ${({ color }: InputProps) => `${color}66`},
      ${({ color }: InputProps) => `${color}ff`}
    );
    border: none;
    background-size: 150% 150%;
    animation: ${loadingGradientAnimation} 0.5s infinite linear;
    opacity: 0.3;
  }

  ${({ loading }: InputProps) =>
    loading
      ? `
      
    `
      : ''}
`;
