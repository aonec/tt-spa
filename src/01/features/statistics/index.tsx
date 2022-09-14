import { Tabs } from 'antd';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { SubscribersConsumption } from './subscribersConsumption';
import { PageHeader } from '01/shared/ui/PageHeader';
import { manualyGetStatisticData } from './subscribersConsumption/models';
import { useEvent } from 'effector-react';

const { TabPane } = Tabs;

export const StatisticsPage = () => {
  const history = useHistory();
  const fetchConsumption = useEvent(manualyGetStatisticData);
  const { grouptype } = useParams<{ grouptype: string }>();

  return (
    <div>
      <PageHeader
        title="Статистика"
        contextMenu={{
          menuButtons: [
            {
              title: 'Выгрузить статистику',
              onClick: () => fetchConsumption(),
            },
          ],
        }}
      />
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
