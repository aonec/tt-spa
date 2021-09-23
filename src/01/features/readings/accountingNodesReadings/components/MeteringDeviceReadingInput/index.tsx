import DeviceIcons from '01/_components/DeviceIcons';
import { EResourceType } from 'myApi';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MeteringDeviceReading } from '../MeteringDeviceReadingsLine/useMeteringDeviceReadings';

interface Props {
  reading?: MeteringDeviceReading;
  onChange(value: number): void;
  resource?: EResourceType;
  colored?: boolean;
  loading?: boolean;
}

export const MeteringDeviceReadingInput: React.FC<Props> = (props) => {
  const {
    reading,
    onChange,
    resource = EResourceType.Electricity,
    colored,
    loading,
  } = props;

  const { color: resourceColor } = DeviceIcons[resource];

  const color = colored ? resourceColor : '#c3c3c3';

  const onFocusHandler = (e: any) => e.target.select();

  const value = reading?.reading.value

  const fieldValue = value === 0 ? 0 : (value || '')

  return (
    <Input
      value={fieldValue}
      disabled={loading}
      onFocus={onFocusHandler}
      type="number"
      color={color}
    />
  );
};

interface InputProps {
  color: string;
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
`;
