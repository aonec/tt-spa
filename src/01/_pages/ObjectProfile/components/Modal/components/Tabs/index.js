import React from "react";
import { Tabs } from 'antd';
import Page1 from "../Page1";
import Page2 from "../Page2";
import Page3 from "../Page3";

const { TabPane } = Tabs;

export const TabsComponent = () => {
  console.log("TabsComponent");
  function callback(key){
    console.log(key);
  }
  return (
  <Tabs defaultActiveKey="1" onChange={callback} style={{padding: '0 24px'}}>
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
  )
};

export default TabsComponent;