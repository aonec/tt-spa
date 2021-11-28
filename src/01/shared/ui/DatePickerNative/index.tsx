import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  value?: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  ref?: any;
}

export const DatePickerNative: React.FC<Props> = ({
  value: incomingValue,
  placeholder,
  onChange,
  disabled,
  ref,
}) => {
  const [innerValue, setInnerValue] = useState<any>();
  const value = moment(incomingValue).toISOString(true);
  const currentValueToMoment = moment(innerValue);
  const isCurrentValueValid = currentValueToMoment.isValid();

  const setInitialInnerValue = () => {
    setInnerValue(value ? moment(value).format('YYYY-MM-DD') : undefined);
  };

  function onChangeGlobal() {
    if (innerValue) onChange && onChange(currentValueToMoment.toISOString());

    if (isCurrentValueValid) setInitialInnerValue();
  }

  useEffect(setInitialInnerValue, [value]);

  return (
    <StyledInput
      ref={ref}
      disabled={disabled}
      onKeyDown={fromEnter((e) => isCurrentValueValid && e.target.blur())}
      onBlur={onChangeGlobal}
      value={innerValue}
      onChange={(e: { target: { value: string } }) => {
        setInnerValue(e.target.value);
      }}
      placeholder={placeholder}
      type="date"
    />
  );
};

const StyledInput = styled.input`
  cursor: text;
  height: 48px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: 0.2s;

  &:hover:not([disabled]),
  &:focus {
    border-color: #40a9ff;
  }

  &:focus {
    box-shadow: 0 4px 8px #40a9ff34;
  }

  &:disabled {
    background: #f5f5f5;
    color: rgba(0, 0, 0, 0.25);
  }

  padding: 10px 15px;
`;

export const fromEnter = (callback: (e: any) => void) => (e: any) =>
  e?.key === 'Enter' && callback(e);
