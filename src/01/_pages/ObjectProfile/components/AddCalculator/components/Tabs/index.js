import React, { useContext, useState } from 'react';
import { Tabs } from 'antd';
import Page1 from '../Page1';
import Page2 from '../Page2';
import Page3 from '../Page3';
import { AddDeviceContext } from '../../index';

const { TabPane } = Tabs;

export const TabsComponent = () => {
  const { tab, setTab, callback } = useContext(AddDeviceContext);
  console.log('TabsComponent');

  const [tabb, setTabb] = useState(1);
  return (
    <Tabs defaultActiveKey="1" activeKey={`${tab}`} onChange={callback} style={{ padding: '0 24px' }}>
      <TabPane tab="Шаг 1. Общие данные" key="1">
        <Page1 />
      </TabPane>
      <TabPane tab="Шаг 2. Настройки соединения" key="2">
        <Page2 />
      </TabPane>
      <TabPane tab="Шаг 3. Документы" key="3">
        <Page3 />
      </TabPane>
    </Tabs>
  );
};

export default TabsComponent;
