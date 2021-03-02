import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const tabsComponent = [
  {
    title: 'Шаг 1. Общие данные',
    key: '1',
  },
  {
    title: 'Шаг 2. Документы',
    key: '2',
  },
];

const TabsComponent = (props: any) => {
  const { currentTabKey, handleChangeTab } = props;
  return (
    <Tabs activeKey={currentTabKey} onChange={handleChangeTab}>
      {tabsComponent.map((currentTab) => {
        const { title, key } = currentTab;
        return (
          <TabPane tab={title} key={key} />
        );
      })}
    </Tabs>
  );
};

export default TabsComponent;
