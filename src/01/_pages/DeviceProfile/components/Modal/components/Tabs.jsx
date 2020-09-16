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

  const someList = list.map((value) => {
    const res = translate(value);
    return (
      <TabPane tab={res} key={value}>
        {res}
      </TabPane>
    );
  });

  const defaultRes = translate(someList[0]);

  return (
    <Tabs defaultActiveKey={defaultRes} onChange={onTabsChangeHandler}>
      {someList}
    </Tabs>
  );
}

export default DevicesListDiv;
