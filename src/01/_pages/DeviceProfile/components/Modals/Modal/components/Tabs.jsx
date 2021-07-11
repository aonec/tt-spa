import React, { useContext } from 'react';
import { Tabs } from 'antd';
import { ReportContext } from '../index';

const { TabPane } = Tabs;

const DevicesListDiv = () => {
  const { resources, translate, onTabsChangeHandler } = useContext(
    ReportContext,
  );

  const resList = resources.map((value) => {
    const res = translate(value);
    return <TabPane tab={res} key={value} />;
  });

  return (
    <Tabs defaultActiveKey="1" onChange={onTabsChangeHandler}>
      {resList}
    </Tabs>
  );
};

export default DevicesListDiv;
