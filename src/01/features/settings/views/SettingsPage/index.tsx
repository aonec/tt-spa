import React from 'react';
import { PageHeader } from '../../../../shared/ui/PageHeader';
import { useHistory, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { InspectorsDistributionPage } from '../../inspectorsDistributionService/views/InspectorsDistributionPage';
import { InspectorAddressesResetModalContainer } from '../../inspectorsDistributionService/inspectorAddressesResetService/InspectorAddressesResetModalContainer';
import { inspectorAddressesResetService } from '../../inspectorsDistributionService/inspectorAddressesResetService/inspectorAddressesResetService.models';

const { TabPane } = Tabs;

export const SettingsPage = () => {
  const { section } = useParams<{ section: string }>();
  const history = useHistory();

  return (
    <>
      <InspectorAddressesResetModalContainer />
      <PageHeader
        title="Настройки"
        contextMenu={{
          menuButtons: [
            {
              title: 'Сбросить все адреса',
              onClick: inspectorAddressesResetService.inputs.openModal,
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
          <InspectorsDistributionPage />
        </TabPane>
      </Tabs>
    </>
  );
};
