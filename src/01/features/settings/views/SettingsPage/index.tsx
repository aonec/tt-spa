import React, { FC } from 'react';
import { PageHeader } from '../../../../shared/ui/PageHeader';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { InspectorsDistributionPage } from '../../inspectorsDistributionService/views/InspectorsDistributionPage';
import { SettingsPageProps } from './types';
import { InspectorAddressesResetModalContainer } from '../../inspectorsDistributionService/inspectorAddressesResetService/InspectorAddressesResetModalContainer';
import { inspectorAddressesResetService } from '../../inspectorsDistributionService/inspectorAddressesResetService/inspectorAddressesResetService.models';
import { ResourceDisablingScheduleContainer } from '../../resourcesDisablingScheduleService/ResourceDisablingScheduleContainer';

const { TabPane } = Tabs;

export const SettingsPage: FC<SettingsPageProps> = ({
  handleReassingInspector,
}) => {
  const { section } = useParams<{ section: string }>();
  const history = useHistory();
  const { pathname } = useLocation();
  const adminSettings = pathname.split('/')[1] === 'adminSettings';

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
              onClick: handleReassingInspector,
            },
          ],
        }}
      />
      <Tabs activeKey={section} onChange={history.push}>
        {!adminSettings ? (
          <>
            <TabPane tab="Распредление контролеров" key="controllers"></TabPane>
            <TabPane tab="Распредление инспекторов" key="inspectors">
              <InspectorsDistributionPage />
            </TabPane>
          </>
        ) : (
          <TabPane tab="График отключения ресурсов" key="disabledResources">
            <ResourceDisablingScheduleContainer />
          </TabPane>
        )}
      </Tabs>
    </>
  );
};
