import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const tabItems: Array<Array<string>> = [
  ['Общая информация', ''],
  ['Настройки соединения', 'connection'],
  ['Узлы', 'nodes'],
  ['Подключенные приборы', 'related'],
  ['Документы', 'documents'],
];

export const TabsCalculator = React.memo(() => {
  const { push } = useHistory();
  const matchParams = useRouteMatch<string>(
    '/calculators/(\\d+)/(connection|nodes|related|documents)?'
  );
  if (!matchParams) {
    return null;
  }
  const { params } = matchParams;

  const handleChange = (key: string) => {
    push(`/calculators/${params[0]}/${key}`);
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

export default TabsCalculator;
