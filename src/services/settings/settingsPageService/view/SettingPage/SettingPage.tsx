import React, { FC, useMemo } from 'react';
import { Wrapper } from './SettingPage.styled';
import { SettingPageProps } from './SettingPage.types';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { chooseTypeOfResourceDisconnectionModalService } from 'services/resources/chooseTypeOfResourceDisconnectionModalService';
import { inspectorAddressesResetService } from 'services/settings/inspectorsDistributionService/inspectorAddressesResetService/inspectorAddressesResetService.models';
import { ResourceDisablingScheduleContainer } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleContainer';
import { Tabs } from 'ui-kit/Tabs';
import { InspectorsDistributionPage } from 'services/settings/inspectorsDistributionService/views/InspectorsDistributionPage';

export const SettingPage: FC<SettingPageProps> = ({}) => {
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
  }, [adminSettings, handleReassingInspector]);

  const settingsComponent = useMemo(() => {
    if (adminSettings) {
      return (
        <>
          <Tabs tab="График отключения ресурсов" key="disabledResources">
            <ResourceDisablingScheduleContainer />
          </Tabs>
          {/* <Tabs tab="Рабочие диапазоны узлов" key="operatingRanges">
            <WorkingRangeTab />
          </Tabs> */}
        </>
      );
    }
    return (
      <>
        <Tabs tab="Распредление контролеров" key="controllers"></Tabs>
        <Tabs tab="Распредление инспекторов" key="inspectors">
          <InspectorsDistributionPage />
        </Tabs>
      </>
    );
  }, [adminSettings]);

  return (
    <>
      <InspectorAddressesResetModalContainer />
      <CreateResourceDisconnectionContainer />
      <ChooseTypeOfResourceDisconnectionModalContainer />

      <PageHeader
        title="Настройки"
        contextMenu={{
          menuButtons,
        }}
      />
      <TabsSC activeKey={section} onChange={history.push}>
        {settingsComponent}
      </TabsSC>
    </>
  );
};
