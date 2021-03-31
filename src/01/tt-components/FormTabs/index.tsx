import React from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

interface TabsItemInterface {
  title: string;
  key: string;
}

export interface TabItemsInterface {
  tabs: Array<TabsItemInterface>;
  setTab: any;
}

export const FormTabs = ({ tabs, setTab }: TabItemsInterface) => {
  return (
    <Tabs defaultActiveKey="1" onChange={setTab}>
      {tabs.map((t) => {
        const { title, key } = t;
        return <TabPane tab={title} key={key} />;
      })}
    </Tabs>
  );
};

export default FormTabs;
