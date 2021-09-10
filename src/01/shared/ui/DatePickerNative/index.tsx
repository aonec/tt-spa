import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  value?: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const DatePickerNative: React.FC<Props> = ({
  value: incomingValue,
  placeholder,
  onChange,
}) => {
  const [innerValue, setInnerValue] = useState<any>();
  const value = moment(incomingValue).toISOString();
  const currentValueToMoment = moment(innerValue);
  const isCurrentValueValid = currentValueToMoment.isValid();
  const setInitialInnerValue = () => {
    value && setInnerValue(moment(value).format('YYYY-MM-DD'));
  };

  function onChangeGlobal() {
    isCurrentValueValid
      ? onChange(currentValueToMoment.toISOString())
      : setInitialInnerValue();
  }

  useEffect(setInitialInnerValue, [value]);

  return (
    <StyledInput
      onKeyDown={fromEnter((e) => isCurrentValueValid && e.target.blur())}
      onBlur={onChangeGlobal}
      value={innerValue}
      onChange={(e: { target: { value: string } }) => {
        console.log(e.target.value);
        setInnerValue(e.target.value);
      }}
      placeholder={placeholder}
      type="date"
    />
  );
};

const StyledInput = styled.input`
  height: 48px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: 0.2s;

  &:hover,
  &:focus {
    border-color: #40a9ff;
  }

  &:focus {
    box-shadow: 0 4px 8px #40a9ff34;
  }

  padding: 10px 15px;
`;

const fromEnter = (callback: (e: any) => void) => (e: any) =>
  e?.key === 'Enter' && callback(e);
