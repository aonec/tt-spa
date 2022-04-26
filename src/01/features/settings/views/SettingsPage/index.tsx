import React, { FC } from 'react';
import { PageHeader } from '../../../../shared/ui/PageHeader';
import { useHistory, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { InspectorsDistributionPage } from '../../inspectorsDistributionService/views/InspectorsDistributionPage';
import { SettingsPageProps } from './types';

const { TabPane } = Tabs;

export const SettingsPage: FC<SettingsPageProps> = ({
  handleReassingInspector,
}) => {
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
              onClick: handleReassingInspector,
            },
          ],
        }}
      />
      <Tabs activeKey={section} onChange={history.push}>
        <TabPane tab="Распредление контролеров" key="controllers"></TabPane>
        <TabPane tab="Распредление инспекторов" key="inspectors">
          <InspectorsDistributionPage />
        </TabPane>
      </Tabs>
    </>
  );
};
