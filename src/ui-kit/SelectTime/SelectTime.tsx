import React, { FC } from 'react';
import { SelectTimeProps } from './SelectTime.types';
import { Select } from 'ui-kit/Select/Select.styled';

const hours = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
];

export const SelectTime: FC<SelectTimeProps> = ({ value, onChange }) => {
  return (
    <Select
      placeholder="Время"
      value={value}
      onChange={(value) => onChange && onChange(value as any)}
    >
      {hours.map((time) => (
        <Select.Option value={time} key={time}>
          {time}
        </Select.Option>
      ))}
    </Select>
  );
};
