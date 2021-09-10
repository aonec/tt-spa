import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import moment from 'moment';

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
      onChange={(date) =>
        date instanceof Date && onChange(moment(date).toISOString())
      }
    />
  );
};

const Wrap = styled(DatePicker)`
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
