import React, { FC } from 'react';
import { PageHeader } from '../../../../shared/ui/PageHeader';
import { useHistory, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { InspectorsDistributionPage } from '../../inspectorsDistributionService/views/InspectorsDistributionPage';
import { SettingsPageProps } from './types';
import { InspectorAddressesResetModalContainer } from '../../inspectorsDistributionService/inspectorAddressesResetService/InspectorAddressesResetModalContainer';
import { inspectorAddressesResetService } from '../../inspectorsDistributionService/inspectorAddressesResetService/inspectorAddressesResetService.models';
import { CreateResourceDisconnectionContainer } from 'services/resources/createResourceDisconnectionService';

const { TabPane } = Tabs;

export const SettingsPage: FC<SettingsPageProps> = ({
  handleReassingInspector,
  handleOpenCreateResourceDisconnectionModal,
}) => {
  const { section } = useParams<{ section: string }>();
  const history = useHistory();
  return (
    <>
      <InspectorAddressesResetModalContainer />
      <CreateResourceDisconnectionContainer />
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
              onClick: handleReassingInspector,
            },
            {
              title: 'Создать отключение ресурса',
              onClick: handleOpenCreateResourceDisconnectionModal,
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
