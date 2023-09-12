import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import { Calendar } from './';
import dayjs from 'api/dayjs';

export default {
  title: 'Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof Calendar>;

export const Overview = () => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  return (
    <div style={{ width: 320 }}>
      <Calendar selectedDate={date} handleSelectDate={setDate} />
    </div>
  );
};
