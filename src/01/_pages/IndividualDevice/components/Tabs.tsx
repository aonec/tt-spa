import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const tabItems: Array<Array<string>> = [
  ['Общая информация', ''],
  ['История показаний', 'readings'],
  ['Документы', 'documents'],
  ['История изменений', 'changes'],
];

export const TabsIndividualDevice = React.memo(() => {
  const { push } = useHistory();
  const matchParams = useRouteMatch<string>(
    '/individualDevices/(\\d+)/(readings|documents|changes)?'
  );
  if (!matchParams) {
    return null;
  }
  const { url, params } = matchParams;

  const handleChange = (key: string) => {
    push(key !== '' ? `${url}/${key}` : url);
  };
  return (
    <Tabs
      onChange={handleChange}
      style={{ height: 'fit-content' }}
      defaultActiveKey={params[1]}
    >
      {tabItems.map((t, index) => {
        return <TabPane tab={t[0]} key={t[1]} />;
      })}
    </Tabs>
  );
});
