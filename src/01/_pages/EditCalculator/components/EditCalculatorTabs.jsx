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
    title: 'Подключенные приборы',
    key: '3',
  },
  {
    title: 'Документы',
    key: '4',
  },
];

const EditCalculatorTabs = (props) => {
  console.log("EditCalculatorTabs")
  const { currentTabKey, handleChangeTab } = props;
  return (
    <Tabs style={{ height: 'fit-content' }} activeKey={currentTabKey} onChange={handleChangeTab}>
      {tabs.map((currentTab) => {
        const { title, key } = currentTab;
        return (
          <TabPane tab={title} key={key} />
        );
      })}
    </Tabs>
  );
};

export default EditCalculatorTabs;
