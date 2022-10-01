import React, { FC, useMemo } from 'react';
import { PageHeader } from '../../../../shared/ui/PageHeader';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { InspectorsDistributionPage } from '../../inspectorsDistributionService/views/InspectorsDistributionPage';
import { SettingsPageProps } from './types';
import { InspectorAddressesResetModalContainer } from '../../inspectorsDistributionService/inspectorAddressesResetService/InspectorAddressesResetModalContainer';
import { inspectorAddressesResetService } from '../../inspectorsDistributionService/inspectorAddressesResetService/inspectorAddressesResetService.models';
import { ResourceDisablingScheduleContainer } from '../../resourcesDisablingScheduleService/ResourceDisablingScheduleContainer';
import { CreateResourceDisconnectionContainer } from 'services/resources/createResourceDisconnectionService';
import { chooseTypeOfResourceDisconnectionModalService } from 'services/resources/chooseTypeOfResourceDisconnectionModalService';
import { ChooseTypeOfResourceDisconnectionModalContainer } from 'services/resources/chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.container';

const { TabPane } = Tabs;

export const SettingsPage: FC<SettingsPageProps> = ({
  handleReassingInspector,
}) => {
  const { section } = useParams<{ section: string }>();
  const history = useHistory();
  const { pathname } = useLocation();
  const adminSettings = pathname.split('/')[1] === 'adminSettings';

  const menuButtons = useMemo(() => {
    if (adminSettings) {
      return [
        {
          title: 'Создать отключение ресурса',
          onClick:
            chooseTypeOfResourceDisconnectionModalService.inputs.openModal,
        },
      ];
    }
    return [
      {
        title: 'Сбросить все адреса',
        onClick: inspectorAddressesResetService.inputs.openModal,
      },
      {
        title: 'Переназначить сотрудника',
        onClick: handleReassingInspector,
      },
    ];
  }, [adminSettings]);

  const settingsComponent = useMemo(() => {
    if (adminSettings) {
      return (
        <TabPane tab="График отключения ресурсов" key="disabledResources">
          <ResourceDisablingScheduleContainer />
        </TabPane>
      );
    }
    return (
      <>
        <TabPane tab="Распредление контролеров" key="controllers"></TabPane>
        <TabPane tab="Распредление инспекторов" key="inspectors">
          <InspectorsDistributionPage />
        </TabPane>
      </>
    );
  }, [adminSettings]);

  return (
    <>
      <InspectorAddressesResetModalContainer />
      <CreateResourceDisconnectionContainer />
      <ChooseTypeOfResourceDisconnectionModalContainer/>

      <PageHeader
        title="Настройки"
        contextMenu={{
          menuButtons,
        }}
      />
      <Tabs activeKey={section} onChange={history.push}>
        {settingsComponent}
      </Tabs>
    </>
  );
};
