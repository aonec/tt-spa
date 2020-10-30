import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const tabs = [
  {
    title: 'Холодная вода',
    key: '1',
  },
  {
    title: 'Горячая вода',
    key: '2',
  },
  {
    title: 'Отопление',
    key: '3',
  },
];

const TabsComponent = (props) => {
  const { currentTabKey, handleChangeTab } = props;
  return (
    <Tabs activeKey={currentTabKey} onChange={handleChangeTab}>
      {tabs.map((currentTab) => {
        const { title, key } = currentTab;
        return (
          <TabPane tab={title} key={key} />
        );
      })}
    </Tabs>
  );
};

export default TabsComponent;
