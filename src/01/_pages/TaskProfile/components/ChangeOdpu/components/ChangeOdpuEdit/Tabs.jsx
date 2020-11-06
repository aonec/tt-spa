import React, { useContext } from 'react';
import { Tabs } from 'antd';
import { ChangeOdpuContext } from '../../index';

const { TabPane } = Tabs;

const tabs = [
  {
    title: 'Шаг 1. Общие данные',
    key: '1',
  },
  {
    title: 'Шаг 2. Настройка соединения',
    key: '2',
  },
  {
    title: 'Шаг 3. Документы',
    key: '3',
  },
];

const TabsComponent = () => {
  const {
    handleChangeTab,
    newDevice,
    currentTabKey,
    setTab,
  } = useContext(ChangeOdpuContext);
  console.log("currentTabKey = ", currentTabKey)

  return (
    <Tabs style={{ height: 'fit-content', width: '100%' }} activeKey={currentTabKey} onChange={handleChangeTab}>
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
