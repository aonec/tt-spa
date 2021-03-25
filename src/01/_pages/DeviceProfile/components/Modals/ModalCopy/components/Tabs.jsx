import React, { useContext } from 'react';
import { Tabs } from 'antd';
import { ReportContext } from '../index';

const { TabPane } = Tabs;

export function DevicesListDiv() {
  const { list, devicesList, translate, onTabsChangeHandler } = useContext(
    ReportContext
  );

  devicesList.map(({ resource }) => {
    if (!list.includes(resource)) {
      list.push(resource);
    }
  });

  const someList = list.map((value, index) => {
    const res = translate(value);
    return <TabPane tab={res} key={value} />;
  });

  const defaultRes = translate(someList[0]);

  return (
    <Tabs defaultActiveKey={defaultRes} onChange={onTabsChangeHandler}>
      {someList}
    </Tabs>
  );
}

export default DevicesListDiv;
