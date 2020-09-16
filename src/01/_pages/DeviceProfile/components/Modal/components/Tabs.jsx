import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export function DevicesListDiv({
  list,
  devicesList,
  translate,
  onTabsChangeHandler,
}) {
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
