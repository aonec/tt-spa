import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DatePicker } from './DatePicker.styled';
import LocaleProvider from 'antd/lib/locale-provider';
import ruRu from 'antd/lib/locale-provider/ru_RU';

const meta: ComponentMeta<typeof DatePicker> = {
  title: 'DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: ComponentStory<typeof DatePicker> = (args) => (
  <div
    style={{
      width: '300px',
      display: 'flex',
      justifyContent: 'center',
      height: '400px',
    }}
  >
    <LocaleProvider locale={ruRu}>
      <DatePicker {...args} />
    </LocaleProvider>
  </div>
);

Overview.args = { format: 'DD.MM.YYYY' };

export const Small = () => (
  <div
    style={{
      width: '300px',
      display: 'flex',
      justifyContent: 'center',
      height: '400px',
    }}
  >
    <DatePicker small />
  </div>
);
