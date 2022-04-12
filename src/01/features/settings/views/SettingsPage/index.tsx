import React from 'react';
import { PageHeader } from '../../../../shared/ui/PageHeader';
import { useHistory, useParams } from 'react-router-dom';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export const SettingsPage = () => {
  const { section } = useParams<{ section: string }>();
  const history = useHistory();

  return (
    <>
      <PageHeader
        title="Настройки"
        contextMenu={{
          menuButtons: [
            {
              title: 'Сбросить все адреса',
              onClick: () => {},
            },
            {
              title: 'Переназначить сотрудника',
              onClick: () => {},
            },
          ],
        }}
      />
      <Tabs activeKey={section} onChange={history.push}>
        <TabPane tab="Распредление контролеров" key="controllers"></TabPane>
        <TabPane tab="Распредление инспекторов" key="inspectors">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </>
  );
};
