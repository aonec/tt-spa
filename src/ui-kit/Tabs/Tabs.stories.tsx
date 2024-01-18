import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs.styled';
import { EditCalculatorTabs } from 'services/calculators/editCalculatorService/view/EditCalculatorPage/EditCalculatorPage.types';

const meta: Meta<typeof Tabs> = {
  title: 'Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
};

export default meta;

const tabItems = [
  { label: 'Общие данные', key: EditCalculatorTabs.CommonInfo },
  { label: 'Настройки соединения', key: EditCalculatorTabs.Connection },
  { label: 'Документы', key: EditCalculatorTabs.Documents },
];

export const Overview: StoryObj<typeof Tabs> = {
  render: (args) => (
    <div style={{ width: '800px', display: 'flex', justifyContent: 'center' }}>
      <Tabs {...args} items={tabItems} />
    </div>
  ),
};
