import React from 'react';
import { Tabs } from 'antd';
import _ from 'lodash';
import { useParams } from 'react-router-dom';

const { TabPane } = Tabs;

interface TabsItemInterface {
  title: string;
  key: string;
  cb: any;
}

interface TabsInterface {
  tabItems: Array<TabsItemInterface>;
}

export default ({ tabItems }: TabsInterface) => {
  const params = useParams<Array<string>>();

  function callback(key: string) {
    const current = _.find(tabItems, { key: key });
    current?.cb();
  }

  return (
    <Tabs defaultActiveKey={params[0] || ''} onChange={callback}>
      {tabItems.map((tab) => {
        const { title, key, cb } = tab;
        return <TabPane tab={title} key={key} />;
      })}
    </Tabs>
  );
};
