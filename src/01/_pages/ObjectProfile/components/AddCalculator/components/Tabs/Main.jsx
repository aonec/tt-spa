import React from 'react';
import { Tabs } from 'antd';
import CommonTab from './CommonTab';
import SettingConnectionTab from './SettingConnectionTab';
import DocumentsTab from './DocumentsTab';

const { TabPane } = Tabs;

const tabs = [
  {
    title: 'Шаг 1. Общие данные',
    key: '1',
    Component: CommonTab,
  },
  {
    title: 'Шаг 2. Настройки соединения',
    key: '2',
    Component: SettingConnectionTab,
  },
  {
    title: 'Шаг 3. Документы',
    key: '3',
    Component: DocumentsTab,
  },
];

const TabsComponent = (props) => {
  const { currentTabKey, handleChangeTab } = props;
  return (
    <Tabs activeKey={currentTabKey} onChange={handleChangeTab}>
      {tabs.map((currentTab) => {
        const { title, key, Component } = currentTab;
        return (
          <TabPane tab={title} key={key}>
            <Component />
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default TabsComponent;
