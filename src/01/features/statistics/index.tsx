import { Title } from '01/_components/Headers';
import { Tabs } from 'antd';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { SubscribersConsumption } from './subscribersConsumption';

const { TabPane } = Tabs;

export const StatisticsPage = () => {
  const history = useHistory();
  const { grouptype } = useParams<{ grouptype: string }>();

  return (
    <div>
      <Title>Статистика</Title>
      <Tabs
        activeKey={grouptype}
        onChange={(value) => history.push(`/statistics/${value}`)}
      >
        <TabPane
          style={{ overflow: 'none' }}
          tab="Учет абонентского потребления"
          key="subscribersConsumption"
        >
          <SubscribersConsumption />
        </TabPane>
        <TabPane tab="Анализ количества задач" key="tasks"></TabPane>
        <TabPane
          tab="Анализ потребления ресурсов"
          key="resourceConsumption"
        ></TabPane>
      </Tabs>
    </div>
  );
};
