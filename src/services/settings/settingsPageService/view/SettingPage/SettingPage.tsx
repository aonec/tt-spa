import React, { FC, useMemo } from 'react';
import { TabsSC } from './SettingPage.styled';
import { SettingPageProps } from './SettingPage.types';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { chooseTypeOfResourceDisconnectionModalService } from 'services/resources/chooseTypeOfResourceDisconnectionModalService';
import { inspectorAddressesResetService } from 'services/settings/inspectorsDistributionService/inspectorAddressesResetService/inspectorAddressesResetService.models';
import { ResourceDisablingScheduleContainer } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleContainer';
import { InspectorsDistributionPage } from 'services/settings/inspectorsDistributionService/views/InspectorsDistributionPage';
import { InspectorAddressesResetModalContainer } from 'services/settings/inspectorsDistributionService/inspectorAddressesResetService/InspectorAddressesResetModalContainer';
import { CreateResourceDisconnectionContainer } from 'services/resources/createResourceDisconnectionService';
import { ChooseTypeOfResourceDisconnectionModalContainer } from 'services/resources/chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.container';
import { PageHeader } from 'ui-kit/shared_components/PageHeader';
import { featureToggles } from 'featureToggles';
import { WorkingRangeTab } from 'services/workingRanges/WorkingRangeTab';
import { DistrictBordersContainer } from 'services/settings/districtBordersService';

export const SettingPage: FC<SettingPageProps> = ({
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
          <TabsSC.TabPane
            tab="График отключения ресурсов"
            key="disabledResources"
          >
            <ResourceDisablingScheduleContainer />
          </TabsSC.TabPane>
          {featureToggles.workingRanges && (
            <TabsSC.TabPane tab="Рабочие диапазоны узлов" key="operatingRanges">
              <WorkingRangeTab />
            </TabsSC.TabPane>
          )}
        </>
      );
    }
    return (
      <>
        <TabsSC.TabPane
          tab="Распределение контролеров"
          key="controllers"
        ></TabsSC.TabPane>
        <TabsSC.TabPane tab="Распределение инспекторов" key="inspectors">
          <InspectorsDistributionPage />
        </TabsSC.TabPane>
        <TabsSC.TabPane tab="Границы районов" key="districtBorder">
          <DistrictBordersContainer />
        </TabsSC.TabPane>
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
