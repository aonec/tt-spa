import React from 'react';
import styled from 'styled-components';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  style: React.CSSProperties;
}

export const DatePickerNative: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  style,
}) => {
  return (
    <Wrap
      value={value}
      type="date"
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={style}
    />
  );
};

const Wrap = styled.input`
  height: 48px;
  border: 1px solid #d9d9d9;

  &:hover,
  &:focus {
    border-color: #40a9ff;
  }

  &:focus {
    box-shadow: 0 4px 8px #40a9ff34;
  }

  padding: 10px 15px;
`;
