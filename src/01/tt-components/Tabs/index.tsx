import React from 'react';
import { Tabs } from 'antd';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const { TabPane } = Tabs;

interface TabsItemInterface {
  title: string;
  key: string;
  cb: any;
}

interface TabsInterface {
  tabItems: Array<TabsItemInterface>;
  tabsType: 'route' | 'tabs';
  activeKey?: string;
  visible?: boolean;
}

export default ({ tabItems, tabsType, activeKey, visible }: TabsInterface) => {
  const params = useParams<Array<string>>();

  function callback(key: string) {
    const current = _.find(tabItems, { key: key });
    current?.cb();
  }

  return (
    <StyledTabs hidden={!visible}>
      <Tabs
        defaultActiveKey={tabsType === 'route' ? params[0] || '' : '1'}
        onChange={callback}
        activeKey={activeKey}
      >
        {tabItems.map((tab) => {
          const { title, key, cb } = tab;
          return <TabPane tab={title} key={key} />;
        })}
      </Tabs>
    </StyledTabs>
  );
};

const StyledTabs = styled.div`
  margin: 0;
  padding: 0;
`;
