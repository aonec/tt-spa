import React from 'react';
import { Tabs } from 'antd';
import CommonTab from './CommonTab';
import SettingConnectionTab from './SettingConnectionTab';
import DocumentsTab from './DocumentsTab';
import RelatedDevices from './RelatedDevices';

const { TabPane } = Tabs;

const tabs = [
  {
    title: 'Общие данные',
    key: '1',
    Component: CommonTab,
  },
  {
    title: 'Настройки соединения',
    key: '2',
    Component: SettingConnectionTab,
  },
  {
    title: 'Подключенные приборы',
    key: '3',
    Component: RelatedDevices,
  },
  {
    title: 'Документы',
    key: '4',
    Component: DocumentsTab,
  },
];

const TabsComponent = (props) => {
  const { currentTabKey, handleChangeTab } = props;
  return (
    <Tabs style={{height: 'fit-content'}} activeKey={currentTabKey} onChange={handleChangeTab}>
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
