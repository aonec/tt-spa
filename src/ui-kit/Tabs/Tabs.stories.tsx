import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Tabs } from './Tabs.styled';
import { EditCalculatorTabs } from 'services/calculators/editCalculatorService/view/EditCalculatorPage/EditCalculatorPage.types';

const meta: ComponentMeta<typeof Tabs> = {
  title: 'Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: ComponentStory<typeof Tabs> = (args) => (
  <div style={{ width: '800px', display: 'flex', justifyContent: 'center' }}>
    <Tabs {...args} />
  </div>
);

Overview.args = {
  children: (
    <>
      <Tabs.TabPane tab="Общие данные" key={EditCalculatorTabs.CommonInfo} />
      <Tabs.TabPane
        tab="Настройки соединения"
        key={EditCalculatorTabs.Connection}
      />
      <Tabs.TabPane tab="Документы" key={EditCalculatorTabs.Documents} />
    </>
  ),
};
