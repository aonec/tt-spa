import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

interface Props {
  value: moment.Moment | undefined;
  onChange: (value: moment.Moment) => void;
}

export const DatePickerNative: React.FC<Props> = ({ value, onChange }) => {
  const [innerValue, setInnerValue] = useState('');

  useEffect(() => {
    value && setInnerValue(value?.format('DD.MM.YYYY'));
  }, [value]);

  function onGlobalChangeHandler() {}

  function onEneterHandler(e: any) {
    
  }

  return (
    <Wrap
      onBlur={onGlobalChangeHandler}
      onKeyDown={onEneterHandler}
      value={value?.format('DD.MM.YYYY')}
      onChange={(e) => setInnerValue(e.target.value)}
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
