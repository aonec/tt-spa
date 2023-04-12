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

export const Basic: ComponentStory<typeof DatePicker> = (args) => (
  <div style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>
    <LocaleProvider locale={ruRu}>
      <DatePicker {...args} />
    </LocaleProvider>
  </div>
);

Basic.args = { format: 'DD.MM.YYYY' };
