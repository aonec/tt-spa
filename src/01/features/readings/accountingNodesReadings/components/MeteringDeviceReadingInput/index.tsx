import DeviceIcons from '01/_components/DeviceIcons';
import { EResourceType } from 'myApi';
import React from 'react';
import styled from 'styled-components';

interface Props {
  value: number;
  onChange(value: number): void;
  resource?: EResourceType;
  colored?: boolean;
}

export const MeteringDeviceReadingInput: React.FC<Props> = ({
  value,
  onChange,
  resource = EResourceType.Electricity,
  colored,
}) => {
  const { color: resourceColor } = DeviceIcons[resource];

  const color = colored ? resourceColor : 'lightgray';

  return <Input color={color} />;
};

interface InputProps {
  color: string;
}

const Input = styled.input`
  height: 35px;
  padding: 2px 10px;
  border: 2px solid ${({ color }: InputProps) => color};
  border-left: 4px solid ${({ color }: InputProps) => color};
  border-radius: 4px;
`;
