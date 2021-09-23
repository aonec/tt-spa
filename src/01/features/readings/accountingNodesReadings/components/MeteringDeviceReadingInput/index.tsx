import DeviceIcons from '01/_components/DeviceIcons';
import { EResourceType } from 'myApi';
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  value?: number;
  onChange(value: number): void;
  resource?: EResourceType;
  colored?: boolean;
  loading?: boolean;
}

export const MeteringDeviceReadingInput: React.FC<Props> = (props) => {
  const {
    value,
    onChange,
    resource = EResourceType.Electricity,
    colored,
    loading,
  } = props;

  const { color: resourceColor } = DeviceIcons[resource];

  const color = colored ? resourceColor : 'lightgray';

  const onFocusHandler = (e: any) => e.target.select();

  return (
    <Input
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
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
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
    background: linear-gradient(-45deg, white, lightgray);
    background-size: 150% 150%;
    animation: ${loadingGradientAnimation} 4s ease infinite;
    opacity: 0.5;
  }
`;
