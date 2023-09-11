import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DatePicker } from './DatePicker.styled';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/locale/ru_RU';

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
    <ConfigProvider locale={ruRu}>
      <DatePicker {...args} />
    </ConfigProvider>
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
