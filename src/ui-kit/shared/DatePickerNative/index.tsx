import dayjs from 'api/dayjs';
import React, { RefObject, useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  value?: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  searchStyle?: boolean;
  fullSize?: boolean;
  dataKey?: string;
  ref?:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined;
  onKeyDown?: (e: any) => any;
  inputData?: string;
}

export const DatePickerNative = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      value: incomingValue,
      placeholder,
      onChange,
      disabled,
      id,
      searchStyle,
      fullSize,
      onKeyDown,
      dataKey,
    },
    ref,
  ) => {
    const [innerValue, setInnerValue] = useState<string | null>(null);
    const value = dayjs(incomingValue).format();
    const currentValueTodayjs = innerValue ? dayjs(innerValue) : null;
    const isCurrentValueValid = currentValueTodayjs
      ? currentValueTodayjs.isValid()
      : false;

    const setInitialInnerValue = () => {
      setInnerValue(value ? dayjs(value).format('YYYY-MM-DD') : null);
    };

    function onChangeGlobal() {
      if (innerValue && currentValueTodayjs && isCurrentValueValid) {
        onChange && onChange(currentValueTodayjs.toISOString());
      }

      if (isCurrentValueValid) setInitialInnerValue();
    }

    useEffect(setInitialInnerValue, [value]);

    return (
      <InputSC
        data-reading-input={dataKey}
        fullSize={fullSize}
        searchStyle={searchStyle}
        id={id}
        disabled={disabled}
        ref={ref}
        onKeyDown={(e) => {
          onKeyDown && onKeyDown(e);
          fromEnter((e) => {
            isCurrentValueValid && e.target.blur();
          });
          fromEnter((e) => {
            isCurrentValueValid && e.target.blur();
          });
        }}
        onBlur={onChangeGlobal}
        value={innerValue || ''}
        onChange={(e: { target: { value: string } }) => {
          setInnerValue(e.target.value);
        }}
        placeholder={placeholder}
        type="date"
      />
    );
  },
);

const InputSC = styled.input<{
  searchStyle?: boolean;
  focused?: boolean;
  fullSize?: boolean;
}>`
  ${({ searchStyle }) =>
    searchStyle
      ? `
      width: 130px;
      font-size: 13px;
      padding-right: 5px;
      color: #333333;
  border: 1px solid lightgray;
  padding-left: 10px;
  transition: 0.2s;
  align-items: center;
  border-radius: 4px;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  box-shadow: 0 4px 7px #02004b1f;

  &:hover,
  &:focus {
    border: 1px solid #1890ff;
  }

  
  &:focus {
    box-shadow: 0 4px 8px #188fff52;
  }
  
  `
      : `
  
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
  `}

  ${({ focused }) => focused && 'border: 1px solid #1890ff;'}
  ${({ fullSize }) => fullSize && 'width: 100%'}
`;

export const fromEnter = (callback: (e: any) => void) => (e: any) => {
  return e?.key === 'Enter' && callback(e);
};
