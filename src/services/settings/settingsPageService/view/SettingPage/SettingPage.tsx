import React, { FC, useEffect, useMemo } from 'react';
import { useUnit } from 'effector-react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { TabsSC } from './SettingPage.styled';
import { SettingPageProps } from './SettingPage.types';
import { inspectorAddressesResetService } from 'services/settings/inspectorsDistributionService/inspectorAddressesResetService/inspectorAddressesResetService.models';
import { InspectorsDistributionPage } from 'services/settings/inspectorsDistributionService/views/InspectorsDistributionPage';
import { InspectorAddressesResetModalContainer } from 'services/settings/inspectorsDistributionService/inspectorAddressesResetService/InspectorAddressesResetModalContainer';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { WorkingRangeTab } from 'services/workingRanges/WorkingRangeTab';
import { DistrictBordersContainer } from 'services/settings/districtBordersService';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';
import { TemperatureGraphContainer } from 'services/settings/temperatureGraphService';

export const SettingPage: FC<SettingPageProps> = ({
  handleReassingInspector,
  handleEditTemperatureNormative,
  isAdminSettings,
}) => {
  const { featureToggles } = useUnit({
    featureToggles: developmentSettingsService.outputs.$featureToggles,
  });

  const { section } = useParams<{ section: string }>();
  const history = useHistory();
  const { pathname } = useLocation();
  const isTemperatureGraphTab = pathname.split('/')[2] === 'temperatureGraph';

  const pagePath = isAdminSettings ? 'adminSettings' : 'settings';

  const menuButtons = useMemo(() => {
    if (isAdminSettings) {
      return [
        {
          title: 'Редактировать температурный график',
          onClick: () => handleEditTemperatureNormative(true),
          hidden: !isTemperatureGraphTab,
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
  }, [
    isAdminSettings,
    handleReassingInspector,
    handleEditTemperatureNormative,
    isTemperatureGraphTab,
  ]);

  const settingsComponent = useMemo(() => {
    if (isAdminSettings) {
      return (
        <>
          {featureToggles.workingRanges && (
            <TabsSC.TabPane tab="Рабочие диапазоны узлов" key="operatingRanges">
              <WorkingRangeTab />
            </TabsSC.TabPane>
          )}
          {featureToggles.temperatureGraph && (
            <TabsSC.TabPane tab="Температурный график" key="temperatureGraph">
              <TemperatureGraphContainer />
            </TabsSC.TabPane>
          )}
        </>
      );
    }

    return (
      <>
        {featureToggles.districtsManage && (
          <TabsSC.TabPane tab="Границы районов" key="districtBorder">
            <DistrictBordersContainer />
          </TabsSC.TabPane>
        )}
        {featureToggles.controllersDistribution && (
          <TabsSC.TabPane
            tab="Распределение контролеров"
            key="controllers"
          ></TabsSC.TabPane>
        )}
        <TabsSC.TabPane tab="Распределение инспекторов" key="inspectors">
          <InspectorsDistributionPage />
        </TabsSC.TabPane>
      </>
    );
  }, [
    isAdminSettings,
    featureToggles.controllersDistribution,
    featureToggles.districtsManage,
    featureToggles.workingRanges,
    featureToggles.temperatureGraph,
  ]);

  useEffect(() => {
    const keys: { key: string; visible: boolean }[] = isAdminSettings
      ? [
          {
            key: 'operatingRanges',
            visible: featureToggles.workingRanges,
          },
          { key: 'temperatureGraph', visible: featureToggles.temperatureGraph },
        ]
      : [
          {
            key: 'districtBorder',
            visible: featureToggles.districtsManage,
          },
          {
            key: 'controllers',
            visible: featureToggles.controllersDistribution,
          },
          { key: 'inspectors', visible: true },
        ];

    const path = keys.find((elem) => elem.visible);

    if (path) history.push(`/${pagePath}/${path.key}`);
  }, [
    isAdminSettings,
    featureToggles.controllersDistribution,
    featureToggles.districtsManage,
    featureToggles.temperatureGraph,
    featureToggles.workingRanges,
    history,
    pagePath,
  ]);

  return (
    <>
      <InspectorAddressesResetModalContainer />

      <PageHeader
        title={isAdminSettings ? 'Настройки' : 'Настройки оператора'}
        contextMenu={{
          menuButtons,
        }}
      />
      <TabsSC
        activeKey={section}
        onChange={(key) => history.push(`/${pagePath}/${key}`)}
      >
        {settingsComponent}
      </TabsSC>
    </>
  );
};
