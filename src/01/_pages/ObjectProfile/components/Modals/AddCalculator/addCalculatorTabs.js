import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const tabs = [
  {
    title: 'Общие данные',
    key: '1',
  },
  {
    title: 'Настройки соединения',
    key: '2',
  },
  {
    title: 'Документы',
    key: '3',
  },
];

const TabsComponent = (props) => {
  const { currentTabKey, handleChangeTab } = props;
  return (
    <Tabs
      style={{ height: 'fit-content' }}
      activeKey={currentTabKey}
      onChange={handleChangeTab}
    >
      {tabs.map((currentTab) => {
        const { title, key } = currentTab;
        return <TabPane tab={title} key={key} />;
      })}
    </Tabs>
  );
};

export default TabsComponent;
