import React from 'react'
import { Tabs } from 'antd';
import Common from './Common'

const { TabPane } = Tabs;

const tabs = [
  {
    title: 'Общие данные',
    key: '1',
    // Component: CommonTab,
  },
  {
    title: 'Настройки соединения',
    key: '2',
    // Component: SettingConnectionTab,
  },
  {
    title: 'Подключенные приборы',
    key: '3',
    // Component: DocumentsTab,
  },
  {
    title: 'Документы',
    key: '4',
    // Component: DocumentsTab,
  },
];

const TabsComponent = (props) => {
  console.log("TabsComponent", props)
  const { currentTabKey, handleChangeTab } = props;
  return (
    <Tabs activeKey={currentTabKey} onChange={handleChangeTab}>
      {tabs.map((currentTab) => {
        const { title, key, Component } = currentTab;
        return (
          <TabPane tab={title} key={key}>
              <Common />
          </TabPane>
        );
      })}
    </Tabs>
  );
};

export default TabsComponent;
