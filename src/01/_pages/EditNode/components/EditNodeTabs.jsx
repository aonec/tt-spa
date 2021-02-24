import React, { useContext } from 'react';
import { Tabs } from 'antd';
import { EditNodeContext } from "../index";

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

const EditNodeTabs = () => {
  const { currentTabKey, handleChangeTab } = useContext(EditNodeContext);
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

export default EditNodeTabs;
